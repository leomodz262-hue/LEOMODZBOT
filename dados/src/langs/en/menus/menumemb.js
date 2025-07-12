// Menus - EN
// By: Hiudy
// menumembers.js
// Look, it was a lot of work to create this translation system.
// And even more work to translate everything.
// If you use the base bot, at least give credit.
// If it'''s not too much trouble, consider making a donation.
// Link: https://cognima.com.br/donate.
// We accept all types of donations, pix, paypal, stripe,
// Credit and debit cards, crypto among many others.
// Any amount helps us a lot.

async function menuMembros(prefix, botName = "MyBot", userName = "User") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Hello, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *EARN MONEY*
┊
┊•.̇𖥨֗🍓⭟${prefix}referral
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INFORMATION*
┊
┊•.̇𖥨֗🍓⭟${prefix}profile
┊•.̇𖥨֗🍓⭟${prefix}owner
┊•.̇𖥨֗🍓⭟${prefix}ping
┊•.̇𖥨֗🍓⭟${prefix}rvisu
┊•.̇𖥨֗🍓⭟${prefix}totalcmd
┊•.̇𖥨֗🍓⭟${prefix}topcmd
┊•.̇𖥨֗🍓⭟${prefix}cmdinfo
┊•.̇𖥨֗🍓⭟${prefix}groupstatus
┊•.̇𖥨֗🍓⭟${prefix}botstatus
┊•.̇𖥨֗🍓⭟${prefix}mystatus
┊•.̇𖥨֗🍓⭟${prefix}rules
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *SETTINGS*
┊
┊•.̇𖥨֗🍓⭟${prefix}mention
┊•.̇𖥨֗🍓⭟${prefix}afk
┊•.̇𖥨֗🍓⭟${prefix}back
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *RANKS*
┊
┊•.̇𖥨֗🍓⭟${prefix}activerank
┊•.̇𖥨֗🍓⭟${prefix}inactiverank
┊•.̇𖥨֗🍓⭟${prefix}globalactiverank
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;
}

module.exports = menuMembros;
