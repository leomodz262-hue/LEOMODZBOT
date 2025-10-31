const { default: makeWASocket } = require('whaileys/lib/Socket');
const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('whaileys');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const readline = require('readline');
const pino = require('pino');
const fs = require('fs/promises');
const path = require('path');
const qrcode = require('qrcode-terminal');
const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');
const { fileURLToPath } = require('url');
const { dirname, join } = require('path');
const crypto = require('crypto');

const PerformanceOptimizer = require('./utils/performanceOptimizer.js');
const RentalExpirationManager = require('./utils/rentalExpirationManager.js');

class MessageQueue {
    constructor(maxWorkers = 4) {
        this.queue = [];
        this.maxWorkers = maxWorkers;
        this.activeWorkers = 0;
        this.isProcessing = false;
        this.processingInterval = null;
        this.errorHandler = null;
        this.stats = {
            totalProcessed: 0,
            totalErrors: 0,
            currentQueueLength: 0,
            startTime: Date.now()
        };
    }

    setErrorHandler(handler) {
        this.errorHandler = handler;
    }

    async add(message, processor) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                message,
                processor,
                resolve,
                reject,
                timestamp: Date.now(),
                id: crypto.randomUUID()
            });
            
            this.stats.currentQueueLength = this.queue.length;
            
            if (!this.isProcessing) {
                this.startProcessing();
            }
        });
    }

    startProcessing() {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        this.processingInterval = setInterval(() => {
            this.processQueue();
        }, 0);
    }

    stopProcessing() {
        if (this.processingInterval) {
            clearInterval(this.processingInterval);
            this.processingInterval = null;
        }
        this.isProcessing = false;
    }

    async processQueue() {
        if (this.activeWorkers >= this.maxWorkers || this.queue.length === 0) {
            if (this.activeWorkers === 0 && this.queue.length === 0) {
                this.stopProcessing();
            }
            return;
        }

        const item = this.queue.shift();
        if (!item) return;

        this.activeWorkers++;
        this.stats.currentQueueLength = this.queue.length;

        setImmediate(async () => {
            try {
                await this.processItem(item);
            } catch (error) {
                await this.handleProcessingError(item, error);
            } finally {
                this.activeWorkers--;
                this.stats.totalProcessed++;
                
                if (this.queue.length > 0) {
                    this.processQueue();
                } else if (this.activeWorkers === 0) {
                    this.stopProcessing();
                }
            }
        });
    }

    async processItem(item) {
        const { message, processor, resolve } = item;
        
        try {
            const result = await processor(message);
            resolve(result);
        } catch (error) {
            throw error;
        }
    }

    async handleProcessingError(item, error) {
        this.stats.totalErrors++;
        
        console.error(`❌ Queue processing error for message ${item.id}:`, error.message);
        
        if (this.errorHandler) {
            try {
                await this.errorHandler(item, error);
            } catch (handlerError) {
                console.error('❌ Error handler failed:', handlerError.message);
            }
        }
        
        item.reject(error);
    }

    getStatus() {
        const uptime = Date.now() - this.stats.startTime;
        return {
            queueLength: this.queue.length,
            activeWorkers: this.activeWorkers,
            maxWorkers: this.maxWorkers,
            isProcessing: this.isProcessing,
            totalProcessed: this.stats.totalProcessed,
            totalErrors: this.stats.totalErrors,
            currentQueueLength: this.stats.currentQueueLength,
            uptime: uptime,
            uptimeFormatted: this.formatUptime(uptime),
            throughput: this.stats.totalProcessed > 0 ?
                (this.stats.totalProcessed / (uptime / 1000)).toFixed(2) : 0,
            errorRate: this.stats.totalProcessed > 0 ?
                ((this.stats.totalErrors / this.stats.totalProcessed) * 100).toFixed(2) : 0
        };
    }

    formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    clear() {
        this.queue = [];
        this.stats.currentQueueLength = 0;
        this.stopProcessing();
    }

    pause() {
        this.stopProcessing();
    }

    resume() {
        if (!this.isProcessing && (this.queue.length > 0 || this.activeWorkers > 0)) {
            this.startProcessing();
        }
    }
}

