// Dependências principais
import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} from '@cognima/walib';
import { Boom } from '@hapi/boom';
import NodeCache from '@cacheable/node-cache';
import readline from 'readline';
import pino from 'pino';
import fs from 'fs/promises';
import path from 'path';
import qrcode from 'qrcode-terminal';
import { readFile } from "fs/promises";

// Módulos nativos do Node.js
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

// Módulos locais
import indexModule from './index.js';

// =============================================================================
// CONFIGURAÇÃO E CONSTANTES
// =============================================================================

// Constantes específicas do Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar configuração do arquivo JSON
const config = JSON.parse(
  await readFile(new URL("./config.json", import.meta.url), "utf8")
);

// Diretórios e caminhos
const AUTH_DIR = path.join(__dirname, '..', 'database', 'qr-code');
const DATABASE_DIR = path.join(__dirname, '..', 'database', 'grupos');
const GLOBAL_BLACKLIST_PATH = path.join(__dirname, '..', 'database', 'dono', 'globalBlacklist.json');

// Configuração de cache
const CACHE_TTL = 5 * 60; // 5 minutos em segundos
const MESSAGE_CACHE_CLEANUP_INTERVAL = 600000; // 10 minutos em milissegundos
const CONNECTION_RETRY_DELAY = 5000; // 5 segundos em milissegundos
const CONNECTION_TIMEOUT = 60000; // 60 segundos em milissegundos
const QR_TIMEOUT = 180000; // 3 minutos em milissegundos
const KEEP_ALIVE_INTERVAL = 30_000; // 30 segundos em milissegundos

// Constantes de tempo (em milissegundos)
const CINCO_SEGUNDOS = 5000;
const TRINTA_SEGUNDOS = 30_000;
const UM_MINUTO = 60_000;
const TRES_MINUTOS = 180_000;
const DEZ_MINUTOS = 600_000;

// Constantes de validação de telefone
const CODIGO_PAIS_BRASIL = '55';
const CODIGO_PAIS_PORTUGAL = '351';
const TAMANHO_MIN_TELEFONE = 10;
const TAMANHO_MAX_TELEFONE = 15;

// Marcadores de modelo de mensagem
const MARCADOR_NUMERO = '#numerodele#';
const MARCADOR_NOME_GRUPO = '#nomedogp#';
const MARCADOR_DESCRICAO = '#desc#';
const MARCADOR_MEMBROS = '#membros#';

// Mensagens padrão
const MENSAGEM_BOAS_VINDAS_PADRAO = '🚀 Bem-vindo(a/s), #numerodele#! Vocês entraram no grupo *#nomedogp#*. Membros: #membros#.';
const MENSAGEM_SAIDA_PADRAO = '👋 Adeus, #numerodele#! Até mais!';

// Tipos de ação do bot
const ACAO_ADICIONAR = 'add';
const ACAO_REMOVER = 'remove';
const ACAO_PROMOVER = 'promote';
const ACAO_REBAIXAR = 'demote';

// Configuração de cache
const TAMANHO_MAX_CACHE_MENSAGENS = 1000;
const MAXIMO_PROCESSAMENTO_CONCORRENTE = 5;
const MAXIMO_TENTATIVAS_INICIO = 3;

// Prefixos de log
const PREFIXO_LOG_MODERACAO = '[MODERACAO]';
const PREFIXO_LOG_BOAS_VINDAS = '[BOAS_VINDAS]';
const PREFIXO_LOG_SAIDA = '[SAIDA]';
const PREFIXO_LOG_ADMIN = '[ADMIN]';
const PREFIXO_LOG_AUTENTICACAO = '[AUTENTICACAO]';
const PREFIXO_LOG_ERRO = '[ERRO]';
const PREFIXO_LOG_INFO = '[INFO]';

// Configuração do bot
const {
    prefixo,
    nomebot,
    nomedono,
    numerodono
} = config;

// Estado da aplicação
const modoCodigo = process.argv.includes('--code');
const logger = pino({
    level: 'silent'
});

// Utilitários de compatibilidade
const sanitizarNumero = (num) => String(num).split('+').join('').split(' ').join('').split('-').join('');

