// Menus - EN
// By: Hiudy
// menu.js
// Look, it was a lot of work to create this translation system.
// And even more work to translate everything.
// If you use the base bot, at least give credit.
// If it'''s not too much trouble, consider making a donation.
// Link: https://cognima.com.br/donate.
// We accept all types of donations, pix, paypal, stripe,
// Credit and debit cards, crypto among many others.
// Any amount helps us a lot.

async function menu(prefix, botName = "MyBot", userName = "User") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Hello, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MAIN MENU*
┊
┊•.̇𖥨֗🍓⭟${prefix}menuai
┊•.̇𖥨֗🍓⭟${prefix}menudownload
┊•.̇𖥨֗🍓⭟${prefix}menuadmin
┊•.̇𖥨֗🍓⭟${prefix}menugames
┊•.̇𖥨֗🍓⭟${prefix}menuowner
┊•.̇𖥨֗🍓⭟${prefix}menumembers
┊•.̇𖥨֗🍓⭟${prefix}tools
┊•.̇𖥨֗🍓⭟${prefix}menusticker
┊•.̇𖥨֗🍓⭟${prefix}modifiers
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menu;