const messageQueue = new MessageQueue(4);

const configPath = path.join(__dirname, "config.json");
let config = JSON.parse(readFileSync(configPath, "utf8"));

const indexModule = require('./index.js');

const performanceOptimizer = new PerformanceOptimizer();

const rentalExpirationManager = new RentalExpirationManager(null, {
    checkInterval: '0 */6 * * *',
    warningDays: 3,
    finalWarningDays: 1,
    cleanupDelayHours: 24,
    enableNotifications: true,
    enableAutoCleanup: true,
    logFile: path.join(__dirname, '../logs/rental_expiration.log')
});

const logger = pino({
    level: 'silent'
});

const AUTH_DIR = path.join(__dirname, '..', 'database', 'qr-code');
const DATABASE_DIR = path.join(__dirname, '..', 'database');
const GLOBAL_BLACKLIST_PATH = path.join(__dirname, '..', 'database', 'dono', 'globalBlacklist.json');

let msgRetryCounterCache;
let messagesCache;

async function initializeOptimizedCaches() {
    try {
        await performanceOptimizer.initialize();
        
        msgRetryCounterCache = {
            get: (key) => performanceOptimizer.cacheGet('msgRetry', key),
            set: (key, value, ttl) => performanceOptimizer.cacheSet('msgRetry', key, value, ttl),
            del: (key) => performanceOptimizer.modules.cacheManager?.del('msgRetry', key)
        };
        
        messagesCache = new Map();
        
    } catch (error) {
        console.error('❌ Erro ao inicializar sistema de otimização:', error.message);
        
        msgRetryCounterCache = new NodeCache({
            stdTTL: 5 * 60,
            useClones: false
        });
        messagesCache = new Map();
        
    }
}

const {
    prefixo,
    nomebot,
    nomedono,
    numerodono
} = config;
const codeMode = process.argv.includes('--code') || process.env.NAZUNA_CODE_MODE === '1';

setInterval(() => {
    if (messagesCache && messagesCache.size > 5000) {
        const keysToDelete = Array.from(messagesCache.keys()).slice(0, messagesCache.size - 2000);
        keysToDelete.forEach(key => messagesCache.delete(key));
    }
}, 600000);

const ask = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
    }));
};

async function clearAuthDir() {
    try {
        await fs.rm(AUTH_DIR, {
            recursive: true,
            force: true
        });
        console.log(`🗑️ Pasta de autenticação (${AUTH_DIR}) excluída com sucesso.`);
    } catch (err) {
        console.error(`❌ Erro ao excluir pasta de autenticação: ${err.message}`);
    }
}

