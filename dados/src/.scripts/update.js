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

const REPO_URL = "https://github.com/hiudyy/nazuna.git";
const BACKUP_DIR = path.join(process.cwd(), `backup_${new Date().toISOString().replace(/[:.]/g, '_').replace(/T/, '_')}`);
const TEMP_DIR = path.join(process.cwd(), "temp_nazuna");
const isWindows = os.platform() === 'win32';


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


function printMessage(text) {
  console.log(`${colors.green}${text}${colors.reset}`);
}

function printWarning(text) {
  console.log(`${colors.red}${text}${colors.reset}`);
}

function printInfo(text) {
  console.log(`${colors.cyan}${text}${colors.reset}`);
}

function printDetail(text) {
  console.log(`${colors.dim}${text}${colors.reset}`);
}

function printSeparator() {
  console.log(`${colors.blue}============================================${colors.reset}`);
}


function setupGracefulShutdown() {
    const lang = getMessages();
  const shutdown = () => {
    console.log('\n');
    printWarning(lang.config_cancelled);
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}


async function displayHeader() {
    const lang = getMessages();
  const header = [
    `${colors.bold}${lang.updater_header}${colors.reset}`,
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
}


async function checkRequirements() {
    const lang = getMessages();
  printInfo(lang.checking_requirements);
  
  try {
    await execAsync('git --version');
    printDetail(lang.git_found);
  } catch (error) {
    printWarning(lang.git_not_found);
    if (isWindows) {
      printInfo(lang.git_download_win);
    } else if (os.platform() === 'darwin') {
      printInfo(lang.git_install_mac);
    } else {
      printInfo(lang.git_install_linux);
    }
    process.exit(1);
  }

  try {
    await execAsync('npm --version');
    printDetail(lang.npm_found);
  } catch (error) {
    printWarning(lang.npm_not_found);
    printInfo(lang.npm_download);
    process.exit(1);
  }
  
  printDetail(lang.requirements_met);
}


async function confirmUpdate() {
    const lang = getMessages();
  return new Promise((resolve) => {
    printWarning(lang.update_warning);
    printInfo(lang.backup_info);
    printWarning(lang.cancel_info);
    
    let countdown = 5;
    const timer = setInterval(() => {
      process.stdout.write(`\r${lang.starting_in(countdown)}${' '.repeat(20)}`);
      countdown--;
      
      if (countdown < 0) {
        clearInterval(timer);
        process.stdout.write("\r                                  \n");
        printMessage(lang.proceeding_with_update);
        resolve();
      }
    }, 1000);
  });
};


async function createBackup() {
    const lang = getMessages();
  printMessage(lang.creating_backup);
  
  try {
    await fs.mkdir(path.join(BACKUP_DIR, 'dados', 'database'), { recursive: true });
    await fs.mkdir(path.join(BACKUP_DIR, 'dados', 'src'), { recursive: true });
    await fs.mkdir(path.join(BACKUP_DIR, 'dados', 'midias'), { recursive: true });
    
    const databaseDir = path.join(process.cwd(), 'dados', 'database');
    if (fsSync.existsSync(databaseDir)) {
      printDetail(lang.copying_database);
      await copyDirectoryAsync(databaseDir, path.join(BACKUP_DIR, 'dados', 'database'));
    }

    const configFile = path.join(process.cwd(), 'dados', 'src', 'config.json');
    if (fsSync.existsSync(configFile)) {
      printDetail(lang.copying_config);
      await fs.copyFile(configFile, path.join(BACKUP_DIR, 'dados', 'src', 'config.json'));
    }
    
    const midiasDir = path.join(process.cwd(), 'dados', 'midias');
    if (fsSync.existsSync(midiasDir)) {
      printDetail(lang.copying_media);
      await copyDirectoryAsync(midiasDir, path.join(BACKUP_DIR, 'dados', 'midias'));
    }
    
    printMessage(lang.backup_saved_at(BACKUP_DIR));
  } catch (error) {
    printWarning(lang.error_creating_backup(error.message));
    throw error;
  }
}


async function copyDirectoryAsync(source, destination) {
  if (!fsSync.existsSync(destination)) {
    await fs.mkdir(destination, { recursive: true });
  }
  
  const files = await fs.readdir(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stats = await fs.stat(sourcePath);
    
    if (stats.isDirectory()) {
      await copyDirectoryAsync(sourcePath, destPath);
    } else {
      await fs.copyFile(sourcePath, destPath);
    }
  }
}


async function downloadUpdate() {
    const lang = getMessages();
  printMessage(lang.downloading_latest_version);
  
  try {
    if (fsSync.existsSync(TEMP_DIR)) {
      if (isWindows) {
        execSync(`rmdir /s /q "${TEMP_DIR}"`, { stdio: 'ignore' });
      } else {
        await fs.rm(TEMP_DIR, { recursive: true, force: true });
      }
    }

    printDetail(lang.cloning_repo);
    await new Promise((resolve, reject) => {
      const gitProcess = exec(`git clone --depth 1 ${REPO_URL} "${TEMP_DIR}"`, 
        (error) => error ? reject(error) : resolve());

      const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      let i = 0;
      const interval = setInterval(() => {
        process.stdout.write(`\r${spinner[i]} ${lang.downloading}`);
        i = (i + 1) % spinner.length;
      }, 100);
      
      gitProcess.on('close', () => {
        clearInterval(interval);
        process.stdout.write('\r                 \r');
        resolve();
      });
    });

    const readmePath = path.join(TEMP_DIR, 'README.md');
    if (fsSync.existsSync(readmePath)) {
      await fs.unlink(readmePath);
    }
    
    printMessage(lang.download_complete);
  } catch (error) {
    printWarning(lang.failed_to_download(error.message));
    printInfo(lang.checking_github_connectivity);
    try {
      if (isWindows) {
        await execAsync('ping github.com -n 1');
      } else {
        await execAsync('ping -c 1 github.com');
      }
      printWarning(lang.permission_or_git_config_error);
    } catch {
      printWarning(lang.internet_connection_error);
    }
    throw error;
  }
}


async function cleanOldFiles() {
    const lang = getMessages();
  printMessage(lang.cleaning_old_files);
  
  try {
    const gitDir = path.join(process.cwd(), '.git');
    if (fsSync.existsSync(gitDir)) {
      printDetail(lang.removing_git_dir);
      if (isWindows) {
        execSync(`rmdir /s /q "${gitDir}"`, { stdio: 'ignore' });
      } else {
        await fs.rm(gitDir, { recursive: true, force: true });
      }
    }

    const packageJson = path.join(process.cwd(), 'package.json');
    if (fsSync.existsSync(packageJson)) {
      printDetail(lang.removing_package_json);
      await fs.unlink(packageJson);
    }
    
    const packageLockJson = path.join(process.cwd(), 'package-lock.json');
    if (fsSync.existsSync(packageLockJson)) {
      printDetail(lang.removing_package_lock);
      await fs.unlink(packageLockJson);
    }

    const dadosDir = path.join(process.cwd(), 'dados');
    if (fsSync.existsSync(dadosDir)) {
      printDetail(lang.cleaning_data_dir);
      await cleanDirectoryAsync(dadosDir, BACKUP_DIR);
    }
    
    printMessage(lang.cleaning_complete);
  } catch (error) {
    printWarning(lang.error_cleaning_files(error.message));
    throw error;
  }
}


async function cleanDirectoryAsync(directory, excludeDir) {
  const files = await fs.readdir(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);

    if (filePath === excludeDir) {
      continue;
    }
    
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      if (isWindows) {
        execSync(`rmdir /s /q "${filePath}"`, { stdio: 'ignore' });
      } else {
        await fs.rm(filePath, { recursive: true, force: true });
      }
    } else {
      await fs.unlink(filePath);
    }
  }
}


