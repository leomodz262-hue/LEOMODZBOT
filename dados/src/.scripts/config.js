#!/usr/bin/env node


const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');
const readline = require('readline');
const os = require('os');
const { promisify } = require('util');
const execAsync = promisify(exec);
const { loadMessages, getMessages } = require('../langs/loader.js');


const CONFIG_FILE = path.join(process.cwd(), 'dados', 'src', 'config.json');
const isWindows = os.platform() === 'win32';


let version = 'Desconhecida';
try {
  const packageJson = JSON.parse(fsSync.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  version = packageJson.version;
} catch (error) {

};


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
  underline: '\x1b[4m'
};


function printMessage(text) {
  console.log(`${colors.green}${text}${colors.reset}`);
};

function printWarning(text) {
  console.log(`${colors.red}${text}${colors.reset}`);
};

function printInfo(text) {
  console.log(`${colors.cyan}${text}${colors.reset}`);
};

function printDetail(text) {
  console.log(`${colors.dim}${text}${colors.reset}`);
};

function printSeparator() {
  console.log(`${colors.blue}============================================${colors.reset}`);
};


function validateInput(input, field) {
    const lang = getMessages();
  switch (field) {
    case 'prefixo':
      if (input.length !== 1) {
        printWarning(lang.invalid_prefix);
        return false;
      };
      return true;
      
    case 'numero':
      if (!/^[0-9]{10,15}$/.test(input)) {
        printWarning(lang.invalid_number);
        printDetail(lang.example_number);
        return false;
      };
      return true;
    
    case 'language':
        const validLanguages = ['en', 'pt', 'es', 'fr', 'id'];
        if (!validLanguages.includes(input)) {
            printWarning(lang.invalid_language(validLanguages));
            return false;
        }
        return true;

    default:
      return true;
  };
};


function setupGracefulShutdown() {
    const lang = getMessages();
  const shutdown = () => {
    console.log('\n');
    printWarning(lang.config_cancelled);
    process.exit(0);
  };
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};


async function installDependencies() {
    const lang = getMessages();
  printSeparator();
  printMessage(lang.installing_dependencies);
  
  try {
    const installCommand = isWindows ? 'npm install --no-optional --force --no-bin-links' : 'npm install --no-optional --force --no-bin-links';

    await new Promise((resolve, reject) => {
      const npmProcess = exec(installCommand, (error) => {
        if (error) reject(error);
        else resolve();
      });
      
      const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      let i = 0;
      const interval = setInterval(() => {
        process.stdout.write(`\r${spinner[i]} ${lang.installing_dependencies}`);
        i = (i + 1) % spinner.length;
      }, 100);
      
      npmProcess.on('close', () => {
        clearInterval(interval);
        process.stdout.write('\r                                \r');
      });
    });
    
    printMessage(lang.install_complete);
  } catch (error) {
    printWarning(lang.install_error(error.message));
    printInfo(lang.manual_install_info);
    process.exit(1);
  };
};


async function displayHeader() {
    const lang = getMessages();
  const header = [
    `${colors.bold}${lang.config_welcome(version)}${colors.reset}`,
    `${colors.bold}${lang.creator_message}${colors.reset}`
  ];
  
  printSeparator();

  for (const line of header) {
    await new Promise(resolve => {
      process.stdout.write(line + '\n');
      setTimeout(resolve, 100);
    });
  }
  
  printSeparator();
  console.log();
};


async function main() {
  try {
    await loadMessages();
    const lang = getMessages();
    setupGracefulShutdown();

    if (process.argv.includes('--install')) {
      await installDependencies();
      process.exit(0);
    };

    await displayHeader();

    const defaultConfig = {
      nomedono: "",
      numerodono: "",
      nomebot: "",
      prefixo: "!",
      language: "en",
      aviso: false,
      debug: false,
      enablePanel: false
    };

    const locale = os.userInfo().username.split('.')[0].toLowerCase();
    if (['pt', 'es', 'fr', 'id'].includes(locale)) {
      defaultConfig.language = locale;
    }
    
    let config = { ...defaultConfig };
    
    try {
      if (fsSync.existsSync(CONFIG_FILE)) {
        const existingConfig = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf8'));
        config = { ...config, ...existingConfig };
        printInfo(lang.existing_config_loaded);
      }
    } catch (error) {
      printWarning(lang.error_reading_config(error.message));
      printInfo(lang.using_default_values);
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    printInfo(`${colors.bold}${colors.underline}${lang.basic_config_title}${colors.reset}`);
    config.nomedono = await promptInput(rl, lang.ask_owner_name, config.nomedono);
    config.numerodono = await promptInput(rl, lang.ask_owner_number, config.numerodono, "numero");
    config.nomebot = await promptInput(rl, lang.ask_bot_name, config.nomebot);
    config.prefixo = await promptInput(rl, lang.ask_prefix, config.prefixo, "prefixo");
    config.language = await promptInput(rl, lang.ask_language, config.language, "language");


    config.aviso = false;
    config.debug = false;
    config.enablePanel = false;

    try {
      const configDir = path.dirname(CONFIG_FILE);
      if (!fsSync.existsSync(configDir)) {
        await fs.mkdir(configDir, { recursive: true });
      }

      await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));

      console.log();
      printInfo(lang.config_summary);
      printDetail(lang.owner_name_summary(config.nomedono));
      printDetail(lang.owner_number_summary(config.numerodono));
      printDetail(lang.bot_name_summary(config.nomebot));
      printDetail(lang.prefix_summary(config.prefixo));
      printDetail(lang.language_summary(config.language));


      printSeparator();
      printMessage(lang.config_saved_success);
      printSeparator();
      
      const installNow = await confirm(rl, lang.ask_install_deps, "s");
      
      if (installNow) {
        rl.close();
        await installDependencies();
      } else {
        printMessage(lang.install_later_info);
      }
      
      printSeparator();
      printMessage(lang.nazuna_ready(version));
      printSeparator();
    } catch (error) {
      printWarning(lang.error_saving_config(error.message));
    }
    
    rl.close();
  } catch (error) {
    const lang = getMessages();
    printWarning(lang.unexpected_error(error.message));
    process.exit(1);
  }
}


async function promptInput(rl, prompt, defaultValue, field = null) {
    const lang = getMessages();
  return new Promise((resolve) => {
    const displayPrompt = `${prompt} ${colors.dim}${lang.prompt_input_current(defaultValue)}${colors.reset}: `;
    rl.question(displayPrompt, (input) => {
      const value = input.trim() || defaultValue;
      
      if (field && !validateInput(value, field)) {
        return promptInput(rl, prompt, defaultValue, field).then(resolve);
      }
      
      resolve(value);
    });
  });
}


async function confirm(rl, prompt, defaultValue = 'n') {
  return new Promise((resolve) => {
    const defaultText = defaultValue.toLowerCase() === 's' ? 'S/n' : 's/N';
    rl.question(`${prompt} (${defaultText}): `, (input) => {
      const response = (input.trim() || defaultValue).toLowerCase();
      resolve(response === 's' || response === 'sim' || response === 'y' || response === 'yes');
    });
  });
}


main().catch(error => {
    const lang = getMessages();
  printWarning(lang.fatal_error(error.message));
  process.exit(1);
}); 