async function loadGroupSettings(groupId) {
    const groupFilePath = path.join(DATABASE_DIR, 'grupos', `${groupId}.json`);
    try {
        const data = await fs.readFile(groupFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error(`❌ Erro ao ler configurações do grupo ${groupId}: ${e.message}`);
        return {};
    }
}

async function loadGlobalBlacklist() {
    try {
        const data = await fs.readFile(GLOBAL_BLACKLIST_PATH, 'utf-8');
        return JSON.parse(data).users || {};
    } catch (e) {
        console.error(`❌ Erro ao ler blacklist global: ${e.message}`);
        return {};
    }
}

function formatMessageText(template, replacements) {
    let text = template;
    for (const [key, value] of Object.entries(replacements)) {
        text = text.replaceAll(key, value);
    }
    return text;
}

async function createGroupMessage(NazunaSock, groupMetadata, participants, settings, isWelcome = true) {
    const jsonGp = await loadGroupSettings(groupMetadata.id);
    const mentions = participants.map(p => p);
    const bannerName = participants.length === 1 ? participants[0].split('@')[0] : `${participants.length} Membros`;
    const replacements = {
        '#numerodele#': participants.map(p => `@${p.split('@')[0]}`).join(', '),
        '#nomedogp#': groupMetadata.subject,
        '#desc#': groupMetadata.desc || 'Nenhuma',
        '#membros#': groupMetadata.participants.length,
    };
    const defaultText = isWelcome ?
        (jsonGp.textbv ? jsonGp.textbv : "🚀 Bem-vindo(a/s), #numerodele#! Vocês entraram no grupo *#nomedogp#*. Membros: #membros#.") :
        (jsonGp.exit.text ? jsonGp.exit.text : "👋 Adeus, #numerodele#! Até mais!");
    const text = formatMessageText(settings.text || defaultText, replacements);
    const message = {
        text,
        mentions
    };
    if (settings.image) {
        let profilePicUrl = 'https://raw.githubusercontent.com/nazuninha/uploads/main/outros/1747053564257_bzswae.bin';
        if (participants.length === 1 && isWelcome) {
            profilePicUrl = await NazunaSock.profilePictureUrl(participants[0], 'image').catch(() => profilePicUrl);
        }

        const modules = require('./funcs/exports.js');
        const {
        banner,
        } = modules;
       
        const image = settings.image !== 'banner' ? {
            url: settings.image
        } : null;
        
        if (image) {
            message.image = image;
            message.caption = text;
            delete message.text;
        }
    }
    return message;
}

async function handleGroupParticipantsUpdate(NazunaSock, inf) {
    try {
        const from = inf.id || inf.jid || (inf.participants && inf.participants.length > 0 ? inf.participants[0].split('@')[0] + '@s.whatsapp.net' : null);
        
        if (!from) {
            console.error('❌ Erro: ID do grupo não encontrado nos dados do evento.');
            return;
        }
        
        if (inf.participants.some(p => p.startsWith(NazunaSock.user.id.split(':')[0])))
            return;
            
        let groupMetadata = await NazunaSock.groupMetadata(from).catch(() => null);
        if (!groupMetadata) {
            console.error(`❌ Metadados do grupo ${from} não encontrados.`);
            return;
        }
        const groupSettings = await loadGroupSettings(from);
        const globalBlacklist = await loadGlobalBlacklist();
        switch (inf.action) {
            case 'add': {
                const membersToWelcome = [];
                const membersToRemove = [];
                const removalReasons = [];
                for (const participant of inf.participants) {
                    if (globalBlacklist[participant]) {
                        membersToRemove.push(participant);
                        removalReasons.push(`@${participant.split('@')[0]} (blacklist global: ${globalBlacklist[participant].reason})`);
                        continue;
                    }
                    if (groupSettings.blacklist?.[participant]) {
                        membersToRemove.push(participant);
                        removalReasons.push(`@${participant.split('@')[0]} (lista negra do grupo: ${groupSettings.blacklist[participant].reason})`);
                        continue;
                    }
                    if (groupSettings.bemvindo) {
                        membersToWelcome.push(participant);
                    }
                }
                if (membersToRemove.length > 0) {
                    await NazunaSock.groupParticipantsUpdate(from, membersToRemove, 'remove');
                    await NazunaSock.sendMessage(from, {
                        text: `🚫 Foram removidos ${membersToRemove.length} membros por regras de moderação:\n- ${removalReasons.join('\n- ')}`,
                        mentions: membersToRemove,
                    });
                }
                if (membersToWelcome.length > 0) {
                    const message = await createGroupMessage(NazunaSock, groupMetadata, membersToWelcome, groupSettings.welcome || {
                        text: groupSettings.textbv
                    });
                    await NazunaSock.sendMessage(from, message);
                }
                break;
            }
            case 'remove': {
                if (groupSettings.exit?.enabled) {
                    const message = await createGroupMessage(NazunaSock, groupMetadata, inf.participants, groupSettings.exit, false);
                    await NazunaSock.sendMessage(from, message);
                }
                break;
            }
            case 'promote':
            case 'demote': {
                // Check if anti-arquivamento is enabled
                if (groupSettings.antiarqv) {
                    // Check if the author is a group owner
                    const isOwner = groupSettings.groupOwners?.includes(inf.author);
                    
                    if (!isOwner) {
                        // Prevent the action if not a group owner
                        const action = inf.action === 'promote' ? 'promoção' : 'rebaixamento';
                        
                        // Revert the action by promoting/demoting back
                        for (const participant of inf.participants) {
                            try {
                                await NazunaSock.groupParticipantsUpdate(from, [participant], inf.action === 'promote' ? 'demote' : 'promote');
                                await NazunaSock.sendMessage(from, {
                                    text: `🛡️ @${inf.author.split('@')[0]}, você não tem permissão para ${action} membros! Apenas donos do grupo podem promover/rebaixar quando o anti-arquivamento está ativo. Ação revertida.`,
                                    mentions: [inf.author, participant],
                                });
                            } catch (revertError) {
                                console.error(`[ANTI-ARQUIVAMENTO] Erro ao reverter ${action} de ${participant}: ${revertError.message}`);
                            }
                        }
                        break; // Exit the switch statement
                    }
                }
                
                // X9 notification (only if anti-arquivamento didn't block)
                if (groupSettings.x9) {
                    for (const participant of inf.participants) {
                        const action = inf.action === 'promote' ? 'promovido a ADM' : 'rebaixado de ADM';
                        await NazunaSock.sendMessage(from, {
                            text: `🚨 @${participant.split('@')[0]} foi ${action} por @${inf.author.split('@')[0]}.`,
                            mentions: [participant, inf.author],
                        });
                    }
                }
                break;
            }
        }
    } catch (error) {
        console.error(`❌ Erro em handleGroupParticipantsUpdate: ${error.message}\n${error.stack}`);
    }
}

const isValidJid = (str) => /^\d+@s\.whatsapp\.net$/.test(str);
const isValidLid = (str) => /^[a-zA-Z0-9_]+@lid$/.test(str);
const isValidUserId = (str) => isValidJid(str) || isValidLid(str);

function collectJidsFromJson(obj, jidsSet = new Set()) {
    if (Array.isArray(obj)) {
        obj.forEach(item => collectJidsFromJson(item, jidsSet));
    } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(value => collectJidsFromJson(value, jidsSet));
    } else if (typeof obj === 'string' && isValidJid(obj)) {
        jidsSet.add(obj);
    }
    return jidsSet;
}

