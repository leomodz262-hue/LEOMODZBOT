/*
═════════════════════════════
  Nazuna - Conexão WhatsApp
  Autor: Hiudy
  Revisão: 09/07/2025
═════════════════════════════
*/

const { makeWASocket, useMultiFileAuthState, proto, DisconnectReason, getAggregateVotesInPollMessage, makeInMemoryStore, fetchLatestBaileysVersion } = require('@cognima/walib');
const Banner = require("@cognima/banners");
const { Boom } = require('@hapi/boom');
const { NodeCache } = require('@cacheable/node-cache');
const readline = require('readline');
const pino = require('pino');
const fs = require('fs').promises;
const path = require('path');
const { loadMessages, getMessages } = require('./langs/loader.js');

const lang = getMessages();

const logger = pino({ level: 'silent' });
const AUTH_DIR_PRIMARY = path.join(__dirname, '..', 'database', 'qr-code');
const AUTH_DIR_SECONDARY = path.join(__dirname, '..', 'database', 'qr-code-secondary');
const DATABASE_DIR = path.join(__dirname, '..', 'database', 'grupos');
const msgRetryCounterCache = new NodeCache({ stdTTL: 120, useClones: false });
const { prefixo, nomebot, nomedono, numerodono } = require('./config.json');

const indexModule = require(path.join(__dirname, 'index.js'));

const codeMode = process.argv.includes('--code');
const dualMode = process.argv.includes('--dual');
const messagesCache = new Map();
setInterval(() => messagesCache.clear(), 600000);

const ask = (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); }));
};

const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

let secondarySocket = null;
let useSecondary = false;

const store = makeInMemoryStore({ logger });

async function getMessage(key) {
  const msg = await store.loadMessage(key.remoteJid, key.id);
  return msg?.message || proto.Message.fromObject({});
}