// =============================================================================
// INSTÂNCIAS DE CACHE
// =============================================================================

// Cache para contador de tentativas de retry de mensagens
const cacheContadorRetentativa = new NodeCache({
    stdTTL: CACHE_TTL,
    useClones: false
});

// Cache para metadados de grupos
const cacheGrupos = new NodeCache({
    stdTTL: CACHE_TTL,
    useClones: false
});

// Cache de mensagens com limpeza automática e limite de tamanho
const cacheMensagens = new Map();

// Limpeza periódica do cache de mensagens
setInterval(() => {
    // Limpa o cache periodicamente
    cacheMensagens.clear();
}, MESSAGE_CACHE_CLEANUP_INTERVAL);

// Função auxiliar para adicionar mensagens ao cache com segurança
function adicionarMensagemAoCache(id, mensagem) {
    // Impede que o cache cresça demais
    if (cacheMensagens.size >= TAMANHO_MAX_CACHE_MENSAGENS) {
        // Remove entradas mais antigas (primeiras entradas na ordem de iteração do Map)
        const chavesParaRemover = Array.from(cacheMensagens.keys()).slice(0, Math.floor(TAMANHO_MAX_CACHE_MENSAGENS / 2));
        chavesParaRemover.forEach(chave => cacheMensagens.delete(chave));
    }
    
    cacheMensagens.set(id, mensagem);
}

// Função de limpeza para todos os caches
async function limparTodosOsCaches() {
    // Limpa todos os caches
    cacheMensagens.clear();
    cacheGrupos.flushAll();
    cacheContadorRetentativa.flushAll();
    
    console.log('🧹 Todos os caches foram limpos');
}

// Adiciona handler de desligamento gracioso
process.on('SIGINT', async () => {
    console.log('\n🛑 Recebido SIGINT, desligando gracefulmente...');
    try {
        await limparTodosOsCaches();
        console.log('✅ Limpeza concluída. Saindo...');
        process.exit(0);
    } catch (erro) {
        console.error(`❌ Erro durante a limpeza: ${erro.message}`);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Recebido SIGTERM, desligando gracefulmente...');
    try {
        await limparTodosOsCaches();
        console.log('✅ Limpeza concluída. Saindo...');
        process.exit(0);
    } catch (erro) {
        console.error(`❌ Erro durante a limpeza: ${erro.message}`);
        process.exit(1);
    }
});

// =============================================================================
// FUNÇÕES UTILITÁRIAS
// =============================================================================

/**
 * Função auxiliar para perguntar entrada ao usuário
 * @param {string} pergunta - Pergunta para fazer ao usuário
 * @returns {Promise<string>} Resposta do usuário
 */
const perguntar = (pergunta) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => rl.question(pergunta, (resposta) => {
        rl.close();
        resolve(resposta.trim());
    }));
};

/**
 * Valida um número de telefone de acordo com regras especificadas
 * @param {string} numeroTelefone - Número de telefone para validar
 * @returns {boolean} True se válido, false caso contrário
 */
function validarNumeroTelefone(numeroTelefone) {
    const numeroLimpo = numeroTelefone.replace(/\D/g, '');
    const comprimentoValido = /^\d{10,15}$/.test(numeroLimpo);
    const codigoPaisValido = numeroLimpo.startsWith(CODIGO_PAIS_BRASIL) ||
                            numeroLimpo.startsWith(CODIGO_PAIS_PORTUGAL);
    
    return comprimentoValido && codigoPaisValido;
}

/**
 * Formata o texto da mensagem substituindo marcadores por valores
 * @param {string} modelo - String do modelo com marcadores
 * @param {Object} substituicoes - Objeto com pares marcador-valor
 * @returns {string} Texto da mensagem formatado
 */
function formatarTextoMensagem(modelo, substituicoes) {
    // Compat: evitar depender de String.prototype.replaceAll em ambientes antigos
    const replaceAllCompat = (str, search, replacement) => str.split(search).join(replacement);
    let texto = modelo;
    for (const [chave, valor] of Object.entries(substituicoes)) {
        texto = replaceAllCompat(texto, chave, String(valor));
    }
    return texto;
}