function replaceJidsInJson(obj, jidToLidMap, orphanJidsSet, replacementsCount = { count: 0 }, removalsCount = { count: 0 }) {
    if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
            const newItem = replaceJidsInJson(item, jidToLidMap, orphanJidsSet, replacementsCount, removalsCount);
            if (newItem !== item) obj[index] = newItem;
        });
    } else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === 'string' && isValidJid(value)) {
                if (jidToLidMap.has(value)) {
                    obj[key] = jidToLidMap.get(value);
                    replacementsCount.count++;
                } else if (orphanJidsSet.has(value)) {
                    delete obj[key];
                    removalsCount.count++;
                }
            } else {
                const newValue = replaceJidsInJson(value, jidToLidMap, orphanJidsSet, replacementsCount, removalsCount);
                if (newValue !== value) obj[key] = newValue;
            }
        });
    } else if (typeof obj === 'string' && isValidJid(obj)) {
        if (jidToLidMap.has(obj)) {
            replacementsCount.count++;
            return jidToLidMap.get(obj);
        } else if (orphanJidsSet.has(obj)) {
            removalsCount.count++;
            return null;
        }
    }
    return obj;
}

async function scanForJids(directory) {
    const uniqueJids = new Set();
    const affectedFiles = new Map();
    const jidFiles = new Map();

    const scanFileContent = async (filePath) => {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const jsonObj = JSON.parse(content);
            const fileJids = collectJidsFromJson(jsonObj);
            if (fileJids.size > 0) {
                affectedFiles.set(filePath, Array.from(fileJids));
                fileJids.forEach(jid => uniqueJids.add(jid));
            }
        } catch (parseErr) {
            console.warn(`⚠️ Arquivo ${filePath} não é JSON válido. Usando fallback regex.`);
            const jidPattern = /(\d+@s\.whatsapp\.net)/g;
            const content = await fs.readFile(filePath, 'utf-8');
            let match;
            const fileJids = new Set();
            while ((match = jidPattern.exec(content)) !== null) {
                const jid = match[1];
                uniqueJids.add(jid);
                fileJids.add(jid);
            }
            if (fileJids.size > 0) {
                affectedFiles.set(filePath, Array.from(fileJids));
            }
        }
    };

    const checkAndScanFilename = async (fullPath) => {
        try {
            const basename = path.basename(fullPath, '.json');
            const filenameMatch = basename.match(/(\d+@s\.whatsapp\.net)/);
            if (filenameMatch) {
                const jidFromName = filenameMatch[1];
                if (isValidJid(jidFromName)) {
                    uniqueJids.add(jidFromName);
                    jidFiles.set(jidFromName, fullPath);
                }
            }
            await scanFileContent(fullPath);
        } catch (err) {
            console.error(`Erro ao processar ${fullPath}: ${err.message}`);
        }
    };

    const scanDir = async (dirPath) => {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    await scanDir(fullPath);
                } else if (entry.name.endsWith('.json')) {
                    await checkAndScanFilename(fullPath);
                }
            }
        } catch (err) {
            console.error(`Erro ao escanear diretório ${dirPath}: ${err.message}`);
        }
    };

    await scanDir(directory);

    try {
        await scanFileContent(configPath);
        const configBasename = path.basename(configPath, '.json');
        const filenameMatch = configBasename.match(/(\d+@s\.whatsapp\.net)/);
        if (filenameMatch) {
            const jidFromName = filenameMatch[1];
            if (isValidJid(jidFromName)) {
                uniqueJids.add(jidFromName);
                jidFiles.set(jidFromName, configPath);
            }
        }
    } catch (err) {
        console.error(`Erro ao escanear config.json: ${err.message}`);
    }

    return {
        uniqueJids: Array.from(uniqueJids),
        affectedFiles: Array.from(affectedFiles.entries()),
        jidFiles: Array.from(jidFiles.entries())
    };
}

