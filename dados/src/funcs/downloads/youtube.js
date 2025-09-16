/**
 * Sistema de Download e Pesquisa YouTube Otimizado com AdonixYtdl
 * Adaptado por Hiudy
 * Versão: 4.0.0 - Otimizada
 */

import axios from 'axios';
import yts from 'yt-search';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

const CONFIG = {
  FORMATS: {
    AUDIO: ['mp3', 'm4a', 'opus', 'webm'],
    VIDEO: ['144', '240', '360', '480', '720', '1080']
  },
  CACHE: {
    SEARCH: 60 * 60 * 1000,
    META: 30 * 60 * 1000
  },
  TIMEOUT: {
    DOWNLOAD: 180000,
    API: 20000
  }
};

const searchCache = new Map();
const metadataCache = new Map();

function cleanCache() {
  try {
    const now = Date.now();
    for (const [k, v] of searchCache.entries()) {
      if (now - v.timestamp > CONFIG.CACHE.SEARCH) searchCache.delete(k);
    }
    for (const [k, v] of metadataCache.entries()) {
      if (now - v.timestamp > CONFIG.CACHE.META) metadataCache.delete(k);
    }
  } catch (err) {
    logError("cleanCache", err);
  }
}
setInterval(cleanCache, 10 * 60 * 1000);

function getVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/(?:embed|shorts)\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function logError(context, err) {
  console.error(`[${context}]`, err?.message || err);
}

async function downloadFileAsStream(url) {
  const response = await axios.get(url, {
    responseType: 'stream',
    timeout: CONFIG.TIMEOUT.DOWNLOAD
  });
  return response.data;
}

async function getMetadata(id) {
  const cacheKey = `meta:${id}`;
  let meta = metadataCache.get(cacheKey)?.data;
  if (!meta) {
    meta = await yts(`https://youtube.com/watch?v=${id}`);
    metadataCache.set(cacheKey, { data: meta, timestamp: Date.now() });
  }
  return meta;
}

async function adonixytdl(url) {
  const headers = {
    "accept": "*/*", "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7", "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132"',
    "sec-ch-ua-mobile": "?1", "sec-ch-ua-platform": '"Android"', "sec-fetch-dest": "empty", "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site", "Referer": "https://id.ytmp3.mobi/", "Referrer-Policy": "strict-origin-when-cross-origin"
  };

  const initial = await axios.get(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers, timeout: CONFIG.TIMEOUT.API });
  const init = initial.data;

  const id = getVideoId(url);
  if (!id) throw new Error('Não foi possível obter o ID do vídeo');

  const mp4Url = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;
  const mp3Url = init.convertURL + `&v=${id}&f=mp3&_=${Math.random()}`;

  const [mp4Response, mp3Response] = await Promise.all([
    axios.get(mp4Url, { headers, timeout: CONFIG.TIMEOUT.API }),
    axios.get(mp3Url, { headers, timeout: CONFIG.TIMEOUT.API })
  ]);
  
  const mp4Data = mp4Response.data;
  const mp3Data = mp3Response.data;

  let info = {};
  for (let i = 0; i < 60; i++) {
    const j = await axios.get(mp3Data.progressURL, { headers, timeout: CONFIG.TIMEOUT.API });
    info = j.data;
    if (info.progress == 3) break;
    await new Promise(r => setTimeout(r, 1000));
  }
  if (info.progress != 3) throw new Error("Timeout no progresso de conversão");

  return { title: info.title, mp3: mp3Data.downloadURL, mp4: mp4Data.downloadURL };
}

async function search(query) {
  try {
    const cacheKey = `search:${query}`;
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CONFIG.CACHE.SEARCH) {
      return cached.data;
    }
    const searchRes = await yts(query);
    if (!searchRes.videos?.length) {
      return { ok: false, msg: 'Nenhum resultado encontrado.' };
    }
    const result = { ok: true, data: searchRes.videos[0] };
    searchCache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (err) {
    logError("search", err);
    return { ok: false, msg: 'Erro ao realizar a pesquisa.' };
  }
}

async function mp3(input, quality = "m4a") {
  try {
    const id = getVideoId(input);
    if (!id) return { ok: false, msg: 'URL inválida' };
    if (!CONFIG.FORMATS.AUDIO.includes(quality)) {
      return { ok: false, msg: 'Formato de áudio inválido' };
    }
    await getMetadata(id);
    const result = await adonixytdl(`https://youtube.com/watch?v=${id}`);
    if (!result.mp3) return { ok: false, msg: 'Falha ao obter link de áudio' };
    const downloadStream = await downloadFileAsStream(result.mp3);
    
    const ffmpegProcess = ffmpeg(downloadStream)
      .toFormat('mp3')
      .audioCodec('libmp3lame')
      .on('error', (err) => {
        logError('transcodificação MP3', err);
      });

    return {
      ok: true, stream: ffmpegProcess.pipe(), filename: "download.mp3",
      quality, availableQuality: CONFIG.FORMATS.AUDIO
    };
  } catch (err) {
    return { ok: false, msg: 'Erro no mp3: ' + err.message };
  }
}

async function mp4(input, quality = "360") {
  try {
    const id = getVideoId(input);
    if (!id) return { ok: false, msg: 'URL inválida' };
    if (!CONFIG.FORMATS.VIDEO.includes(quality)) {
      return { ok: false, msg: 'Qualidade de vídeo inválida' };
    }
    await getMetadata(id);
    const result = await adonixytdl(`https://youtube.com/watch?v=${id}`);
    if (!result.mp4) return { ok: false, msg: 'Falha ao obter link de vídeo' };

    const downloadStream = await downloadFileAsStream(result.mp4);

    return {
      ok: true,
      stream: downloadStream,
      filename: "download.mp4",
      quality,
      availableQuality: CONFIG.FORMATS.VIDEO
    };
  } catch (err) {
    return { ok: false, msg: 'Erro no mp4: ' + err.message };
  }
}

export default {
  search,
  mp3,
  mp4
};