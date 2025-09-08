#!/usr/bin/env node

import fs from 'fs/promises';
import * as fsSync from 'fs';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

const REPO_URL = 'https://github.com/hiudyy/nazuna.git';
const BACKUP_DIR = path.join(process.cwd(), `backup_${new Date().toISOString().replace(/[:.]/g, '_').replace(/T/, '_')}`);
const TEMP_DIR = path.join(process.cwd(), 'temp_nazuna');
const isWindows = os.platform() === 'win32';

// Removido: CACHE não utilizado

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[1;32m',
  red: '\x1b[1;31m',
  blue: '\x1b[1;34m',
  yellow: '\x1b[1;33m',
  cyan: '\x1b[1;36m',
  magenta: '\x1b[1;35m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

const print = {
  message: (text) => console.log(`${colors.green}${text}${colors.reset}`),
  warning: (text) => console.log(`${colors.red}${text}${colors.reset}`),
  info: (text) => console.log(`${colors.cyan}${text}${colors.reset}`),
  detail: (text) => console.log(`${colors.dim}${text}${colors.reset}`),
  separator: () => console.log(`${colors.blue}============================================${colors.reset}`),
  progress: (current, total) => console.log(`${colors.dim}Progresso: ${current}/${total} etapas concluídas.${colors.reset}`),
};

function setupGracefulShutdown() {
  const shutdown = () => {
    console.log('\n');
    print.warning('Atualização cancelada pelo usuário.');
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

async function displayHeader() {
  const header = [
    `${colors.bold}🚀 Nazuna - Atualizador${colors.reset}`,
    `${colors.bold}👨‍💻 Criado por Hiudy${colors.reset}`,
  ];

  print.separator();
  header.forEach(line => console.log(line));
  print.separator();
  console.log();
}

async function checkRequirements() {
  print.info('Verificando requisitos do sistema...');

  const checks = [
    checkGit(),
    checkNpm()
  ];

  try {
    await Promise.all(checks);
    print.detail('Todos os requisitos atendidos.');
  } catch (error) {
    throw error;
  }
}

async function checkGit() {
  try {
    await execAsync('git --version', { timeout: 5000 });
    print.detail('Git encontrado.');
  } catch (error) {
    print.warning('Git não encontrado! É necessário para atualizar o Nazuna.');
    printGitInstallationInstructions();
    throw new Error('Git não encontrado');
  }
}

async function checkNpm() {
  try {
    await execAsync('npm --version', { timeout: 5000 });
    print.detail('NPM encontrado.');
  } catch (error) {
    print.warning('NPM não encontrado! É necessário para instalar dependências.');
    print.info('Instale o Node.js e NPM em: https://nodejs.org');
    throw new Error('NPM não encontrado');
  }
}

function printGitInstallationInstructions() {
  if (isWindows) {
    print.info('Instale o Git em: https://git-scm.com/download/win');
  } else if (os.platform() === 'darwin') {
    print.info('Instale o Git com: brew install git');
  } else {
    print.info('Instale o Git com: sudo apt-get install git (Ubuntu/Debian) ou equivalente.');
  }
}

async function confirmUpdate() {
  print.warning('Atenção: A atualização sobrescreverá arquivos existentes, exceto configurações e dados salvos.');
  print.detail('Um backup será criado automaticamente.');
  print.warning('Pressione Ctrl+C para cancelar a qualquer momento.');

  return new Promise((resolve) => {
    let countdown = 5;
    const timer = setInterval(() => {
      process.stdout.write(`\rIniciando em ${countdown} segundos...${' '.repeat(20)}`);
      countdown--;

      if (countdown < 0) {
        clearInterval(timer);
        process.stdout.write('\r                                  \n');
        print.message('Prosseguindo com a atualização...');
        resolve();
      }
    }, 1000);
  });
}

async function createBackup() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    await createBackupDirectories();
    await Promise.all([
      backupDatabase(),
      backupConfig(),
      backupMidias()
    ]);

    print.message(`Backup salvo em: ${BACKUP_DIR}`);
  } catch (error) {
    print.warning(`Erro ao criar backup: ${error.message}`);
    throw error;
  }
}

async function createBackupDirectories() {
  const directories = [
    path.join(BACKUP_DIR, 'dados', 'database'),
    path.join(BACKUP_DIR, 'dados', 'src'),
    path.join(BACKUP_DIR, 'dados', 'midias')
  ];

  await Promise.all(directories.map(dir => fs.mkdir(dir, { recursive: true })));
}

async function backupDatabase() {
  const databaseDir = path.join(process.cwd(), 'dados', 'database');
  if (fsSync.existsSync(databaseDir)) {
    print.detail('Copiando diretório de banco de dados...');
    const backupPath = path.join(BACKUP_DIR, 'dados', 'database');
    await fs.cp(databaseDir, backupPath, { recursive: true });
  }
}

async function backupConfig() {
  const configFile = path.join(process.cwd(), 'dados', 'src', 'config.json');
  if (fsSync.existsSync(configFile)) {
    print.detail('Copiando arquivo de configuração...');
    const backupPath = path.join(BACKUP_DIR, 'dados', 'src', 'config.json');
    await fs.copyFile(configFile, backupPath);
  }
}

async function backupMidias() {
  const midiasDir = path.join(process.cwd(), 'dados', 'midias');
  if (fsSync.existsSync(midiasDir)) {
    print.detail('Copiando diretório de mídias...');
    const backupPath = path.join(BACKUP_DIR, 'dados', 'midias');
    await fs.cp(midiasDir, backupPath, { recursive: true });
  }
}

async function downloadUpdate() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    await cleanupTempDir();
    await cloneRepository();
    await cleanupUnnecessaryFiles();
    print.message('Download concluído com sucesso.');
  } catch (error) {
    print.warning(`Falha ao baixar a atualização: ${error.message}`);
    await checkConnectivity();
    throw error;
  }
}

