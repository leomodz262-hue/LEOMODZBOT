// Menu - ID
// Oleh: Hiudy
// menu.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

async function menu(prefix, botName = "BotSaya", userName = "Pengguna") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MENU UTAMA*
┊
┊•.̇𖥨֗🍓⭟${prefix}menuai
┊•.̇𖥨֗🍓⭟${prefix}menuunduh
┊•.̇𖥨֗🍓⭟${prefix}menuadmin
┊•.̇𖥨֗🍓⭟${prefix}menupermainan
┊•.̇𖥨֗🍓⭟${prefix}menupemilik
┊•.̇𖥨֗🍓⭟${prefix}menuanggota
┊•.̇𖥨֗🍓⭟${prefix}alat
┊•.̇𖥨֗🍓⭟${prefix}menustiker
┊•.̇𖥨֗🍓⭟${prefix}pengubah
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menu;