/**
 * Gera uma URL padrão para foto de perfil
 * @returns {string} URL padrão da foto de perfil
 */
function obterUrlFotoPerfilPadrao() {
    return 'https://raw.githubusercontent.com/nazuninha/uploads/main/outros/1747053564257_bzswae.bin';
}

// =============================================================================
// OPERAÇÕES COM ARQUIVOS
// =============================================================================

/**
 * Limpa o diretório de autenticação
 * @throws {Error} Se a exclusão do diretório falhar
 */
async function limparDiretorioAutenticacao() {
    try {
        await fs.rm(AUTH_DIR, {
            recursive: true,
            force: true
        });
        console.log(`🗑️ Diretório de autenticação (${AUTH_DIR}) limpo com sucesso.`);
    } catch (err) {
        const errorMessage = `Falha ao limpar diretório de autenticação em ${AUTH_DIR}: ${err.message}`;
        console.error(`❌ ${errorMessage}`);
        throw new Error(errorMessage, { cause: err });
    }
}

/**
 * Carrega as configurações do grupo a partir do arquivo JSON
 * @param {string} groupId - O ID do grupo
 * @returns {Promise<Object>} Objeto de configurações do grupo
 * @throws {Error} Se a leitura do arquivo ou parse do JSON falhar
 */
async function carregarConfiguracoesGrupo(groupId) {
    if (!groupId || typeof groupId !== 'string') {
        throw new Error('ID de grupo inválido fornecido');
    }
    
    const caminhoArquivoGrupo = path.join(DATABASE_DIR, `${groupId}.json`);
    
    try {
        const data = await fs.readFile(caminhoArquivoGrupo, 'utf-8');
        const settings = JSON.parse(data);
        
        // Valida a estrutura necessária
        if (!settings || typeof settings !== 'object') {
            throw new Error('Formato de configurações de grupo inválido');
        }
        
        return settings;
    } catch (e) {
        const errorMessage = `Falha ao carregar configurações do grupo ${groupId} de ${caminhoArquivoGrupo}: ${e.message}`;
        console.error(`❌ ${errorMessage}`);
        
        // Retorna objeto vazio em vez de lançar erro para manter compatibilidade retroativa
        // mas registra o erro para depuração
        return {};
    }
}

/**
 * Carrega a lista global de bloqueados do arquivo JSON
 * @returns {Promise<Object>} Objeto da lista global de bloqueados
 * @throws {Error} Se a leitura do arquivo ou parse do JSON falhar
 */
async function carregarListaGlobalBloqueados() {
    try {
        const data = await fs.readFile(GLOBAL_BLACKLIST_PATH, 'utf-8');
        const blacklistData = JSON.parse(data);
        
        // Valida a estrutura
        if (!blacklistData || typeof blacklistData !== 'object') {
            throw new Error('Formato de dados da lista de bloqueio inválido');
        }
        
        return blacklistData.users || {};
    } catch (e) {
        const errorMessage = `Falha ao carregar lista global de bloqueios de ${GLOBAL_BLACKLIST_PATH}: ${e.message}`;
        console.error(`❌ ${errorMessage}`);
        
        // Retorna objeto vazio em vez de lançar erro para manter compatibilidade retroativa
        // mas registra o erro para depuração
        return {};
    }
}

// =============================================================================
// FUNÇÕES DE TRATAMENTO DE MENSAGENS
// =============================================================================

/**
 * Cria uma mensagem de grupo (boas-vindas ou despedida)
 * @param {Object} NazunaSock - Instância do socket do WhatsApp
 * @param {Object} groupMetadata - Metadados do grupo
 * @param {Array<string>} participants - Array de JIDs dos participantes
 * @param {Object} settings - Configurações da mensagem
 * @param {boolean} isWelcome - True para mensagem de boas-vindas, false para despedida
 * @returns {Promise<Object>} Objeto de mensagem para enviar
 */