async function cleanupTempDir() {
  if (fsSync.existsSync(TEMP_DIR)) {
    await fs.rm(TEMP_DIR, { recursive: true, force: true });
  }
}

async function cloneRepository() {
  print.detail('Clonando repositório...');
  
  return new Promise((resolve, reject) => {
    const gitProcess = exec(`git clone --depth 1 ${REPO_URL} "${TEMP_DIR}"`, (error) =>
      error ? reject(error) : resolve()
    );

    const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(`\r${spinner[i]} Baixando...`);
      i = (i + 1) % spinner.length;
    }, 100);

    gitProcess.on('close', () => {
      clearInterval(interval);
      process.stdout.write('\r                 \r');
      resolve();
    });
  });
}

async function cleanupUnnecessaryFiles() {
  const filesToRemove = [
    path.join(TEMP_DIR, 'README.md'),
    path.join(TEMP_DIR, 'package-lock.json')
  ];

  await Promise.all(filesToRemove.map(file => {
    if (fsSync.existsSync(file)) {
      return fs.unlink(file);
    }
    return Promise.resolve();
  }));
}

async function checkConnectivity() {
  print.info('Verificando conectividade com o GitHub...');
  try {
    await execAsync(isWindows ? 'ping github.com -n 1' : 'ping -c 1 github.com', { timeout: 5000 });
    print.warning('Verifique permissões ou configuração do Git.');
  } catch {
    print.warning('Sem conexão com a internet. Verifique sua rede.');
  }
}

async function cleanOldFiles() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    await removeSpecificFiles();
    await cleanDataDirectory();
    print.message('Limpeza concluída com sucesso.');
  } catch (error) {
    print.warning(`Erro ao limpar arquivos antigos: ${error.message}`);
    throw error;
  }
}