async function replaceJidsInContent(affectedFiles, jidToLidMap, orphanJidsSet) {
    let totalReplacements = 0;
    let totalRemovals = 0;
    const updatedFiles = [];

    for (const [filePath, jids] of affectedFiles) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            let jsonObj = JSON.parse(content);
            const replacementsCount = { count: 0 };
            const removalsCount = { count: 0 };
            replaceJidsInJson(jsonObj, jidToLidMap, orphanJidsSet, replacementsCount, removalsCount);
            if (replacementsCount.count > 0 || removalsCount.count > 0) {
                const updatedContent = JSON.stringify(jsonObj, null, 2);
                await fs.writeFile(filePath, updatedContent, 'utf-8');
                totalReplacements += replacementsCount.count;
                totalRemovals += removalsCount.count;
                updatedFiles.push(path.basename(filePath));
            }
        } catch (err) {
            console.error(`Erro ao substituir em ${filePath}: ${err.message}`);
        }
    }

    return { totalReplacements, totalRemovals, updatedFiles };
}

async function handleJidFiles(jidFiles, jidToLidMap, orphanJidsSet) {
    let totalReplacements = 0;
    let totalRemovals = 0;
    const updatedFiles = [];
    const renamedFiles = [];
    const deletedFiles = [];

    for (const [jid, oldPath] of jidFiles) {
        if (orphanJidsSet.has(jid)) {
            try {
                await fs.unlink(oldPath);
                deletedFiles.push(path.basename(oldPath));
                totalRemovals++;
                continue;
            } catch (err) {
                console.error(`Erro ao excluir arquivo órfão ${oldPath}: ${err.message}`);
            }
        }

        const lid = jidToLidMap.get(jid);
        if (!lid) {
            continue;
        }

        try {
            const content = await fs.readFile(oldPath, 'utf-8');
            let jsonObj = JSON.parse(content);
            const replacementsCount = { count: 0 };
            const removalsCount = { count: 0 };
            replaceJidsInJson(jsonObj, jidToLidMap, orphanJidsSet, replacementsCount, removalsCount);
            totalReplacements += replacementsCount.count;
            totalRemovals += removalsCount.count;

            const dir = path.dirname(oldPath);
            const newPath = join(dir, `${lid}.json`);

            try {
                await fs.access(newPath);
                continue;
            } catch {}

            const updatedContent = JSON.stringify(jsonObj, null, 2);
            await fs.writeFile(newPath, updatedContent, 'utf-8');
            await fs.unlink(oldPath);

            updatedFiles.push(path.basename(newPath));
            renamedFiles.push({ old: path.basename(oldPath), new: path.basename(newPath) });

        } catch (err) {
            console.error(`Erro ao processar renomeação de ${oldPath}: ${err.message}`);
        }
    }

    return { totalReplacements, totalRemovals, updatedFiles, renamedFiles, deletedFiles };
}

