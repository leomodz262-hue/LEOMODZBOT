#!/usr/bin/env node

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const readline = require('readline');
const os = require('os');
const { loadMessages, getMessages } = require('../langs/loader.js');


const CONFIG_PATH = path.join(process.cwd(), 'dados', 'src', 'config.json');
const NODE_MODULES_PATH = path.join(process.cwd(), 'node_modules');
const QR_CODE_DIR = path.join(process.cwd(), 'dados', 'database', 'qr-code');
const CONNECT_FILE = path.join(process.cwd(), 'dados', 'src', 'connect.js');
const RESTART_DELAY = 50; // milliseconds
const isWindows = os.platform() === 'win32';
const dualMode = process.argv.includes('dual');


let version = 'Desconhecida';
try {
  const packageJson = JSON.parse(fsSync.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  version = packageJson.version;
} catch (error) {

}


const colors = {
  reset: '\x1b[0m',
  green: '\x1b[1;32m',
  red: '\x1b[1;31m',
  blue: '\x1b[1;34m',
  yellow: '\x1b[1;33m',
  cyan: '\x1b[1;36m',
  magenta: '\x1b[1;35m',
  dim: '\x1b[2m',
  bold: '\x1b[1m'
};


function mensagem(text) {
  console.log(`${colors.green}${text}${colors.reset}`);
}

function aviso(text) {
  console.log(`${colors.red}${text}${colors.reset}`);
}

function info(text) {
  console.log(`${colors.cyan}${text}${colors.reset}`);
}

function detalhe(text) {
  console.log(`${colors.dim}${text}${colors.reset}`);
}

function separador() {
  console.log(`${colors.blue}============================================${colors.reset}`);
}


let botProcess = null;
let restartCount = 0;
const MAX_RESTART_COUNT = 10;
const RESTART_COUNT_RESET_INTERVAL = 60000;


function setupGracefulShutdown() {
    const lang = getMessages();
  const shutdown = () => {
    console.log('\n');
    mensagem(lang.shutting_down);
    
    if (botProcess) {
      botProcess.removeAllListeners('close');
      botProcess.kill();
    }
    
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  
  if (isWindows) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('SIGINT', () => {
      shutdown();
    });
  }
}


async function displayHeader() {
    const lang = getMessages();
  const header = [
    `   ${colors.bold}${lang.starter_header}${colors.reset}        `,
    `   ${colors.bold}${lang.starter_version(version)}${colors.reset}`
  ];
  
  separador();

  for (const line of header) {
    await new Promise(resolve => {
      process.stdout.write(line + '\n');
      setTimeout(resolve, 100);
    });
  }
  
  separador();
  console.log();
}


async function checkPrerequisites() {
    const lang = getMessages();
  if (!fsSync.existsSync(CONFIG_PATH)) {
    aviso(lang.config_not_found);
    mensagem(lang.run_config_command(`${colors.blue}npm run config${colors.reset}`));
    process.exit(1);
  }

  if (!fsSync.existsSync(NODE_MODULES_PATH)) {
    aviso(lang.modules_not_found);
    mensagem(lang.run_install_command(`${colors.blue}npm run config:install${colors.reset}`));
    process.exit(1);
  }

  if (!fsSync.existsSync(CONNECT_FILE)) {
    aviso(lang.connection_file_not_found(CONNECT_FILE));
    aviso(lang.check_installation);
    process.exit(1);
  }
}


function startBot(codeMode = false) {
    const lang = getMessages();

  const args = ['--expose-gc', CONNECT_FILE];
  if (codeMode) args.push('--code');
  if (dualMode) args.push('--dual');

  info(codeMode ? lang.starting_with_code(dualMode) : lang.starting_with_qrcode(dualMode));
  
  botProcess = spawn('node', args, {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' }
  });
  
  botProcess.on('error', (error) => {
    aviso(lang.error_starting_process(error.message));
    restartBot(codeMode);
  });
  
  botProcess.on('close', (code) => {
    if (code !== 0) {
      aviso(lang.bot_crashed(code));
      restartBot(codeMode);
    }
  });
  
  return botProcess;
}


function restartBot(codeMode) {
    const lang = getMessages();
  restartCount++;

  let delay = RESTART_DELAY;
  
  if (restartCount > MAX_RESTART_COUNT) {
    const exponentialDelay = Math.min(30000, RESTART_DELAY * Math.pow(1.5, restartCount - MAX_RESTART_COUNT));
    delay = exponentialDelay;
    aviso(lang.many_restarts(restartCount, Math.round(delay/1000)));
  } else {
    aviso(lang.restarting_bot(delay/1000));
  }
  
  setTimeout(() => {
    if (botProcess) {
      botProcess.removeAllListeners('close');
      botProcess.removeAllListeners('error');
    }
    startBot(codeMode);
  }, delay);
}


async function checkAutoConnect() {
    const lang = getMessages();
  try {
    if (!fsSync.existsSync(QR_CODE_DIR)) {
      await fs.mkdir(QR_CODE_DIR, { recursive: true });
      return false;
    }

    const files = await fs.readdir(QR_CODE_DIR);
    return files.length > 2;
  } catch (error) {
    aviso(lang.error_checking_qr(error.message));
    return false;
  }
}


async function promptConnectionMethod() {
    const lang = getMessages();
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log(`${colors.yellow}${lang.ask_connection_method}${colors.reset}`);
    console.log(`${colors.yellow}${lang.qr_code_connection}${colors.reset}`);
    console.log(`${colors.yellow}${lang.code_connection}${colors.reset}`);
    console.log(`${colors.yellow}${lang.exit_option}${colors.reset}`);
    
    rl.question(`${lang.choose_option} `, (answer) => {
      console.log();
      rl.close();
      
      switch (answer.trim()) {
        case '1':
          mensagem(lang.starting_qr_connection);
          resolve({ method: 'qr' });
          break;
        case '2':
          mensagem(lang.starting_code_connection);
          resolve({ method: 'code' });
          break;
        case '3':
          mensagem(lang.exiting);
          process.exit(0);
          break;
        default:
          aviso(lang.invalid_option_qr_default);
          resolve({ method: 'qr' });
      }
    });
  });
}


async function main() {
  try {
    await loadMessages();
    const lang = getMessages();
    setupGracefulShutdown();
    await displayHeader();
    await checkPrerequisites();
    const hasSession = await checkAutoConnect();
    if (hasSession) {
      mensagem(lang.qr_detected_auto_connect);
      startBot(false);
    } else {
      const { method } = await promptConnectionMethod();
      startBot(method === 'code');
    }
  } catch (error) {
    const lang = getMessages();
    aviso(lang.unexpected_error(error.message));
    process.exit(1);
  }
}


main().catch(error => {
    const lang = getMessages();
  aviso(lang.fatal_error(error.message));
  process.exit(1);
}); 