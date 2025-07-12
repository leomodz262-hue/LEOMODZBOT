// Menus - ES
// By: Hiudy
// topcmd.js
// Mira, costó mucho trabajo crear este sistema de traducción.
// Y aún más trabajo traducir todo.
// Si usas el bot base, al menos da crédito.
// Si no es mucha molestia, considera hacer una donación.
// Enlace: https://cognima.com.br/donate.
// Aceptamos todo tipo de donaciones, pix, paypal, stripe,
// Tarjetas de crédito y débito, criptomonedas entre muchas otras.
// Cualquier cantidad nos ayuda mucho.

async function menuTopCmd(prefix, botName = "MiBot", userName = "Usuario", topCommands = []) {
  if (!topCommands || topCommands.length === 0) {
    return `
╭┈⊰ 🌸 『 *${botName}* 』
┊¡Hola, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MÁS USADOS*
┊
┊ Aún no se ha registrado ningún comando.
┊ Usa ${prefix}menu para ver la lista
┊ de comandos disponibles!
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  const commandsList = topCommands.map((cmd, index) => {
      const position = index + 1;
      const emoji = position <= 3 ? ['🥇', '🥈', '🥉'][index] : '🏅';
      return `┊${emoji} ${position}º: *${prefix}${cmd.name}*\n┊   ↳ ${cmd.count} usos por ${cmd.uniqueUsers} usuarios`;
    }).join('\n┊\n');

  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊¡Hola, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *Top ${topCommands.length} Comandos*
${commandsList}
┊
┊╭─▸ *Información:*
┊
┊🔍 Usa ${prefix}cmdinfo [comando]
┊   ↳ Para ver estadísticas detalladas
┊   ↳ Ej: ${prefix}cmdinfo menu
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuTopCmd;
