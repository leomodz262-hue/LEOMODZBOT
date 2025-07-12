// Menus - FR
// Par: Hiudy
// menuproprietaire.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'''est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'''autres.
// Tout montant nous aide beaucoup.

async function menuDono(prefix, botName = "MonBot", userName = "Utilisateur") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PARAMÈTRES*
┊
┊•.̇𖥨֗🍓⭟${prefix}prefixe
┊•.̇𖥨֗🍓⭟${prefix}numeroproprietaire
┊•.̇𖥨֗🍓⭟${prefix}nomproprietaire
┊•.̇𖥨֗🍓⭟${prefix}nombot
┊•.̇𖥨֗🍓⭟${prefix}langue
┊•.̇𖥨֗🍓⭟${prefix}photomenu
┊•.̇𖥨֗🍓⭟${prefix}videomenu
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *GESTION*
┊
┊•.̇𖥨֗🍓⭟${prefix}ajoutersousproprietaire
┊•.̇𖥨֗🍓⭟${prefix}supprimersousproprietaire
┊•.̇𖥨֗🍓⭟${prefix}listesousproprietaires
┊•.̇𖥨֗🍓⭟${prefix}ajouterpremium
┊•.̇𖥨֗🍓⭟${prefix}supprimerpremium
┊•.̇𖥨֗🍓⭟${prefix}listepremium
┊•.̇𖥨֗🍓⭟${prefix}bannirgroupe
┊•.̇𖥨֗🍓⭟${prefix}debannirgroupe
┊•.̇𖥨֗🍓⭟${prefix}listebannirgroupe
┊•.̇𖥨֗🍓⭟${prefix}bloquercmdg
┊•.̇𖥨֗🍓⭟${prefix}debloquercmdg
┊•.̇𖥨֗🍓⭟${prefix}bloquerutilisateurg
┊•.̇𖥨֗🍓⭟${prefix}debloquerutilisateurg
┊•.̇𖥨֗🍓⭟${prefix}listeblocages
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *LOCATION*
┊
┊•.̇𖥨֗🍓⭟${prefix}modelocation
┊•.̇𖥨֗🍓⭟${prefix}ajouterlocation
┊•.̇𖥨֗🍓⭟${prefix}generercode
┊•.̇𖥨֗🍓⭟${prefix}listelocation
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRATION*
┊
┊•.̇𖥨֗🍓⭟${prefix}rejoindre
┊•.̇𖥨֗🍓⭟${prefix}etreadmin
┊•.̇𖥨֗🍓⭟${prefix}etremembre
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸  *AUTRES*
┊
┊•.̇𖥨֗🍓⭟${prefix}listegroupe
┊•.̇𖥨֗🍓⭟${prefix}antipv
┊•.̇𖥨֗🍓⭟${prefix}antipv2
┊•.̇𖥨֗🍓⭟${prefix}messageantipv
┊•.̇𖥨֗🍓⭟${prefix}antipv3
┊•.̇𖥨֗🍓⭟${prefix}voirmsg
┊•.̇𖥨֗🍓⭟${prefix}tm
┊•.̇𖥨֗🍓⭟${prefix}cas
┊•.̇𖥨֗🍓⭟${prefix}obtenirlecas
┊•.̇𖥨֗🍓⭟${prefix}modeliteglobal
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuDono;
