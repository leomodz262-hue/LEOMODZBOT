// Menus - PT
// By: Hiudy
// menu.js
// Olha, deu muito trabalho criar esse sistema de tradução.
// E mais trabalho ainda para traduzir tudo.
// Caso for usar a bot de base pelo menos de os creditos.
// Caso não for te atrapalhar, considere fazer uma doação.
// Link: https://cognima.com.br/donate.
// Aceitamos todo tipo de doação, pix, paypal, stripe,
// Cartões de credito e debito, crypto entre varios outros.
// Qualquer valor ja nos ajuda muito.

async function menu(prefix, botName = "MeuBot", userName = "Usuário") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Olá, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MENU PRINCIPAL*
┊
┊•.̇𖥨֗🍓⭟${prefix}menuia
┊•.̇𖥨֗🍓⭟${prefix}menudown
┊•.̇𖥨֗🍓⭟${prefix}menuadm
┊•.̇𖥨֗🍓⭟${prefix}menubn
┊•.̇𖥨֗🍓⭟${prefix}menudono
┊•.̇𖥨֗🍓⭟${prefix}menumemb
┊•.̇𖥨֗🍓⭟${prefix}ferramentas
┊•.̇𖥨֗🍓⭟${prefix}menufig
┊•.̇𖥨֗🍓⭟${prefix}alteradores
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menu;
