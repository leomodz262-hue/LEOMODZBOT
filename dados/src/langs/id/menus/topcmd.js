// Menu - ID
// Oleh: Hiudy
// topcmd.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

async function menuTopCmd(prefix, botName = "BotSaya", userName = "Pengguna", topCommands = []) {
  if (!topCommands || topCommands.length === 0) {
    return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PALING SERING DIGUNAKAN*
┊
┊ Belum ada perintah yang terdaftar.
┊ Gunakan ${prefix}menu untuk melihat daftar
┊ perintah yang tersedia!
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  const commandsList = topCommands.map((cmd, index) => {
      const position = index + 1;
      const emoji = position <= 3 ? ['🥇', '🥈', '🥉'][index] : '🏅';
      return `┊${emoji} ${position}º: *${prefix}${cmd.name}*\n┊   ↳ ${cmd.count} digunakan oleh ${cmd.uniqueUsers} pengguna`;
    }).join('\n┊\n');

  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *Top ${topCommands.length} Perintah*
${commandsList}
┊
┊╭─▸ *Informasi:*
┊
┊🔍 Gunakan ${prefix}cmdinfo [perintah]
┊   ↳ Untuk melihat statistik terperinci
┊   ↳ Cth: ${prefix}cmdinfo menu
┊
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuTopCmd;