async function fetchLidWithRetry(NazunaSock, jid, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await NazunaSock.onWhatsApp(jid);
            if (result && result[0] && result[0].lid) {
                return { jid, lid: result[0].lid };
            }
            return null;
        } catch (err) {
            // Retry silently
        }
        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 100 * attempt));
        }
    }
    return null;
}

async function fetchLidsInBatches(NazunaSock, uniqueJids, batchSize = 5) {
    const lidResults = [];
    const jidToLidMap = new Map();
    let successfulFetches = 0;

    for (let i = 0; i < uniqueJids.length; i += batchSize) {
        const batch = uniqueJids.slice(i, i + batchSize);
        
        const batchPromises = batch.map(jid => fetchLidWithRetry(NazunaSock, jid));
        const batchResults = await Promise.allSettled(batchPromises);
        
        batchResults.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                const { jid, lid } = result.value;
                lidResults.push({ jid, lid });
                jidToLidMap.set(jid, lid);
                successfulFetches++;
            }
        });

        if (i + batchSize < uniqueJids.length) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    return { lidResults, jidToLidMap, successfulFetches };
}

async function updateOwnerLid(NazunaSock) {
    const ownerJid = `${numerodono}@s.whatsapp.net`;
    try {
        const result = await fetchLidWithRetry(NazunaSock, ownerJid);
        if (result) {
            config.lidowner = result.lid;
            await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
        }
    } catch (err) {
        console.error(`❌ Erro ao atualizar LID do dono: ${err.message}`);
    }
}

async function performMigration(NazunaSock) {
    let scanResult;
    try {
        scanResult = await scanForJids(DATABASE_DIR);
    } catch (err) {
        console.error(`Erro crítico no scan: ${err.message}`);
        return;
    }

    const { uniqueJids, affectedFiles, jidFiles } = scanResult;

    if (uniqueJids.length === 0) {
        return;
    }
    
    const { jidToLidMap, successfulFetches } = await fetchLidsInBatches(NazunaSock, uniqueJids);
    const orphanJidsSet = new Set(uniqueJids.filter(jid => !jidToLidMap.has(jid)));

    if (jidToLidMap.size === 0) {
        return;
    }

    let totalReplacements = 0;
    let totalRemovals = 0;
    const allUpdatedFiles = [];

    try {
        const renameResult = await handleJidFiles(jidFiles, jidToLidMap, orphanJidsSet);
        totalReplacements += renameResult.totalReplacements;
        totalRemovals += renameResult.totalRemovals;
        allUpdatedFiles.push(...renameResult.updatedFiles);

        const filteredAffected = affectedFiles.filter(([filePath]) => !jidFiles.some(([, jidPath]) => jidPath === filePath));
        const contentResult = await replaceJidsInContent(filteredAffected, jidToLidMap, orphanJidsSet);
        totalReplacements += contentResult.totalReplacements;
        totalRemovals += contentResult.totalRemovals;
        allUpdatedFiles.push(...contentResult.updatedFiles);
    } catch (processErr) {
        console.error(`Erro no processamento de substituições: ${processErr.message}`);
        return;
    }

}

