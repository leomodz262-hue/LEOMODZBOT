import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleCache = new Map();
const jsonCache = new Map();

async function loadModuleAsync(modulePath) {
    if (moduleCache.has(modulePath)) return moduleCache.get(modulePath);
    try {
        const fullPath = path.join(__dirname, modulePath);
        const module = await import(fullPath);
        const result = module.default || module;
        moduleCache.set(modulePath, result);
        return result;
    } catch (error) {
        console.warn(`Não foi possível carregar o módulo local: ${modulePath}. Erro: ${error.message}`);
        return undefined;
    }
}

async function loadJson(filePath) {
    if (jsonCache.has(filePath)) return jsonCache.get(filePath);
    try {
        const fullPath = path.join(__dirname, filePath);
        const data = await fs.readFile(fullPath, "utf-8");
        const result = JSON.parse(data);
        jsonCache.set(filePath, result);
        return result;
    } catch (error) {
        console.error(`Falha ao carregar o arquivo JSON: ${filePath}. Erro: ${error.message}`);
        return undefined;
    }
}

export function clearCache() {
    moduleCache.clear();
    jsonCache.clear();
}

const localModulePaths = {
    youtube: "downloads/youtube.js",
    tiktok: "downloads/tiktok.js",
    pinterest: "downloads/pinterest.js",
    igdl: "downloads/igdl.js",
    Lyrics: "downloads/lyrics.js",
    mcPlugin: "downloads/mcplugins.js",
    FilmesDL: "downloads/filmes.js",
    styleText: "utils/gerarnick.js",
    VerifyUpdate: "utils/update-verify.js",
    emojiMix: "utils/emojimix.js",
    upload: "utils/upload.js",
    tictactoe: "utils/tictactoe.js",
    stickerModule: "utils/sticker.js",
    commandStats: "utils/commandStats.js",
    ia: "private/ia.js",
    banner: "private/banner.js",
};

export default (async () => {
    try {
        const localModulePromises = Object.entries(localModulePaths).map(async ([key, filePath]) => {
            const module = await loadModuleAsync(filePath);
            return [key, module];
        });

        const jsonPromises = [
            loadJson("json/games.json").then((data) => ["gamesJson", data]),
            loadJson("json/gamestext.json").then((data) => ["gamestextJson", data]),
            loadJson("json/gamestext2.json").then((data) => ["gamestext2Json", data]),
            loadJson("json/markgame.json").then((data) => ["markgameJson", data]),
            loadJson("json/ranks.json").then((data) => ["ranksJson", data]),
            loadJson("json/tools.json").then((data) => ["toolsJson", data]),
            loadJson("json/vab.json").then((data) => ["vabJson", data]),
        ];

        const batch1 = await Promise.all(localModulePromises);
        const batch2 = await Promise.all(jsonPromises);
        const loadedResources = Object.fromEntries([...batch1, ...batch2]);

        return {
            ...loadedResources,
            sendSticker: loadedResources.stickerModule?.sendSticker,
            stickerModule: undefined,
            gamesJson: () => loadedResources.gamesJson,
            gamestextJson: () => loadedResources.gamestextJson,
            gamestext2Json: () => loadedResources.gamestext2Json,
            markgameJson: () => loadedResources.markgameJson,
            ranksJson: () => loadedResources.ranksJson,
            toolsJson: () => loadedResources.toolsJson,
            vabJson: () => loadedResources.vabJson,
            clearCache,
        };
    } catch (error) {
        console.error(`Erro durante a inicialização: ${error.message}`);
        process.exit(1);
    }
});