async function criarMensagemGrupo(NazunaSock, groupMetadata, participants, settings, isWelcome = true) {
    // Validação de entrada
    if (!NazunaSock || typeof NazunaSock !== 'object') {
        throw new Error('Objeto NazunaSock inválido fornecido');
    }
    
    if (!groupMetadata || typeof groupMetadata !== 'object') {
        throw new Error('Metadados de grupo inválidos fornecidos');
    }
    
    if (!Array.isArray(participants) || participants.length === 0) {
        throw new Error('Array de participantes inválido fornecido');
    }
    
    if (!settings || typeof settings !== 'object') {
        throw new Error('Objeto de configurações inválido fornecido');
    }
    
    try {
        const jsonGp = await carregarConfiguracoesGrupo(groupMetadata.id);
        const mentions = participants.map(p => p);
        const bannerName = participants.length === 1 ? participants[0].split('@')[0] : `${participants.length} Membros`;
        
        const replacements = {
            [MARCADOR_NUMERO]: participants.map(p => `@${p.split('@')[0]}`).join(', '),
            [MARCADOR_NOME_GRUPO]: groupMetadata.subject,
            [MARCADOR_DESCRICAO]: groupMetadata.desc || 'Nenhuma',
            [MARCADOR_MEMBROS]: groupMetadata.participants.length,
        };
        
        const defaultText = isWelcome
            ? (jsonGp?.textbv || MENSAGEM_BOAS_VINDAS_PADRAO)
            : (jsonGp?.exit?.text || MENSAGEM_SAIDA_PADRAO);
        
        const text = formatarTextoMensagem(settings.text || defaultText, replacements);
        const message = {
            text,
            mentions
        };
        
        if (settings.image) {
            let profilePicUrl = obterUrlFotoPerfilPadrao();
            if (participants.length === 1 && isWelcome) {
                try {
                    profilePicUrl = await NazunaSock.profilePictureUrl(participants[0], 'image');
                } catch (profilePicError) {
                    console.warn(`⚠️ Falha ao obter foto de perfil para ${participants[0]}, usando padrão: ${profilePicError.message}`);
                }
            }
            
            try {
                // Em Windows, import() com caminho absoluto com backslashes pode falhar.
                // Convertemos para file URL para garantir compatibilidade cross-platform.
                const exportsModulePath = pathToFileURL(join(__dirname, 'funcs', 'exports.js')).href;
                const { banner } = await import(exportsModulePath);
                const image = settings.image !== 'banner' ? {
                    url: settings.image
                } : {
                    url: await banner.Welcome(profilePicUrl, bannerName, groupMetadata.subject, groupMetadata.participants.length)
                };
                
                message.image = image;
                message.caption = text;
                delete message.text;
            } catch (bannerError) {
                console.warn(`⚠️ Falha ao gerar imagem do banner, usando apenas texto: ${bannerError.message}`);
            }
        }
        
        return message;
    } catch (error) {
        const errorMessage = `Falha ao criar mensagem de grupo para o grupo ${groupMetadata.id}: ${error.message}`;
        console.error(`❌ ${errorMessage}`);
        throw new Error(errorMessage, { cause: error });
    }
}

/**
 * Lida com atualizações de participantes do grupo (entrada, saída, promoção, rebaixamento)
 * @param {Object} NazunaSock - Instância do socket do WhatsApp
 * @param {Object} inf - Informações de atualização
 */
