// Menus - ES
// By: Hiudy
// menu.js
// Mira, costó mucho trabajo crear este sistema de traducción.
// Y aún más trabajo traducir todo.
// Si usas el bot base, al menos da crédito.
// Si no es mucha molestia, considera hacer una donación.
// Enlace: https://cognima.com.br/donate.
// Aceptamos todo tipo de donaciones, pix, paypal, stripe,
// Tarjetas de crédito y débito, criptomonedas entre muchas otras.
// Cualquier cantidad nos ayuda mucho.

async function menu(prefix, botName = "MiBot", userName = "Usuario") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊¡Hola, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MENÚ PRINCIPAL*
┊
┊•.̇𖥨֗🍓⭟${prefix}menuia
┊•.̇𖥨֗🍓⭟${prefix}menudescargas
┊•.̇𖥨֗🍓⭟${prefix}menuadmin
┊•.̇𖥨֗🍓⭟${prefix}menujuegos
┊•.̇𖥨֗🍓⭟${prefix}menupropietario
┊•.̇𖥨֗🍓⭟${prefix}menumiembros
┊•.̇𖥨֗🍓⭟${prefix}herramientas
┊•.̇𖥨֗🍓⭟${prefix}menusticker
┊•.̇𖥨֗🍓⭟${prefix}modificadores
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menu;