async function applyUpdate() {
    const lang = getMessages();
  printMessage(lang.applying_update);
  
  try {
    const tempFiles = await fs.readdir(TEMP_DIR);
    let filesCopied = 0;

    for (const file of tempFiles) {
      const sourcePath = path.join(TEMP_DIR, file);
      const destPath = path.join(process.cwd(), file);
      
      const stats = await fs.stat(sourcePath);
      
      if (stats.isDirectory()) {
        printDetail(lang.copying_dir(file));
        await copyDirectoryAsync(sourcePath, destPath);
      } else {
        await fs.copyFile(sourcePath, destPath);
      }
      
      filesCopied++;

      if (filesCopied % 5 === 0) {
        printDetail(lang.files_copied(filesCopied, tempFiles.length));
      }
    }

    if (fsSync.existsSync(TEMP_DIR)) {
      if (isWindows) {
        execSync(`rmdir /s /q "${TEMP_DIR}"`, { stdio: 'ignore' });
      } else {
        await fs.rm(TEMP_DIR, { recursive: true, force: true });
      }
    }
    
    printMessage(lang.update_applied_success);
  } catch (error) {
    printWarning(lang.error_applying_update(error.message));
    throw error;
  }
}


async function restoreBackup() {
    const lang = getMessages();
  printMessage(lang.restoring_backup);
  
  try {
    await fs.mkdir(path.join(process.cwd(), 'dados', 'database'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'dados', 'src'), { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'dados', 'midias'), { recursive: true });

    const backupDatabaseDir = path.join(BACKUP_DIR, 'dados', 'database');
    if (fsSync.existsSync(backupDatabaseDir)) {
      printDetail(lang.restoring_database);
      await copyDirectoryAsync(backupDatabaseDir, path.join(process.cwd(), 'dados', 'database'));
    }

    const backupConfigFile = path.join(BACKUP_DIR, 'dados', 'src', 'config.json');
    if (fsSync.existsSync(backupConfigFile)) {
      printDetail(lang.restoring_config);
      await fs.copyFile(backupConfigFile, path.join(process.cwd(), 'dados', 'src', 'config.json'));
    }

    const backupMidiasDir = path.join(BACKUP_DIR, 'dados', 'midias');
    if (fsSync.existsSync(backupMidiasDir)) {
      printDetail(lang.restoring_media);
      await copyDirectoryAsync(backupMidiasDir, path.join(process.cwd(), 'dados', 'midias'));
    }
    
    printMessage(lang.restore_success);
  } catch (error) {
    printWarning(lang.error_restoring_backup(error.message));
    throw error;
  }
}


