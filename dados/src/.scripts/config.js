#!/usr/bin/env node

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { exec, spawn } from 'child_process';
import readline from 'readline';
import os from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

const CONFIG_FILE = path.join(process.cwd(), 'dados', 'src', 'config.json');
let version = 'Desconhecida';
try { const pkg = JSON.parse(fsSync.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')); version = pkg.version; } catch { console.warn('Não foi possível ler a versão do package.json'); }

const colors = { reset: '\x1b[0m', green: '\x1b[1;32m', red: '\x1b[1;31m', blue: '\x1b[1;34m', yellow: '\x1b[1;33m', cyan: '\x1b[1;36m', dim: '\x1b[2m', bold: '\x1b[1m', underline: '\x1b[4m' };

const print = {
    message: (text) => console.log(`${colors.green}${text}${colors.reset}`),
    warning: (text) => console.log(`${colors.red}${text}${colors.reset}`),
    info: (text) => console.log(`${colors.cyan}${text}${colors.reset}`),
    detail: (text) => console.log(`${colors.dim}${text}${colors.reset}`),
    separator: () => console.log(`${colors.blue}=================================================${colors.reset}`),
    header: () => { print.separator(); console.log(`${colors.bold}🚀 Configurador Gênesis Nazuna - Versão ${version}${colors.reset}`); console.log(`${colors.bold}👨‍💻 Criado por Hiudy${colors.reset}`); print.separator(); console.log(); }
};

const SystemInfo = { os: os.platform(), isWindows: os.platform() === 'win32', isTermux: false, packageManager: null, async detect() { this.isTermux = 'TERMUX_VERSION' in process.env; if (this.isTermux) this.packageManager = 'pkg'; else if (this.os === 'linux') this.packageManager = await this.detectLinuxPackageManager(); else if (this.os === 'darwin') this.packageManager = await commandExists('brew') ? 'brew' : null; else if (this.isWindows) this.packageManager = await this.detectWindowsPackageManager(); }, async detectLinuxPackageManager() { const managers = [{ name: 'apt', check: 'apt' }, { name: 'dnf', check: 'dnf' }, { name: 'pacman', check: 'pacman' }]; for (const manager of managers) if (await commandExists(manager.check)) return manager.name; return null; }, async detectWindowsPackageManager() { if (await commandExists('winget')) return 'winget'; if (await commandExists('choco')) return 'choco'; return null; } };

const DEPENDENCIES_CONFIG = [ { name: 'Git', check: 'git --version', termux: 'pkg install git -y', win: 'winget install --id Git.Git -e', linux: 'apt install -y git || dnf install -y git || pacman -S --noconfirm git', mac: 'brew install git' }, { name: 'Yarn', check: 'yarn --version', termux: 'npm i -g yarn', win: 'npm i -g yarn', linux: 'sudo npm i -g yarn', mac: 'npm i -g yarn' }, { name: 'FFmpeg', check: 'ffmpeg -version', termux: 'pkg install ffmpeg -y', win: 'winget install --id Gyan.FFmpeg -e || choco install ffmpeg', linux: 'apt install -y ffmpeg || dnf install -y ffmpeg || pacman -S --noconfirm ffmpeg', mac: 'brew install ffmpeg' } ];

async function runCommandWithSpinner(command, message) {
    const spinner = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
    let i = 0;
    const write = (text) => process.stdout.write(text);
    const interval = setInterval(() => { write(`\r${colors.yellow}${spinner[i]}${colors.reset} ${message}`); i = (i + 1) % spinner.length; }, 100);
    try { await execAsync(command, { shell: SystemInfo.isWindows, timeout: 300000 }); } catch (error) { clearInterval(interval); write('\r' + ' '.repeat(message.length + 5) + '\r'); throw error; } finally { clearInterval(interval); write('\r' + ' '.repeat(message.length + 5) + '\r'); }
}

async function promptInput(rl, prompt, defaultValue, validator = () => true) {
    let value; let isValid = false;
    while (!isValid) {
        const displayPrompt = `${prompt} ${colors.dim}(atual: ${defaultValue})${colors.reset}:`;
        console.log(displayPrompt);
        value = await new Promise(resolve => rl.question("--> ", resolve));
        value = value.trim() || defaultValue;
        isValid = validator(value);
        if (!isValid) print.warning('   ➡️ Entrada inválida. Por favor, tente novamente.');
    }
    return value;
}

async function confirm(rl, prompt, defaultValue = 'n') {
    const defaultText = defaultValue.toLowerCase() === 's' ? 'S/n' : 's/N';
    console.log(`${prompt} (${defaultText}): `);
    const response = await new Promise(resolve => rl.question("--> ", resolve));
    const normalized = (response.trim() || defaultValue).toLowerCase();
    return ['s', 'sim', 'y', 'yes'].includes(normalized);
}

// Cache para comandos já verificados
const commandCache = new Map();

async function commandExists(command) {
    // Verificar cache primeiro
    if (commandCache.has(command)) {
        return commandCache.get(command);
    }
    
    const checkCmd = SystemInfo.isWindows ? `where ${command}` : `command -v ${command}`;
    try {
        await execAsync(checkCmd, { timeout: 5000 });
        commandCache.set(command, true);
        return true;
    } catch {
        commandCache.set(command, false);
        return false;
    }
}

async function installSystemDependencies() {
    print.separator();
    print.message('🔧 Verificando e instalando dependências do sistema...');
    const report = [];

    // Processamento paralelo para melhor performance
    const dependencyChecks = DEPENDENCIES_CONFIG.map(async (dep) => {
        let status = `${colors.green}✅ Já instalado${colors.reset}`;
        try {
            await execAsync(dep.check, { timeout: 5000 });
        } catch {
            status = await installDependency(dep);
        }
        return { name: dep.name, status };
    });

    // Aguardar todas as verificações
    const results = await Promise.all(dependencyChecks);
    results.forEach(result => report.push(result));

    return report;
}

async function installDependency(dep) {
    const osKey = SystemInfo.isTermux ? 'termux' : (SystemInfo.os === 'darwin' ? 'mac' : SystemInfo.os);
    let installCommand = dep[osKey];
    
    if (!installCommand) {
        return `${colors.dim}⚪️ Instalação manual necessária${colors.reset}`;
    }

    try {
        if (SystemInfo.isTermux && (dep.name === 'Git' || dep.name === 'FFmpeg')) {
            const [cmd, ...args] = installCommand.split(' ');
            await runCommandInherit(cmd, args);
        } else {
            await runCommandWithSpinner(installCommand, `Instalando ${dep.name}...`);
        }
        return `${colors.green}✅ Instalado com sucesso${colors.reset}`;
    } catch (error) {
        console.warn(`⚠️ Falha ao instalar ${dep.name}: ${error.message}`);
        return `${colors.red}❌ Falha na instalação${colors.reset}`;
    }
}

async function installNodeDependencies() {
    print.separator();
    print.message('📦 Instalando dependências do projeto (Node.js)...');
    
    // Verificar qual gerenciador de pacotes está disponível
    const useYarn = await commandExists('yarn');
    
    try {
        if (useYarn) {
            print.info('ℹ️ Usando YARN para instalação (mais rápido)...');
            await runCommandWithSpinner('yarn install', 'Executando yarn install...');
            print.message('✅ Dependências instaladas com sucesso via YARN.');
            return { name: 'Node Dependencies (yarn)', status: `${colors.green}✅ Instalado com sucesso${colors.reset}` };
        } else {
            print.info('ℹ️ Usando NPM para instalação...');
            await runCommandWithSpinner('npm install --no-optional --force --no-bin-links', 'Executando npm install...');
            print.message('✅ Dependências instaladas com sucesso via NPM.');
            return { name: 'Node Dependencies (npm)', status: `${colors.green}✅ Instalado com sucesso${colors.reset}` };
        }
    } catch (error) {
        print.warning(`❌ Falha na instalação: ${error.message}`);
        
        // Tentar o fallback
        if (useYarn) {
            print.info('ℹ️ Tentando fallback para NPM...');
            try {
                await runCommandWithSpinner('npm install --no-optional --force --no-bin-links', 'Executando npm install...');
                print.message('✅ Dependências instaladas com sucesso via NPM (fallback).');
                return { name: 'Node Dependencies (npm fallback)', status: `${colors.green}✅ Instalado com sucesso${colors.reset}` };
            } catch (fallbackError) {
                return { name: 'Node Dependencies', status: `${colors.red}❌ Falha na instalação${colors.reset}` };
            }
        } else {
            print.info('ℹ️ Tentando fallback para YARN...');
            try {
                await runCommandWithSpinner('yarn install', 'Executando yarn install...');
                print.message('✅ Dependências instaladas com sucesso via YARN (fallback).');
                return { name: 'Node Dependencies (yarn fallback)', status: `${colors.green}✅ Instalado com sucesso${colors.reset}` };
            } catch (fallbackError) {
                return { name: 'Node Dependencies', status: `${colors.red}❌ Falha na instalação${colors.reset}` };
            }
        }
    }
}

async function main() {
    // Tratamento de interrupções
    process.on('SIGINT', () => {
        print.warning('\n🛑 Configuração cancelada.');
        process.exit(0);
    });

    // Detecção inicial do sistema
    await SystemInfo.detect();

    // Modo de instalação direta
    if (process.argv.includes('--install')) {
        await runInstallationMode();
        return;
    }

    // Modo de configuração interativa
    await runInteractiveMode();
}

async function runInstallationMode() {
    print.info('🚀 Iniciando instalação automática...');
    
    try {
        const [nodeReport, systemReport] = await Promise.all([
            installNodeDependencies(),
            installSystemDependencies()
        ]);
        
        print.separator();
        print.info("📋 Relatório Final de Instalação:");
        [...systemReport, nodeReport].forEach(r => console.log(`- ${r.name}: ${r.status}`));
        print.separator();
    } catch (error) {
        print.warning(`❌ Erro durante a instalação: ${error.message}`);
    } finally {
        process.exit(0);
    }
}

async function runInteractiveMode() {
    print.header();
    
    // Carregar configuração existente
    let config = await loadExistingConfig();
    
    // Interface de linha de comando
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    
    try {
        // Coletar configurações
        await collectUserConfig(rl, config);
        
        // Salvar configuração
        await saveConfig(config);
        
        // Perguntar sobre dependências
        await handleDependencyInstallation(rl);
        
        print.message(`🎉 Nazuna configurado e pronto para uso! Versão: ${version}`);
    } finally {
        rl.close();
    }
}

async function loadExistingConfig() {
    const defaultConfig = { nomedono: '', numerodono: '', nomebot: '', prefixo: '!' };
    
    try {
        const existingConfig = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf8'));
        const config = { ...defaultConfig, ...existingConfig };
        print.info('📂 Configuração existente carregada.');
        return config;
    } catch {
        return defaultConfig;
    }
}

async function collectUserConfig(rl, config) {
    print.info(`${colors.bold}${colors.underline}🔧 Configurações Básicas${colors.reset}`);
    
    // Validadores
    const phoneValidator = (v) => /^\d{10,15}$/.test(v);
    const prefixValidator = (v) => v.length === 1;
    
    // Coletar inputs
    config.nomedono = await promptInput(rl, '👤 Nome do dono do bot', config.nomedono);
    config.numerodono = await promptInput(rl, '📱 Número do dono (apenas dígitos)', config.numerodono, phoneValidator);
    config.nomebot = await promptInput(rl, '🤖 Nome do bot', config.nomebot);
    config.prefixo = await promptInput(rl, '🔣 Prefixo do bot (1 caractere)', config.prefixo, prefixValidator);
}

async function saveConfig(config) {
    try {
        await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true });
        await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
        print.separator();
        print.message('✅ Configuração salva com sucesso!');
    } catch (error) {
        throw new Error(`Falha ao salvar configuração: ${error.message}`);
    }
}

async function handleDependencyInstallation(rl) {
    try {
        const shouldInstall = await confirm(rl, '⚙️ Deseja verificar e instalar todas as dependências agora?', 's');
        
        if (shouldInstall) {
            print.info('🔍 Verificando dependências...');
            
            const [nodeReport, systemReport] = await Promise.all([
                installNodeDependencies(),
                installSystemDependencies()
            ]);
            
            print.separator();
            print.info("📋 Relatório Final de Instalação:");
            [...systemReport, nodeReport].forEach(r => console.log(`- ${r.name}: ${r.status}`));
            print.separator();
        } else {
            print.info('📝 Lembre-se de instalar com: npm run config:install');
        }
    } catch (error) {
        print.warning(`⚠️ Erro ao verificar dependências: ${error.message}`);
    }
}

// Iniciar aplicação
main().catch((error) => {
    print.warning(`❌ Erro fatal: ${error.message}`);
    if (error.stack) {
        console.log(`${colors.dim}${error.stack}${colors.reset}`);
    }
    process.exit(1);
});
