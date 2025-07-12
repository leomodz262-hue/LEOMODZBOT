// Menus - FR
// Par: Hiudy
// menumembres.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'''est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'''autres.
// Tout montant nous aide beaucoup.

async function menuMembros(prefix, botName = "MonBot", userName = "Utilisateur") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *GAGNER DE L'''ARGENT*
┊
┊•.̇𖥨֗🍓⭟${prefix}parrainage
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INFORMATIONS*
┊
┊•.̇𖥨֗🍓⭟${prefix}profil
┊•.̇𖥨֗🍓⭟${prefix}proprietaire
┊•.̇𖥨֗🍓⭟${prefix}ping
┊•.̇𖥨֗🍓⭟${prefix}rvisu
┊•.̇𖥨֗🍓⭟${prefix}totalcmd
┊•.̇𖥨֗🍓⭟${prefix}topcmd
┊•.̇𖥨֗🍓⭟${prefix}infocmd
┊•.̇𖥨֗🍓⭟${prefix}statutgroupe
┊•.̇𖥨֗🍓⭟${prefix}statutbot
┊•.̇𖥨֗🍓⭟${prefix}monstatut
┊•.̇𖥨֗🍓⭟${prefix}regles
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PARAMÈTRES*
┊
┊•.̇𖥨֗🍓⭟${prefix}mention
┊•.̇𖥨֗🍓⭟${prefix}afk
┊•.̇𖥨֗🍓⭟${prefix}retour
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *CLASSEMENTS*
┊
┊•.̇𖥨֗🍓⭟${prefix}classementactif
┊•.̇𖥨֗🍓⭟${prefix}classementinactif
┊•.̇𖥨֗🍓⭟${prefix}classementactifglobal
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;
}

module.exports = menuMembros;