async function installDependencies() {
    const lang = getMessages();
  printMessage(lang.installing_deps);
  
  try {
    const installCommand = isWindows ? 
      'npm install --no-optional --force --no-bin-links' : 
      'npm install --no-optional --force --no-bin-links';

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
    
    printMessage(lang.deps_installed_success);
  } catch (error) {
    printWarning(lang.failed_to_install_deps(error.message));
    printInfo(lang.manual_install_prompt);
    throw error;
  }
}


async function cleanup() {
    const lang = getMessages();
  printMessage(lang.finishing_up);
  
  try {
    if (fsSync.existsSync(BACKUP_DIR)) {
        printDetail(lang.removing_backup_dir);
        if (isWindows) {
          execSync(`rmdir /s /q "${BACKUP_DIR}"`, { stdio: 'ignore' });
        } else {
          await fs.rm(BACKUP_DIR, { recursive: true, force: true });
        }
        printDetail(lang.backup_removed);
    }
  } catch (error) {
    printWarning(lang.error_cleaning_temp_files(error.message));
  }
}


async function promptYesNo(question, defaultAnswer = 'n') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    const defaultText = defaultAnswer.toLowerCase() === 's' ? 'S/n' : 's/N';
    rl.question(`${question} (${defaultText}): `, (answer) => {
      rl.close();
      const response = (answer.trim() || defaultAnswer).toLowerCase();
      resolve(response === 's' || response === 'sim' || response === 'y' || response === 'yes');
    });
  });
}


async function main() {
  try {
    await loadMessages();
    const lang = getMessages();
    setupGracefulShutdown();
    await displayHeader();

    const steps = [
      { name: lang.checking_requirements, func: checkRequirements },
      { name: lang.update_warning, func: confirmUpdate },
      { name: lang.creating_backup, func: createBackup },
      { name: lang.downloading_latest_version, func: downloadUpdate },
      { name: lang.cleaning_old_files, func: cleanOldFiles },
      { name: lang.applying_update, func: applyUpdate },
      { name: lang.restoring_backup, func: restoreBackup },
      { name: lang.installing_deps, func: installDependencies },
      { name: lang.finishing_up, func: cleanup }
    ];
    
    let completedSteps = 0;
    const totalSteps = steps.length;

    for (const step of steps) {
      await step.func();
      completedSteps++;
      printDetail(lang.progress(completedSteps, totalSteps));
    }
    
    printMessage(lang.fetching_commit_info);
    const response = await fetch('https://api.github.com/repos/hiudyy/nazuna/commits?per_page=1', {
      headers: { Accept: 'application/vnd.github+json' }
    });
    
    if (!response.ok) {
      throw new Error(lang.error_fetching_commits(`${response.status} ${response.statusText}`));
    }
    
    const linkHeader = response.headers.get('link');
    const NumberUp = linkHeader?.match(/page=(\d+)>;\s*rel="last"/)?.[1];
    
    const jsonUp = {
      total: NumberUp
    };
    
    await fs.writeFile(path.join(__dirname, '..', '..', 'database', 'updateSave.json'), JSON.stringify(jsonUp));
    
    printSeparator();
    printMessage(lang.update_complete_success);
    printMessage(lang.start_bot_prompt);
    printSeparator();
  } catch (error) {
    const lang = getMessages();
    printSeparator();
    printWarning(lang.error_during_update(error.message));
    printWarning(lang.backup_location_info(BACKUP_DIR));
    printInfo(lang.manual_restore_info);
    printInfo(lang.contact_dev_for_help);
    process.exit(1);
  }
}


main(); 