// Menus - FR
// Par: Hiudy
// topcmd.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'autres.
// Tout montant nous aide beaucoup.

async function menuTopCmd(prefix, botName = "MonBot", userName = "Utilisateur", topCommands = []) {
  if (!topCommands || topCommands.length === 0) {
    return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *LES PLUS UTILISÉS*
┊
┊ Aucune commande n'a encore été enregistrée.
┊ Utilisez ${prefix}menu pour voir la liste
┊ des commandes disponibles!
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  const commandsList = topCommands.map((cmd, index) => {
      const position = index + 1;
      const emoji = position <= 3 ? ['🥇', '🥈', '🥉'][index] : '🏅';
      return `┊${emoji} ${position}º: *${prefix}${cmd.name}*\n┊   ↳ ${cmd.count} utilisations par ${cmd.uniqueUsers} utilisateurs`;
    }).join('\n┊\n');

  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *Top ${topCommands.length} Commandes*
${commandsList}
┊
┊╭─▸ *Informations:*
┊
┊🔍 Utilisez ${prefix}cmdinfo [commande]
┊   ↳ Pour voir les statistiques détaillées
┊   ↳ Ex: ${prefix}cmdinfo menu
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuTopCmd;