async function handleAtualizacoesParticipantesGrupo(NazunaSock, inf) {
    // Validação de entrada
    if (!NazunaSock || typeof NazunaSock !== 'object') {
        console.error('❌ Objeto NazunaSock inválido fornecido para handleAtualizacoesParticipantesGrupo');
        return;
    }
    
    if (!inf || typeof inf !== 'object') {
        console.error('❌ Informações de atualização inválidas fornecidas para handleAtualizacoesParticipantesGrupo');
        return;
    }
    
    if (!inf.id || typeof inf.id !== 'string') {
        console.error('❌ ID de grupo inválido fornecido nas informações de atualização');
        return;
    }
    
    if (!inf.participants || !Array.isArray(inf.participants)) {
        console.error('❌ Array de participantes inválido fornecido nas informações de atualização');
        return;
    }
    
    if (!inf.action || typeof inf.action !== 'string') {
        console.error('❌ Ação inválida fornecida nas informações de atualização');
        return;
    }
    
    try {
        const from = inf.id;
        
        // Pula se o bot for o que está sendo atualizado
        if (inf.participants.some(p => p.startsWith(NazunaSock.user.id.split(':')[0])))
            return;
        
        // Obtém metadados do grupo com otimização de cache
        let groupMetadata = cacheGrupos.get(from);
        
        // Se não estiver no cache, busca-o
        if (!groupMetadata) {
            try {
                groupMetadata = await NazunaSock.groupMetadata(from);
                // Armazena os metadados no cache para uso futuro
                cacheGrupos.set(from, groupMetadata);
                console.log(`📝 Metadados do grupo em cache: ${from}`);
            } catch (metadataError) {
                console.error(`❌ Falha ao obter metadados do grupo para ${from}: ${metadataError.message}`);
                return;
            }
        }
        const groupSettings = await carregarConfiguracoesGrupo(from);
        const globalBlacklist = await carregarListaGlobalBloqueados();
        
        switch (inf.action) {
            case ACAO_ADICIONAR: {
                const membersToWelcome = [];
                const membersToRemove = [];
                const removalReasons = [];
                
                for (const participant of inf.participants) {
                    if (!participant || typeof participant !== 'string') {
                        console.warn(`⚠️ JID de participante inválido: ${participant}`);
                        continue;
                    }
                    
                    // Verifica lista global de bloqueados
                    if (globalBlacklist[participant]) {
                        membersToRemove.push(participant);
                        removalReasons.push(`@${participant.split('@')[0]} (lista global de bloqueios: ${globalBlacklist[participant].reason})`);
                        continue;
                    }
                    
                    // Verifica lista de bloqueios do grupo
                    if (groupSettings.blacklist?.[participant]) {
                        membersToRemove.push(participant);
                        removalReasons.push(`@${participant.split('@')[0]} (lista de bloqueios do grupo: ${groupSettings.blacklist[participant].reason})`);
                        continue;
                    }
                    
                    // Verifica configuração anti-fake
                    // Antifake: permite apenas números iniciando com códigos dos países permitidos
                    if (groupSettings.antifake && ![CODIGO_PAIS_BRASIL, CODIGO_PAIS_PORTUGAL].some(code => participant.startsWith(code))) {
                        membersToRemove.push(participant);
                        removalReasons.push(`@${participant.split('@')[0]} (número não permitido)`);
                        continue;
                    }
                    
                    // Verifica configuração anti-Portugal
                    if (groupSettings.antipt && participant.startsWith(CODIGO_PAIS_PORTUGAL)) {
                        membersToRemove.push(participant);
                        removalReasons.push(`@${participant.split('@')[0]} (número de Portugal)`);
                        continue;
                    }
                    
                    // Adiciona à lista de boas-vindas se todas as verificações passarem
                    if (groupSettings.bemvindo) {
                        membersToWelcome.push(participant);
                    }
                }
                
                // Remove membros bloqueados
                if (membersToRemove.length > 0) {
                    console.log(`${PREFIXO_LOG_MODERACAO} Removendo ${membersToRemove.length} membros de ${groupMetadata.subject}.`);
                    try {
                        await NazunaSock.groupParticipantsUpdate(from, membersToRemove, 'remove');
                        await NazunaSock.sendMessage(from, {
                            text: `🚫 Removidos ${membersToRemove.length} membros por regras de moderação:\n- ${removalReasons.join('\n- ')}`,
                            mentions: membersToRemove,
                        });
                    } catch (moderationError) {
                        console.error(`❌ Falha ao moderar membros no grupo ${groupMetadata.subject}: ${moderationError.message}`);
                    }
                }
                
                // Dá boas-vindas aos novos membros
                if (membersToWelcome.length > 0) {
                    console.log(`${PREFIXO_LOG_BOAS_VINDAS} Enviando mensagem para ${membersToWelcome.length} novos membros em ${groupMetadata.subject}.`);
                    try {
                        const message = await criarMensagemGrupo(
                            NazunaSock,
                            groupMetadata,
                            membersToWelcome,
                            groupSettings.welcome || {
                                text: groupSettings.textbv
                            }
                        );
                        await NazunaSock.sendMessage(from, message);
                    } catch (welcomeError) {
                        console.error(`❌ Falha ao enviar mensagem de boas-vindas aos novos membros no grupo ${groupMetadata.subject}: ${welcomeError.message}`);
                    }
                }
                break;
            }
            
            case ACAO_REMOVER: {
                if (groupSettings.exit?.enabled) {
                    console.log(`${PREFIXO_LOG_SAIDA} Enviando mensagem de despedida para ${inf.participants.length} membros em ${groupMetadata.subject}.`);
                    try {
                        const message = await criarMensagemGrupo(NazunaSock, groupMetadata, inf.participants, groupSettings.exit, false);
                        await NazunaSock.sendMessage(from, message);
                    } catch (exitError) {
                        console.error(`❌ Falha ao enviar mensagem de despedida aos membros saindo do grupo ${groupMetadata.subject}: ${exitError.message}`);
                    }
                }
                break;
            }
            
            case 'promote':
            case 'demote': {
                if (groupSettings.x9) {
                    for (const participant of inf.participants) {
                        if (!participant || typeof participant !== 'string') {
                            console.warn(`⚠️ JID de participante inválido para ação de admin: ${participant}`);
                            continue;
                        }
                        
                        if (!inf.author || typeof inf.author !== 'string') {
                            console.warn(`⚠️ JID do autor inválido para ação de admin: ${inf.author}`);
                            continue;
                        }
                        
                        const action = inf.action === 'promote' ? 'promovido a admin' : 'rebaixado de admin';
                        console.log(`${PREFIXO_LOG_ADMIN} ${participant.split('@')[0]} foi ${action} em ${groupMetadata.subject}.`);
                        try {
                            await NazunaSock.sendMessage(from, {
                                text: `🚨 @${participant.split('@')[0]} foi ${action} por @${inf.author.split('@')[0]}.`,
                                mentions: [participant, inf.author],
                            });
                        } catch (adminError) {
                            console.error(`❌ Falha ao enviar notificação de admin para ação de ${action}: ${adminError.message}`);
                        }
                    }
                }
                break;
            }
        }
    } catch (error) {
        console.error(`❌ Erro em handleAtualizacoesParticipantesGrupo: ${error.message}\n${error.stack}`);
    }
}