async function createBotSocket(authDir, isPrimary = true) {
  await fs.mkdir(DATABASE_DIR, { recursive: true });
  await fs.mkdir(authDir, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  
  const { version, isLatest } = await fetchLatestBaileysVersion();
  
  const socket = makeWASocket({
    version,
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    qrTimeout: 180000,
    keepAliveIntervalMs: 10000,
    defaultQueryTimeoutMs: 0,
    msgRetryCounterCache,
    auth: state,
    printQRInTerminal: !codeMode,
    logger: logger,
    browser: ['Ubuntu', 'Edge', '110.0.1587.56'],
    getMessage
  });

  store.bind(socket.ev);

  socket.ev.on('creds.update', saveCreds);

  if (codeMode && !socket.authState.creds.registered) {
    let phoneNumber = await ask(lang.ask_phone_number);
    phoneNumber = phoneNumber.replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(phoneNumber)) {
      console.log(lang.invalid_number);
      process.exit(1);
    }
    const code = await socket.requestPairingCode(phoneNumber, 'N4ZUN4V3');
    console.log(lang.pairing_code(code));
    console.log(lang.pairing_instructions);
  }

  if (isPrimary) {
    socket.ev.on('groups.update', async ([ev]) => {
      const meta = await socket.groupMetadata(ev.id).catch(() => null);
      if (meta) groupCache.set(ev.id, meta);
    });

    socket.ev.on('group-participants.update', async (inf) => {
      const from = inf.id;
      if (inf.participants[0].startsWith(socket.user.id.split(':')[0])) return;

      let groupMetadata = groupCache.get(from);
      if (!groupMetadata) {
        groupMetadata = await socket.groupMetadata(from).catch(() => null);
        if (!groupMetadata) return;
        groupCache.set(from, groupMetadata);
      }

      const groupFilePath = path.join(DATABASE_DIR, `${from}.json`);
      let jsonGp;
      try {
        jsonGp = JSON.parse(await fs.readFile(groupFilePath, 'utf-8'));
      } catch (e) {
        return;
      }

      if ((inf.action === 'promote' || inf.action === 'demote') && jsonGp.x9) {
        const action = inf.action === 'promote' ? 'promovido a administrador' : 'rebaixado de administrador';
        const by = inf.author || 'alguém';
        await socket.sendMessage(from, {
          text: lang.x9_mode_message(inf.participants[0].split('@')[0], action, by.split('@')[0]),
          mentions: [inf.participants[0], by],
        });
      }

      if (inf.action === 'add' && jsonGp.antifake) {
        const participant = inf.participants[0];
        const countryCode = participant.split('@')[0].substring(0, 2);
        if (!['55', '35'].includes(countryCode)) {
          await socket.groupParticipantsUpdate(from, [participant], 'remove');
          await socket.sendMessage(from, {
            text: lang.antifake_remove_message(participant.split('@')[0]),
            mentions: [participant],
          });
        }
      }

      if (inf.action === 'add' && jsonGp.antipt) {
        const participant = inf.participants[0];
        const countryCode = participant.split('@')[0].substring(0, 3);
        if (countryCode === '351') {
          await socket.groupParticipantsUpdate(from, [participant], 'remove');
          await socket.sendMessage(from, {
            text: lang.antipt_remove_message(participant.split('@')[0]),
            mentions: [participant],
          });
        }
      }

      if (inf.action === 'add' && jsonGp.blacklist?.[inf.participants[0]]) {
        const sender = inf.participants[0];
        try {
          await socket.groupParticipantsUpdate(from, [sender], 'remove');
          await socket.sendMessage(from, {
            text: lang.blacklist_remove_message(sender.split('@')[0], jsonGp.blacklist[sender].reason),
            mentions: [sender],
          });
        } catch (e) {
          console.error(lang.error_removing_blacklist_user(from, e));
        }
        return;
      }

      if (inf.action === 'add' && jsonGp.bemvindo) {
        const sender = inf.participants[0];
        const textBv = jsonGp.textbv && jsonGp.textbv.length > 1
          ? lang.welcome_message.custom(jsonGp.textbv)
          : lang.welcome_message.default;

        const welcomeText = textBv
          .replaceAll('#numerodele#', `@${sender.split('@')[0]}`)
          .replaceAll('#nomedogp#', groupMetadata.subject)
          .replaceAll('#desc#', groupMetadata.desc || '')
          .replaceAll('#membros#', groupMetadata.participants.length);

        try {
          const message = { text: welcomeText, mentions: [sender] };
          if (jsonGp.welcome?.image) {
            let profilePic = 'https://raw.githubusercontent.com/nazuninha/uploads/main/outros/1747053564257_bzswae.bin';
            try {
              profilePic = await socket.profilePictureUrl(sender, 'image');
            } catch (error) {}
            const ImageZinha = jsonGp.welcome.image !== 'banner' ? { url: jsonGp.welcome.image } : await new Banner.welcomeLeave().setAvatar(profilePic).setTitle('Bem Vindo(a)').setMessage('Aceita um cafézinho enquanto lê as regras?').build();
            message.image = ImageZinha;
            delete message.text;
            message.caption = welcomeText;
          }
          await socket.sendMessage(from, message);
        } catch (e) {
          console.error(lang.error_sending_welcome(from, e));
        }
      }

      if (inf.action === 'remove' && jsonGp.exit?.enabled) {
        const sender = inf.participants[0];
        const exitText = jsonGp.exit.text && jsonGp.exit.text.length > 1
          ? lang.exit_message.custom(jsonGp.exit.text)
          : lang.exit_message.default;

        const formattedText = exitText
          .replaceAll('#numerodele#', `@${sender.split('@')[0]}`)
          .replaceAll('#nomedogp#', groupMetadata.subject)
          .replaceAll('#desc#', groupMetadata.desc || '')
          .replaceAll('#membros#', groupMetadata.participants.length);

        try {
          const message = { text: formattedText, mentions: [sender] };
          if (jsonGp.exit?.image) {
            message.image = { url: jsonGp.exit.image };
            message.caption = formattedText;
          }
          await socket.sendMessage(from, message);
        } catch (e) {
          console.error(lang.error_sending_exit(from, e));
        }
      }
    });

    socket.ev.on('messages.upsert', async (m) => {
      if (!m.messages || !Array.isArray(m.messages) || m.type !== 'notify') return;
      try {
        if (typeof indexModule === 'function') {
          for (const info of m.messages) {
            if (!info.message || !info.key.remoteJid) continue;
            messagesCache.set(info.key.id, info.message);
            const activeSocket = dualMode && useSecondary && secondarySocket?.user ? secondarySocket : socket;
            useSecondary = !useSecondary;
            await indexModule(activeSocket, info, store, groupCache, messagesCache);
          }
        } else {
          console.error(lang.invalid_index_module);
        }
      } catch (err) {
        console.error(lang.error_calling_index(err));
      }
    });

    socket.ev.on('messages.update', async (events) => {
      for (const { key, update } of events) {
        if (update.pollUpdates) {
          try {
            if (!key.fromMe) return;
            const pollCreation = await getMessage(key);
            if (pollCreation) {
              const pollResult = getAggregateVotesInPollMessage({
                message: pollCreation,
                pollUpdates: update.pollUpdates,
              });
              const votedOption = pollResult.find(v => v.voters.length !== 0);
              if (!votedOption) return;
              const toCmd = votedOption.name.replaceAll('•.̇𖥨֗🍓⭟ ', '');
              const Sender = votedOption.voters[0];
              const Timestamp = (update.pollUpdates.senderTimestampMs / 1000);
              const From = key.remoteJid;
              const Id = key.id;
              const JsonMessage = { key: { remoteJid: From, fromMe: false, id: Id, participant: Sender }, messageTimestamp: Timestamp, pushName: "", broadcast: false, newsletter: false, message: { conversation: toCmd}};
              const activeSocket = dualMode && useSecondary && secondarySocket?.user ? secondarySocket : socket;
              useSecondary = !useSecondary;
              store.messages[From].updateAssign(key.id, {message: {}, key: {}});
              await indexModule(activeSocket, JsonMessage, store, groupCache, messagesCache);
            }
          } catch (e) {
            console.error(lang.error_processing_poll(e));
          }
        }
      }
    });

    socket.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (connection === 'open') {
        console.log(lang.bot_started(nomebot, prefixo, nomedono, dualMode));
      }

      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        const reasonMessage = lang.reason_messages[reason] || 'Motivo desconhecido';
        if (reason) {
          console.log(lang.primary_connection_closed(reason, reasonMessage));
          if ([DisconnectReason.loggedOut, 401].includes(reason)) {
            await fs.rm(AUTH_DIR_PRIMARY, { recursive: true, force: true });
          }
        }

        await socket.end();
        console.log(lang.reconnecting_primary);
        startNazu();
      }

      if (connection === 'connecting') {
        console.log(lang.updating_primary_session);
      }
    });
  } else {
    socket.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open') {
        console.log(lang.secondary_connection_established);
      }

      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        console.log(lang.secondary_connection_closed(reason));

        if ([DisconnectReason.loggedOut, 401].includes(reason)) {
          await fs.rm(AUTH_DIR_SECONDARY, { recursive: true, force: true });
        }

        setTimeout(async () => {
          try {
            console.log(lang.reconnecting_secondary);
            secondarySocket = await createBotSocket(AUTH_DIR_SECONDARY, false);
          } catch (e) {
            console.error(lang.error_starting_secondary(e));
          }
        }, 5000);
      }

      if (connection === 'connecting') {
        console.log(lang.connecting_secondary_session);
      }
    });
  }

  return socket;
}

async function startNazu() {
  try {
    console.log(lang.starting_nazuna(dualMode));

    const primarySocket = await createBotSocket(AUTH_DIR_PRIMARY, true);

    if (dualMode) {
      console.log(lang.starting_dual_mode);
      try {
        secondarySocket = await createBotSocket(AUTH_DIR_SECONDARY, false);

        const waitForConnection = (socket) => {
          return new Promise((resolve) => {
            if (socket.user) {
              resolve();
            } else {
              socket.ev.on('connection.update', (update) => {
                if (update.connection === 'open') resolve();
              });
            }
          });
        };

        await Promise.all([
          waitForConnection(primarySocket),
          waitForConnection(secondarySocket),
        ]);

        console.log(lang.dual_mode_ready);
      } catch (err) {
        console.error(lang.error_starting_secondary(err));
        console.log(lang.continuing_primary_only);
      }
    }
  } catch (err) {
    console.error(lang.error_starting_bot(err));
    process.exit(1);
  }
}

startNazu();