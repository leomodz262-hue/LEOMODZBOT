// Menus - FR
// Par: Hiudy
// menu.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'''est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'''autres.
// Tout montant nous aide beaucoup.

async function menu(prefix, botName = "MonBot", userName = "Utilisateur") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MENU PRINCIPAL*
┊
┊•.̇𖥨֗🍓⭟${prefix}menuia
┊•.̇𖥨֗🍓⭟${prefix}menutelechargement
┊•.̇𖥨֗🍓⭟${prefix}menuadmin
┊•.̇𖥨֗🍓⭟${prefix}menujeux
┊•.̇𖥨֗🍓⭟${prefix}menuproprietaire
┊•.̇𖥨֗🍓⭟${prefix}menumembres
┊•.̇𖥨֗🍓⭟${prefix}outils
┊•.̇𖥨֗🍓⭟${prefix}menuautocollant
┊•.̇𖥨֗🍓⭟${prefix}modificateurs
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menu;
