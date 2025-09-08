#!/usr/bin/env node

import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import readline from 'readline/promises';
import os from 'os';

const CONFIG_PATH = path.join(process.cwd(), 'dados', 'src', 'config.json');
const NODE_MODULES_PATH = path.join(process.cwd(), 'node_modules');
const QR_CODE_DIR = path.join(process.cwd(), 'dados', 'database', 'qr-code');
const CONNECT_FILE = path.join(process.cwd(), 'dados', 'src', 'connect.js');
const isWindows = os.platform() === 'win32';
const isTermux = fsSync.existsSync('/data/data/com.termux');

let cachedVersion = null;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[1;32m',
  red: '\x1b[1;31m',
  blue: '\x1b[1;34m',
  yellow: '\x1b[1;33m',
  cyan: '\x1b[1;36m',
  bold: '\x1b[1m',
};

const mensagem = (text) => console.log(`${colors.green}${text}${colors.reset}`);
const aviso = (text) => console.log(`${colors.red}${text}${colors.reset}`);
const info = (text) => console.log(`${colors.cyan}${text}${colors.reset}`);
const separador = () => console.log(`${colors.blue}============================================${colors.reset}`);

const getVersion = () => {
  if (cachedVersion) return cachedVersion;
  try {
    const packageJson = JSON.parse(fsSync.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    cachedVersion = packageJson.version || 'Desconhecida';
    return cachedVersion;
  } catch (error) {
    console.warn('Não foi possível ler a versão do package.json');
    return 'Desconhecida';
  }
};

let botProcess = null;
const version = getVersion();
let restartCount = 0;
const MAX_RESTARTS = 5;

async function setupTermuxAutostart() {
  if (!isTermux) {
    info('Não está rodando no Termux. Ignorando configuração de autostart.');
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const answer = await rl.question(`${colors.yellow}Detectado ambiente Termux. Deseja configurar inicialização automática? (s/n): ${colors.reset}`);
    if (answer.trim().toLowerCase() !== 's') {
      info('Configuração de autostart ignorada pelo usuário.');
      return;
    }

    info('Configurando inicialização automática no Termux...');
    await configureTermuxProperties();
    await configureBashrc();
    mensagem('Configuração de inicialização automática no Termux concluída!');
  } catch (error) {
    aviso(`Erro ao configurar autostart no Termux: ${error.message}`);
  } finally {
    rl.close();
  }
}

async function configureTermuxProperties() {
  try {
    const termuxProperties = path.join(process.env.HOME, '.termux', 'termux.properties');
    await fs.mkdir(path.dirname(termuxProperties), { recursive: true });
    if (!fsSync.existsSync(termuxProperties)) {
      await fs.writeFile(termuxProperties, '');
    }
    execSync(`sed -i 's/^# *allow-external-apps *= *false/allow-external-apps = true/' ${termuxProperties}`, { stdio: 'inherit' });
    execSync('termux-reload-settings', { stdio: 'inherit' });
    mensagem('Configuração de termux.properties concluída.');
  } catch (error) {
    throw new Error(`Falha ao configurar termux.properties: ${error.message}`);
  }
}

async function configureBashrc() {
  try {
    const bashrcPath = path.join(process.env.HOME, '.bashrc');
    const termuxServiceCommand = `am startservice --user 0 -n com.termux/com.termux.app.RunCommandService -a com.termux.RUN_COMMAND --es com.termux.RUN_COMMAND_PATH '/data/data/com.termux/files/usr/bin/npm' --esa com.termux.RUN_COMMAND_ARGUMENTS 'start' --es com.termux.RUN_COMMAND_SESSION_NAME 'Nazuna Bot' --es com.termux.RUN_COMMAND_WORKDIR '${process.cwd()}' --ez com.termux.RUN_COMMAND_BACKGROUND 'false' --es com.termux.RUN_COMMAND_SESSION_ACTION '0'`.trim();

    let bashrcContent = '';
    if (fsSync.existsSync(bashrcPath)) {
      bashrcContent = await fs.readFile(bashrcPath, 'utf8');
    }

    if (!bashrcContent.includes(termuxServiceCommand)) {
      await fs.appendFile(bashrcPath, `\n# Configuração Nazuna Bot\n${termuxServiceCommand}\n`);
      mensagem('Comando am startservice adicionado ao ~/.bashrc');
    } else {
      info('Comando am startservice já presente no ~/.bashrc');
    }
  } catch (error) {
    throw new Error(`Falha ao configurar .bashrc: ${error.message}`);
  }
}

function setupGracefulShutdown() {
  const shutdown = () => {
    mensagem('Encerrando o Nazuna... Até logo!');
    if (botProcess) {
      try {
        botProcess.removeAllListeners();
        botProcess.kill('SIGTERM');
      } catch (error) {
        console.warn('Erro ao encerrar processo:', error.message);
      }
    }
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  if (isWindows) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on('SIGINT', shutdown);
  }
}

async function displayHeader() {
  const header = [
    `${colors.bold}🚀 Nazuna - Conexão WhatsApp${colors.reset}`,
    `${colors.bold}📦 Versão: ${version}${colors.reset}`,
    `${colors.bold}💻 Criado por Hiudy${colors.reset}`,
  ];

  separador();
  header.forEach(line => console.log(line));
  separador();
  console.log();
}

async function checkPrerequisites() {
  const checks = [
    checkConfigFile(),
    checkNodeModules(),
    checkConnectFile()
  ];

  try {
    await Promise.all(checks);
  } catch (error) {
    aviso(`Falha nos pré-requisitos: ${error.message}`);
    process.exit(1);
  }
}

async function checkConfigFile() {
  if (!fsSync.existsSync(CONFIG_PATH)) {
    aviso('Arquivo de configuração (config.json) não encontrado! Iniciando configuração automática...');
    await runSetupCommand('npm run config', 'Configuração');
  }
}

async function checkNodeModules() {
  if (!fsSync.existsSync(NODE_MODULES_PATH)) {
    aviso('Módulos do Node.js não encontrados! Iniciando instalação automática...');
    await runSetupCommand('npm run config:install', 'Instalação de módulos');
  }
}

async function checkConnectFile() {
  if (!fsSync.existsSync(CONNECT_FILE)) {
    throw new Error(`Arquivo de conexão (${CONNECT_FILE}) não encontrado! Verifique a instalação do projeto.`);
  }
}

async function runSetupCommand(command, description) {
  try {
    await new Promise((resolve, reject) => {
      const process = spawn(command, { stdio: 'inherit', shell: isWindows });
      process.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${description} falhou com código ${code}`))));
      process.on('error', reject);
    });
    mensagem(`✅ ${description} concluída com sucesso!`);
  } catch (error) {
    aviso(`Falha na ${description.toLowerCase()}: ${error.message}`);
    mensagem(`Tente executar manualmente: ${command}`);
    throw error;
  }
}

function startBot(codeMode = false) {
  const args = ['--expose-gc', CONNECT_FILE];
  if (codeMode) args.push('--code');

  info(`Iniciando com ${codeMode ? 'código de pareamento' : 'QR Code'}`);

  if (botProcess) {
    botProcess.removeAllListeners();
  }

  botProcess = spawn('node', args, {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' },
    timeout: 30000,
  });

  botProcess.on('error', (error) => {
    aviso(`Erro ao iniciar o processo do bot: ${error.message}`);
    restartBot(codeMode);
  });

  botProcess.on('close', (code) => {
    if (code !== 0) {
      aviso(`O bot terminou com erro (código: ${code}).`);
      restartBot(codeMode);
    }
  });

  return botProcess;
}

function restartBot(codeMode) {
  restartCount++;
  if (restartCount >= MAX_RESTARTS) {
    aviso(`Muitas tentativas de reinicialização (${MAX_RESTARTS}). Bot encerrado.`);
    aviso('Verifique os logs e resolva os problemas antes de tentar novamente.');
    process.exit(1);
  }

  aviso(`Reiniciando o bot (${restartCount}/${MAX_RESTARTS}) em 1 segundo...`);
  setTimeout(() => {
    if (botProcess) {
      botProcess.removeAllListeners();
      botProcess.kill();
    }
    startBot(codeMode);
  }, 1000);
}

async function checkAutoConnect() {
  try {
    if (!fsSync.existsSync(QR_CODE_DIR)) {
      await fs.mkdir(QR_CODE_DIR, { recursive: true });
      return false;
    }
    const files = fsSync.readdirSync(QR_CODE_DIR);
    return files.some(file => file.endsWith('.json'));
  } catch (error) {
    console.warn(`Erro ao verificar diretório de QR Code: ${error.message}`);
    return false;
  }
}

async function promptConnectionMethod() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log(`${colors.yellow}Escolha o método de conexão:${colors.reset}`);
    console.log(`${colors.yellow}1. 📷 Conectar via QR Code${colors.reset}`);
    console.log(`${colors.yellow}2. 🔑 Conectar via código de pareamento${colors.reset}`);
    console.log(`${colors.yellow}3. 🚪 Sair${colors.reset}`);

    const answer = await rl.question('➡️ Digite o número da opção desejada: ');
    console.log();

    switch (answer.trim()) {
      case '1':
        mensagem('Iniciando conexão via QR Code...');
        return { method: 'qr' };
      case '2':
        mensagem('Iniciando conexão via código de pareamento...');
        return { method: 'code' };
      case '3':
        mensagem('Encerrando... Até mais!');
        process.exit(0);
      default:
        aviso('Opção inválida! Usando conexão via QR Code como padrão.');
        return { method: 'qr' };
    }
  } finally {
    rl.close();
  }
}

async function main() {
  try {
    setupGracefulShutdown();
    await displayHeader();
    await checkPrerequisites();
    await setupTermuxAutostart();

    const hasSession = await checkAutoConnect();
    if (hasSession) {
      mensagem('Sessão de QR Code detectada. Conectando automaticamente...');
      startBot(false);
    } else {
      const { method } = await promptConnectionMethod();
      startBot(method === 'code');
    }
    await new Promise(() => {});
  } catch (error) {
    aviso(`Erro inesperado: ${error.message}`);
    if (error.stack) {
      console.log(`${colors.dim}${error.stack}${colors.reset}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Erro fatal na inicialização:', error);
  process.exit(1);
});