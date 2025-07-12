// Menus - ES
// By: Hiudy
// menupropietario.js
// Mira, costó mucho trabajo crear este sistema de traducción.
// Y aún más trabajo traducir todo.
// Si usas el bot base, al menos da crédito.
// Si no es mucha molestia, considera hacer una donación.
// Enlace: https://cognima.com.br/donate.
// Aceptamos todo tipo de donaciones, pix, paypal, stripe,
// Tarjetas de crédito y débito, criptomonedas entre muchas otras.
// Cualquier cantidad nos ayuda mucho.

async function menuDono(prefix, botName = "MiBot", userName = "Usuario") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊¡Hola, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *AJUSTES*
┊
┊•.̇𖥨֗🍓⭟${prefix}prefijo
┊•.̇𖥨֗🍓⭟${prefix}numeropropietario
┊•.̇𖥨֗🍓⭟${prefix}nombrepropietario
┊•.̇𖥨֗🍓⭟${prefix}nombrebot
┊•.̇𖥨֗🍓⭟${prefix}idioma
┊•.̇𖥨֗🍓⭟${prefix}fotomenu
┊•.̇𖥨֗🍓⭟${prefix}videomenu
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *GESTIÓN*
┊
┊•.̇𖥨֗🍓⭟${prefix}agregarsubpropietario
┊•.̇𖥨֗🍓⭟${prefix}eliminarsubpropietario
┊•.̇𖥨֗🍓⭟${prefix}listasubpropietarios
┊•.̇𖥨֗🍓⭟${prefix}agregarpremium
┊•.̇𖥨֗🍓⭟${prefix}eliminarpremium
┊•.̇𖥨֗🍓⭟${prefix}listapremium
┊•.̇𖥨֗🍓⭟${prefix}bangrupo
┊•.̇𖥨֗🍓⭟${prefix}desbangrupo
┊•.̇𖥨֗🍓⭟${prefix}listabangrupo
┊•.̇𖥨֗🍓⭟${prefix}bloquearcmdg
┊•.̇𖥨֗🍓⭟${prefix}desbloquearcmdg
┊•.̇𖥨֗🍓⭟${prefix}bloquearusuariog
┊•.̇𖥨֗🍓⭟${prefix}desbloquearusuariog
┊•.̇𖥨֗🍓⭟${prefix}listabloqueos
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ALQUILER*
┊
┊•.̇𖥨֗🍓⭟${prefix}modoalquiler
┊•.̇𖥨֗🍓⭟${prefix}agregaralquiler
┊•.̇𖥨֗🍓⭟${prefix}generarcodigo
┊•.̇𖥨֗🍓⭟${prefix}listaalquiler
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRACIÓN*
┊
┊•.̇𖥨֗🍓⭟${prefix}unirse
┊•.̇𖥨֗🍓⭟${prefix}seradmin
┊•.̇𖥨֗🍓⭟${prefix}sermiembro
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸  *OTROS*
┊
┊•.̇𖥨֗🍓⭟${prefix}listagrupos
┊•.̇𖥨֗🍓⭟${prefix}antipv
┊•.̇𖥨֗🍓⭟${prefix}antipv2
┊•.̇𖥨֗🍓⭟${prefix}mensaajeantipv
┊•.̇𖥨֗🍓⭟${prefix}antipv3
┊•.̇𖥨֗🍓⭟${prefix}vermsg
┊•.̇𖥨֗🍓⭟${prefix}tm
┊•.̇𖥨֗🍓⭟${prefix}casos
┊•.̇𖥨֗🍓⭟${prefix}obtenercaso
┊•.̇𖥨֗🍓⭟${prefix}modoliteglobal
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuDono;