async function removeSpecificFiles() {
  const itemsToDelete = [
    { path: path.join(process.cwd(), '.git'), type: 'dir', name: '.git' },
    { path: path.join(process.cwd(), '.github'), type: 'dir', name: '.github' },
    { path: path.join(process.cwd(), '.npm'), type: 'dir', name: '.npm' },
    { path: path.join(process.cwd(), 'node_modules'), type: 'dir', name: 'node_modules' },
    { path: path.join(process.cwd(), 'package.json'), type: 'file', name: 'package.json' },
    { path: path.join(process.cwd(), 'package-lock.json'), type: 'file', name: 'package-lock.json' },
    { path: path.join(process.cwd(), 'README.md'), type: 'file', name: 'README.md' },
  ];

  const deletePromises = itemsToDelete.map(async (item) => {
    if (fsSync.existsSync(item.path)) {
      print.detail(`Removendo ${item.name}...`);
      if (item.type === 'dir') {
        await fs.rm(item.path, { recursive: true, force: true });
      } else {
        await fs.unlink(item.path);
      }
    }
  });

  await Promise.all(deletePromises);
}

async function cleanDataDirectory() {
  const dadosDir = path.join(process.cwd(), 'dados');
  if (!fsSync.existsSync(dadosDir)) {
    return;
  }

  print.detail('Limpando diretório de dados...');
  const files = await fs.readdir(dadosDir);
  
  const deletePromises = files.map(async (file) => {
    const filePath = path.join(dadosDir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(filePath);
    }
  });

  await Promise.all(deletePromises);
}

async function applyUpdate() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    await fs.cp(TEMP_DIR, process.cwd(), { recursive: true });
    await fs.rm(TEMP_DIR, { recursive: true, force: true });
    print.message('Atualização aplicada com sucesso.');
  } catch (error) {
    print.warning(`Erro ao aplicar atualização: ${error.message}`);
    throw error;
  }
}

async function restoreBackup() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    await createDataDirectories();
    await Promise.all([
      restoreDatabase(),
      restoreConfig(),
      restoreMidias()
    ]);

    print.message('Backup restaurado com sucesso.');
  } catch (error) {
    print.warning(`Erro ao restaurar backup: ${error.message}`);
    throw error;
  }
}

async function createDataDirectories() {
  const directories = [
    path.join(process.cwd(), 'dados', 'database'),
    path.join(process.cwd(), 'dados', 'src'),
    path.join(process.cwd(), 'dados', 'midias')
  ];

  await Promise.all(directories.map(dir => fs.mkdir(dir, { recursive: true })));
}

async function restoreDatabase() {
  const backupDatabaseDir = path.join(BACKUP_DIR, 'dados', 'database');
  if (fsSync.existsSync(backupDatabaseDir)) {
    print.detail('Restaurando banco de dados...');
    const targetPath = path.join(process.cwd(), 'dados', 'database');
    await fs.cp(backupDatabaseDir, targetPath, { recursive: true });
  }
}

async function restoreConfig() {
  const backupConfigFile = path.join(BACKUP_DIR, 'dados', 'src', 'config.json');
  if (fsSync.existsSync(backupConfigFile)) {
    print.detail('Restaurando arquivo de configuração...');
    const targetPath = path.join(process.cwd(), 'dados', 'src', 'config.json');
    await fs.copyFile(backupConfigFile, targetPath);
  }
}

async function restoreMidias() {
  const backupMidiasDir = path.join(BACKUP_DIR, 'dados', 'midias');
  if (fsSync.existsSync(backupMidiasDir)) {
    print.detail('Restaurando diretório de mídias...');
    const targetPath = path.join(process.cwd(), 'dados', 'midias');
    await fs.cp(backupMidiasDir, targetPath, { recursive: true });
  }
}

async function installDependencies() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    await runCommandWithSpinner('npm run config:install', 'Instalando dependências...');
    print.message('Dependências instaladas com sucesso.');
  } catch (error) {
    print.warning(`Falha ao instalar dependências: ${error.message}`);
    print.info('Tente executar manualmente: npm run config:install');
    throw error;
  }
}

