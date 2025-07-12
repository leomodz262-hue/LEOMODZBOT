// Menus - EN
// By: Hiudy
// menuai.js
// Look, it was a lot of work to create this translation system.
// And even more work to translate everything.
// If you use the base bot, at least give credit.
// If it'''s not too much trouble, consider making a donation.
// Link: https://cognima.com.br/donate.
// We accept all types of donations, pix, paypal, stripe,
// Credit and debit cards, crypto among many others.
// Any amount helps us a lot.

async function menuIa(prefix, botName = "MyBot", userName = "User") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Hello, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *TEXTS*
┊
┊•.̇𖥨֗🍓⭟${prefix}nazu
┊•.̇𖥨֗🍓⭟${prefix}gpt
┊•.̇𖥨֗🍓⭟${prefix}gpt4
┊•.̇𖥨֗🍓⭟${prefix}cog
┊•.̇𖥨֗🍓⭟${prefix}gemma
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *TOOLS*
┊
┊•.̇𖥨֗🍓⭟${prefix}code-gen
┊•.̇𖥨֗🍓⭟${prefix}summarize
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuIa;