// =============================================================================
// CRIAÇÃO E GERENCIAMENTO DO SOCKET
// =============================================================================

/**
 * Cria e configura o socket do bot do WhatsApp
 * @param {string} authDir - Caminho do diretório de autenticação
 * @returns {Promise<Object>} Instância configurada do socket do WhatsApp
 */
async function criarBotSocket(authDir) {
    // Validação de entrada
    if (!authDir || typeof authDir !== 'string') {
        throw new Error('Caminho do diretório de autenticação inválido fornecido');
    }
    
    try {
        // Garante que os diretórios necessários existam
        await fs.mkdir(DATABASE_DIR, { recursive: true });
        await fs.mkdir(authDir, { recursive: true });
        
        // Configura autenticação
        const { state, saveCreds } = await useMultiFileAuthState(authDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        
        // Cria socket do WhatsApp com configurações otimizadas
        const NazunaSock = makeWASocket({
            version,
            emitOwnEvents: true,
            fireInitQueries: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            connectTimeoutMs: CONNECTION_TIMEOUT,
            retryRequestDelayMs: CONNECTION_RETRY_DELAY,
            qrTimeout: QR_TIMEOUT,
            keepAliveIntervalMs: KEEP_ALIVE_INTERVAL,
            defaultQueryTimeoutMs: undefined,
            msgRetryCounterCache: cacheContadorRetentativa,
            cachedGroupMetadata: async (jid) => cacheGrupos.get(jid),
            auth: state,
            browser: ['Ubuntu', 'Edge', '110.0.1587.56'],
            logger,
        });
        
        // Lida com modo de autenticação por código
        if (modoCodigo && !NazunaSock.authState.creds.registered) {
            let phoneNumber = await perguntar('📱 Digite o número de telefone (com código do país, ex: +5511999999999): ');
            
            if (!validarNumeroTelefone(phoneNumber)) {
                console.log('⚠️ Número inválido! Use um número válido com código do país (ex: +5511999999999).');
                process.exit(1);
            }
            
            try {
                const code = await NazunaSock.requestPairingCode(sanitizarNumero(phoneNumber));
                console.log(`🔑 Código de pareamento: ${code}`);
                console.log('📲 Envie este código no WhatsApp para autenticar o bot.');
            } catch (pairingError) {
                const errorMessage = `Falha ao solicitar código de pareamento: ${pairingError.message}`;
                console.error(`❌ ${errorMessage}`);
                throw new Error(errorMessage, { cause: pairingError });
            }
        }
        
        // Configura handlers de eventos
        NazunaSock.ev.on('creds.update', saveCreds);
        
        NazunaSock.ev.on('groups.update', async ([ev]) => {
            try {
                if (!ev || !ev.id) {
                    console.warn('⚠️ Evento de atualização de grupo inválido recebido');
                    return;
                }
                
                const meta = await NazunaSock.groupMetadata(ev.id).catch(() => null);
                if (meta) {
                    cacheGrupos.set(ev.id, meta);
                    console.log(`📝 Metadados do grupo atualizados: ${ev.id}`);
                }
            } catch (e) {
                console.error(`❌ Erro ao atualizar metadados do grupo para ${ev?.id || 'desconhecido'}: ${e.message}`);
            }
        });
        
        NazunaSock.ev.on('group-participants.update', async (inf) => {
            try {
                await handleAtualizacoesParticipantesGrupo(NazunaSock, inf);
            } catch (error) {
                console.error(`❌ Erro no handler de evento group-participants.update: ${error.message}\n${error.stack}`);
            }
        });
        
        NazunaSock.ev.on('messages.upsert', async (m) => {
            // Valida estrutura da mensagem
            if (!m || !m.messages || !Array.isArray(m.messages) || m.type !== 'notify') {
                return;
            }
            
            try {
                if (typeof indexModule === 'function') {
                    // Processa mensagens em lotes para melhor performance
                    const validMessages = m.messages.filter(info =>
                        info.message && info.key && info.key.remoteJid && info.key.id &&
                        // Ignora status broadcast (WhatsApp Status)
                        info.key.remoteJid !== 'status@broadcast'
                    );
                    
                    // Cache de mensagens em lote
                    for (const info of validMessages) {
                        adicionarMensagemAoCache(info.key.id, info.message);
                    }
                    
                    // Processa mensagens em paralelo com concorrência limitada
                    const MAX_CONCURRENT = MAXIMO_PROCESSAMENTO_CONCORRENTE;
                    for (let i = 0; i < validMessages.length; i += MAX_CONCURRENT) {
                        const batch = validMessages.slice(i, i + MAX_CONCURRENT);
                        await Promise.allSettled(batch.map(async (info) => {
                            try {
                                await indexModule(NazunaSock, info, null, cacheGrupos, cacheMensagens);
                            } catch (moduleError) {
                                console.error(`❌ Erro no indexModule para mensagem ${info.key.id}: ${moduleError.message}`);
                                // Opcionalmente implementar lógica de retry aqui
                            }
                        }));
                    }
                } else {
                    console.error('⚠️ O módulo index.js não é uma função válida. Verifique o arquivo index.js.');
                }
            } catch (err) {
                console.error(`❌ Erro ao processar mensagens: ${err.message}`);
            }
        });
        
        NazunaSock.ev.on('connection.update', async (update) => {
            if (!update || typeof update !== 'object') {
                console.warn('⚠️ Atualização de conexão inválida recebida');
                return;
            }
            
            const { connection, lastDisconnect, qr } = update;
            
            if (qr && !NazunaSock.authState.creds.registered && !modoCodigo) {
                console.log('🔗 QR code gerado para autenticação:');
                qrcode.generate(qr, { small: true }, (qrcodeText) => {
                    console.log(qrcodeText);
                });
                console.log('📱 Escaneie o QR code acima com o WhatsApp para autenticar o bot.');
            }
            
            if (connection === 'open') {
                console.log(`✅ Bot ${nomebot} iniciado com sucesso! Prefixo: ${prefixo} | Dono: ${nomedono}`);
            }
            
            if (connection === 'close') {
                let reason;
                try {
                    reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
                } catch (boomError) {
                    console.warn(`⚠️ Falha ao analisar motivo de desconexão: ${boomError.message}`);
                    reason = 'Desconhecido';
                }
                
                const reasonMessage = {
                    [DisconnectReason.loggedOut]: 'Desconectado do WhatsApp',
                    401: 'Sessão expirada',
                    [DisconnectReason.connectionClosed]: 'Conexão fechada',
                    [DisconnectReason.connectionLost]: 'Conexão perdida',
                    [DisconnectReason.connectionReplaced]: 'Conexão substituída',
                    [DisconnectReason.timedOut]: 'Timeout da conexão',
                    [DisconnectReason.badSession]: 'Sessão inválida',
                    [DisconnectReason.restartRequired]: 'Reinicialização necessária',
                }[reason] || 'Razão desconhecida';
                
                console.log(`❌ Conexão fechada. Código: ${reason} | Motivo: ${reasonMessage}`);
                
                if (reason === DisconnectReason.badSession || reason === DisconnectReason.loggedOut) {
                    try {
                        await limparDiretorioAutenticacao();
                        console.log('🔄 Nova autenticação será necessária na próxima inicialização.');
                    } catch (clearAuthError) {
                        console.error(`❌ Falha ao limpar diretório de autenticação: ${clearAuthError.message}`);
                    }
                }
                
                console.log('🔄 Aguardando 5 segundos antes de reconectar...');
                
                // Usa um limite de erro adequado para a chamada recursiva
                setTimeout(async () => {
                    try {
                        await iniciarNazu();
                    } catch (startError) {
                        console.error(`❌ Falha ao reiniciar o bot: ${startError.message}`);
                    }
                }, CINCO_SEGUNDOS);
            }
        });
        
        return NazunaSock;
    } catch (err) {
        const errorMessage = `Falha ao criar socket do bot: ${err.message}`;
        console.error(`❌ ${errorMessage}`);
        throw new Error(errorMessage, { cause: err });
    }
}

// =============================================================================
// INICIALIZAÇÃO DO BOT
// =============================================================================

/**
 * Inicia o bot Nazuna com mecanismo de retry inteligente
 * @throws {Error} Se a inicialização do bot falhar após múltiplas tentativas
 */
async function iniciarNazu() {
    let tentativa = 0;
    const maximoTentativas = MAXIMO_TENTATIVAS_INICIO;
    
    // Implementa exponential backoff para tentativas
    const exponentialBackoff = (tentativa) => {
        const delay = Math.min(CINCO_SEGUNDOS * Math.pow(2, tentativa), DEZ_MINUTOS);
        return delay + Math.random() * 1000; // Adiciona aleatoriedade
    };
    
    while (tentativa < maximoTentativas) {
        try {
            console.log(`🚀 Iniciando Nazuna... (Tentativa ${tentativa + 1}/${maximoTentativas})`);
            await criarBotSocket(AUTH_DIR);
            return; // Sucesso - sai da função
        } catch (err) {
            tentativa++;
            console.error(`❌ Erro ao iniciar bot (Tentativa ${tentativa}): ${err.message}`);
            
            if (tentativa < maximoTentativas) {
                const delay = exponentialBackoff(tentativa - 1);
                console.log(`🔄 Aguardando ${delay / 1000} segundos antes de tentar novamente...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error(`❌ Falha na inicialização do bot após ${maximoTentativas} tentativas. Verifique as mensagens de erro acima.`);
                throw new Error(`Falha na inicialização do bot após ${maximoTentativas} tentativas`, { cause: err });
            }
        }
    }
}

// Inicia o bot
iniciarNazu().catch(error => {
    console.error(`❌ Erro crítico durante a inicialização: ${error.message}`);
    process.exit(1);
});