async function runCommandWithSpinner(command, message) {
  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  
  const interval = setInterval(() => {
    process.stdout.write(`\r${spinner[i]} ${message}`);
    i = (i + 1) % spinner.length;
  }, 100);
  
  try {
    await execAsync(command, {
      shell: isWindows,
      timeout: 300000
    });
  } catch (error) {
    throw error;
  } finally {
    clearInterval(interval);
    process.stdout.write('\r' + ' '.repeat(message.length + 5) + '\r');
  }
}

async function cleanup() {
  // Mensagem inicial removida para evitar duplicidade com o cabeçalho do passo

  try {
    if (fsSync.existsSync(BACKUP_DIR)) {
      print.detail('Removendo diretório de backup...');
      await fs.rm(BACKUP_DIR, { recursive: true, force: true });
      print.detail('Backup removido.');
    }
    
    if (fsSync.existsSync(TEMP_DIR)) {
      print.detail('Removendo diretório temporário...');
      await fs.rm(TEMP_DIR, { recursive: true, force: true });
      print.detail('Diretório temporário removido.');
    }
  } catch (error) {
    print.warning(`Erro ao limpar arquivos temporários: ${error.message}`);
  }
}

async function main() {
  let backupCreated = false;
  
  try {
    setupGracefulShutdown();
    await displayHeader();

    const steps = [
      { name: 'Verificando requisitos do sistema', func: checkRequirements },
      { name: 'Confirmando atualização', func: confirmUpdate },
      { name: 'Criando backup', func: async () => { await createBackup(); backupCreated = true; } },
      { name: 'Baixando a versão mais recente', func: downloadUpdate },
      { name: 'Limpando arquivos antigos', func: cleanOldFiles },
      { name: 'Aplicando atualização', func: applyUpdate },
      { name: 'Restaurando backup', func: restoreBackup },
      { name: 'Instalando dependências', func: installDependencies },
      { name: 'Finalizando e limpando', func: cleanup },
    ];

    let completedSteps = 0;
    const totalSteps = steps.length;

    for (const step of steps) {
      print.info(`${step.name}...`);
      await step.func();
      completedSteps++;
      print.progress(completedSteps, totalSteps);
    }

    await updateCommitInfo();

    print.separator();
    print.message('Atualização concluída com sucesso!');
    print.message('Inicie o bot com: npm start');
    print.separator();
  } catch (error) {
    await handleUpdateError(error, backupCreated);
  }
}

async function updateCommitInfo() {
  try {
    print.message('Buscando informações do último commit...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch('https://api.github.com/repos/hiudyy/nazuna/commits?per_page=1', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro ao buscar commits: ${response.status} ${response.statusText}`);
    }

    const linkHeader = response.headers.get('link');
    const totalCommits = linkHeader?.match(/page=(\d+)>;\s*rel="last"/)?.[1];

    const commitInfo = { total: Number(totalCommits) || 0 };
    const commitInfoPath = path.join(process.cwd(), 'dados', 'database', 'updateSave.json');
    await fs.writeFile(commitInfoPath, JSON.stringify(commitInfo, null, 2));
  } catch (error) {
    console.warn(`Não foi possível atualizar informações do commit: ${error.message}`);
  }
}

async function handleUpdateError(error, backupCreated) {
  print.separator();
  print.warning(`Erro durante a atualização: ${error.message}`);
  
  if (backupCreated) {
    try {
      await restoreBackup();
      print.info('Backup da versão antiga restaurado automaticamente.');
    } catch (restoreError) {
      print.warning(`Falha ao restaurar backup automaticamente: ${restoreError.message}`);
    }
  }
  
  print.warning(`Backup disponível em: ${BACKUP_DIR}`);
  print.info('Para restaurar manualmente, copie os arquivos do backup para os diretórios correspondentes.');
  print.info('Em caso de dúvidas, contate o desenvolvedor.');
  
  if (process.env.DEBUG === '1' && error.stack) {
    console.log(`${colors.dim}${error.stack}${colors.reset}`);
  }
  
  process.exit(1);
}

main();