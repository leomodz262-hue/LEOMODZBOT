// Menu - ID
// Oleh: Hiudy
// menuanggota.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

async function menuMembros(prefix, botName = "BotSaya", userName = "Pengguna") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *DAPATKAN UANG*
┊
┊•.̇𖥨֗🍓⭟${prefix}referensi
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INFORMASI*
┊
┊•.̇𖥨֗🍓⭟${prefix}profil
┊•.̇𖥨֗🍓⭟${prefix}pemilik
┊•.̇𖥨֗🍓⭟${prefix}ping
┊•.̇𖥨֗🍓⭟${prefix}rvisu
┊•.̇𖥨֗🍓⭟${prefix}totalcmd
┊•.̇𖥨֗🍓⭟${prefix}topcmd
┊•.̇𖥨֗🍓⭟${prefix}infocmd
┊•.̇𖥨֗🍓⭟${prefix}statusgrup
┊•.̇𖥨֗🍓⭟${prefix}statusbot
┊•.̇𖥨֗🍓⭟${prefix}statusku
┊•.̇𖥨֗🍓⭟${prefix}aturan
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PENGATURAN*
┊
┊•.̇𖥨֗🍓⭟${prefix}sebut
┊•.̇𖥨֗🍓⭟${prefix}afk
┊•.̇𖥨֗🍓⭟${prefix}kembali
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PERINGKAT*
┊
┊•.̇𖥨֗🍓⭟${prefix}peringkataktif
┊•.̇𖥨֗🍓⭟${prefix}peringkattidakaktif
┊•.̇𖥨֗🍓⭟${prefix}peringkataktifglobal
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;
}

module.exports = menuMembros;
