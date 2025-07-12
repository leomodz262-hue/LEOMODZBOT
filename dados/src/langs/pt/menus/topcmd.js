// Menus - PT
// By: Hiudy
// topcmd.js
// Olha, deu muito trabalho criar esse sistema de tradução.
// E mais trabalho ainda para traduzir tudo.
// Caso for usar a bot de base pelo menos de os creditos.
// Caso não for te atrapalhar, considere fazer uma doação.
// Link: https://cognima.com.br/donate.
// Aceitamos todo tipo de doação, pix, paypal, stripe,
// Cartões de credito e debito, crypto entre varios outros.
// Qualquer valor ja nos ajuda muito.

async function menuTopCmd(prefix, botName = "MeuBot", userName = "Usuário", topCommands = []) {
  if (!topCommands || topCommands.length === 0) {
    return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Olá, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MAIS USADOS*
┊
┊ Nenhum comando foi registrado ainda.
┊ Use ${prefix}menu para ver a lista
┊ de comandos disponíveis!
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  const commandsList = topCommands.map((cmd, index) => {
      const position = index + 1;
      const emoji = position <= 3 ? ['🥇', '🥈', '🥉'][index] : '🏅';
      return `┊${emoji} ${position}º: *${prefix}${cmd.name}*\n┊   ↳ ${cmd.count} usos por ${cmd.uniqueUsers} usuários`;
    }).join('\n┊\n');

  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Olá, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *Top ${topCommands.length} Comandos*
${commandsList}
┊
┊╭─▸ *Informações:*
┊
┊🔍 Use ${prefix}cmdinfo [comando]
┊   ↳ Para ver estatísticas detalhadas
┊   ↳ Ex: ${prefix}cmdinfo menu
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuTopCmd; 