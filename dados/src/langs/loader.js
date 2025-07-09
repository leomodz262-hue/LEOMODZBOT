const fs = require('fs').promises;
const path = require('path');
const allMessages = require('./index');

const CONFIG_FILE = path.join(__dirname, '..', 'config.json');

let messages = allMessages.pt;

async function loadMessages() {
  try {
    const configData = await fs.readFile(CONFIG_FILE, 'utf8');
    const config = JSON.parse(configData);
    const lang = config.language || 'en';

    if (allMessages[lang]) {
      messages = allMessages[lang];
    } else {
      console.warn(`Language '${lang}' not found, falling back to English.`);
    }
  } catch (error) {
    console.error(`Error loading language configuration, falling back to English. Error: ${error.message}`);
  }
}

function getMessages() {
  return messages;
}

module.exports = {
  loadMessages,
  getMessages,
};