async function createBotSocket(authDir) {
    try {
        const {
            banner
        } = require('./funcs/exports.js');
        await fs.mkdir(path.join(DATABASE_DIR, 'grupos'), { recursive: true });
        await fs.mkdir(authDir, { recursive: true });
        const {
            state,
            saveCreds,
            signalRepository
        } = await useMultiFileAuthState(authDir, makeCacheableSignalKeyStore);
        const {
            version,
            isLatest
        } = await fetchLatestBaileysVersion();
        const NazunaSock = makeWASocket({
            version,
            emitOwnEvents: true,
            fireInitQueries: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            connectTimeoutMs: 60000,
            retryRequestDelayMs: 5000,
            qrTimeout: 180000,
            keepAliveIntervalMs: 30_000,
            defaultQueryTimeoutMs: undefined,
            msgRetryCounterCache,
            auth: state,
            signalRepository,
            browser: ['Ubuntu', 'Edge', '110.0.1587.56'],
            logger,
        });

        if (codeMode && !NazunaSock.authState.creds.registered) {
            console.log('📱 Insira o número de telefone (com código de país, ex: +5511999999999): ');
            let phoneNumber = await ask('--> ');
            phoneNumber = phoneNumber.replace(/\D/g, '');
            if (!/^\d{10,15}$/.test(phoneNumber) || !phoneNumber.startsWith('55')) {
                console.log('⚠️ Número inválido! Use um número válido com código de país (ex: +5511999999999).');
                process.exit(1);
            }
            const code = await NazunaSock.requestPairingCode(phoneNumber.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', ''));
            console.log(`🔑 Código de pareamento: ${code}`);
            console.log('📲 Envie este código no WhatsApp para autenticar o bot.');
        }

        NazunaSock.ev.on('creds.update', saveCreds);

        NazunaSock.ev.on('groups.update', async ([ev]) => {
            try {
                const meta = await NazunaSock.groupMetadata(ev.id).catch(() => null);
                if (meta) {
                }
            } catch (e) {
                console.error(`❌ Erro ao atualizar metadados do grupo ${ev.id}: ${e.message}`);
            }
        });

        NazunaSock.ev.on('group-participants.update', async (inf) => {
            await handleGroupParticipantsUpdate(NazunaSock, inf);
        });

        let messagesListenerAttached = false;

        const queueErrorHandler = async (item, error) => {
            console.error(`❌ Critical error processing message ${item.id}:`, error);
            
            if (error.message.includes('ENOSPC') || error.message.includes('ENOMEM')) {
                console.error('🚨 Critical system error detected, triggering emergency cleanup...');
                try {
                    await performanceOptimizer.emergencyCleanup();
                } catch (cleanupErr) {
                    console.error('❌ Emergency cleanup failed:', cleanupErr.message);
                }
            }
            
            console.error({
                messageId: item.id,
                errorType: error.constructor.name,
                errorMessage: error.message,
                stack: error.stack,
                messageTimestamp: item.timestamp,
                queueStatus: messageQueue.getStatus()
            });
        };

        messageQueue.setErrorHandler(queueErrorHandler);

        const processMessage = async (info) => {
            if (!info.message || !info.key.remoteJid)
                return;
                
            if (info?.WebMessageInfo) {
                return;
            }
            
            if (messagesCache) {
                messagesCache.set(info.key.id, info.message);
            }
            
            if (typeof indexModule === 'function') {
                await indexModule(NazunaSock, info, null, null, messagesCache, rentalExpirationManager);
            } else {
                throw new Error('Módulo index.js não é uma função válida. Verifique o arquivo index.js.');
            }
        };

        const attachMessagesListener = () => {
            if (messagesListenerAttached) return;
            messagesListenerAttached = true;

            NazunaSock.ev.on('messages.upsert', async (m) => {
                if (!m.messages || !Array.isArray(m.messages) || m.type !== 'notify')
                    return;
                    
                try {
                    const messageProcessingPromises = m.messages.map(info =>
                        messageQueue.add(info, processMessage).catch(err => {
                            console.error(`❌ Failed to queue message ${info.key?.id}: ${err.message}`);
                        })
                    );
                    
                    await Promise.allSettled(messageProcessingPromises);
                    
                } catch (err) {
                    console.error(`❌ Error in message upsert handler: ${err.message}`);
                    
                    if (err.message.includes('ENOSPC') || err.message.includes('ENOMEM')) {
                        console.error('🚨 Critical system error detected, triggering emergency cleanup...');
                        try {
                            await performanceOptimizer.emergencyCleanup();
                        } catch (cleanupErr) {
                            console.error('❌ Emergency cleanup failed:', cleanupErr.message);
                        }
                    }
                }
            });
        };

        NazunaSock.ev.on('connection.update', async (update) => {
            const {
                connection,
                lastDisconnect,
                qr
            } = update;
            if (qr && !NazunaSock.authState.creds.registered && !codeMode) {
                console.log('🔗 QR Code gerado para autenticação:');
                qrcode.generate(qr, {
                    small: true
                }, (qrcodeText) => {
                    console.log(qrcodeText);
                });
                console.log('📱 Escaneie o QR code acima com o WhatsApp para autenticar o bot.');
            }
            if (connection === 'open') {
                console.log(`🔄 Conexão aberta. Inicializando sistema de otimização...`);
                
                await initializeOptimizedCaches();
                
                await updateOwnerLid(NazunaSock);
                await performMigration(NazunaSock);
                
                rentalExpirationManager.nazu = NazunaSock;
                await rentalExpirationManager.initialize();
                
                attachMessagesListener();
                console.log(`✅ Bot ${nomebot} iniciado com sucesso! Prefixo: ${prefixo} | Dono: ${nomedono}`);
                
                setTimeout(() => {
                    // Skip unnecessary initialization logs
                }, 5000);
            }
            if (connection === 'close') {
                const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
                const reasonMessage = {
                    [DisconnectReason.loggedOut]: 'Deslogado do WhatsApp',
                    401: 'Sessão expirada',
                    [DisconnectReason.connectionClosed]: 'Conexão fechada',
                    [DisconnectReason.connectionLost]: 'Conexão perdida',
                    [DisconnectReason.connectionReplaced]: 'Conexão substituída',
                    [DisconnectReason.timedOut]: 'Tempo de conexão esgotado',
                    [DisconnectReason.badSession]: 'Sessão inválida',
                    [DisconnectReason.restartRequired]: 'Reinício necessário',
                } [reason] || 'Motivo desconhecido';
                console.log(`❌ Conexão fechada. Código: ${reason} | Motivo: ${reasonMessage}`);
                if (reason === DisconnectReason.badSession || reason === DisconnectReason.loggedOut) {
                    await clearAuthDir();
                    console.log('🔄 Nova autenticação será necessária na próxima inicialização.');
                }
                console.log('🔄 Aguardando 5 segundos antes de reconectar...');
                setTimeout(() => {
                    startNazu();
                }, 5000);
            }
        });
        return NazunaSock;
    } catch (err) {
        console.error(`❌ Erro ao criar socket do bot: ${err.message}`);
        throw err;
    }
}

async function startNazu() {
    try {
        console.log('🚀 Iniciando LEO MODZ BOT...');
        await createBotSocket(AUTH_DIR);
    } catch (err) {
        console.error(`❌ Erro ao iniciar o bot: ${err.message}`);
        
        if (err.message.includes('ENOSPC')) {
            console.log('🧹 Tentando limpeza de emergência...');
            try {
                await performanceOptimizer.emergencyCleanup();
            } catch (cleanupErr) {
                console.error('❌ Falha na limpeza de emergência:', cleanupErr.message);
            }
        }
        
        console.log('🔄 Aguardando 5 segundos antes de tentar novamente...');
        setTimeout(() => {
            startNazu();
        }, 5000);
    }
}

process.on('SIGTERM', async () => {
    console.log('📡 SIGTERM recebido, parando bot graciosamente...');
    await performanceOptimizer.shutdown();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('📡 SIGINT recebido, parando bot graciosamente...');
    await performanceOptimizer.shutdown();
    process.exit(0);
});

process.on('uncaughtException', async (error) => {
    console.error('🚨 Erro não capturado:', error.message);
    
    if (error.message.includes('ENOSPC') || error.message.includes('ENOMEM')) {
        try {
            await performanceOptimizer.emergencyCleanup();
        } catch (cleanupErr) {
            console.error('❌ Falha na limpeza de emergência:', cleanupErr.message);
        }
    }
});

module.exports = { rentalExpirationManager };

startNazu();