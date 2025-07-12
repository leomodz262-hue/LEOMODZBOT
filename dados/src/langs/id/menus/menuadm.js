// Menu - ID
// Oleh: Hiudy
// menuadm.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

async function menuadm(prefix, botName = "BotSaya", userName = "Pengguna", isLiteMode = false) {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRASI*
┊
┊•.̇𖥨֗🍓⭟${prefix}ban
┊•.̇𖥨֗🍓⭟${prefix}promosikan
┊•.̇𖥨֗🍓⭟${prefix}turunkan
┊•.̇𖥨֗🍓⭟${prefix}bisukan
┊•.̇𖥨֗🍓⭟${prefix}nyalakan
┊•.̇𖥨֗🍓⭟${prefix}peringatkan
┊•.̇𖥨֗🍓⭟${prefix}hapusperingatan
┊•.̇𖥨֗🍓⭟${prefix}daftarperingatan
┊•.̇𖥨֗🍓⭟${prefix}blokirpengguna
┊•.̇𖥨֗🍓⭟${prefix}bukablokirpengguna
┊•.̇𖥨֗🍓⭟${prefix}daftardiblokir
┊•.̇𖥨֗🍓⭟${prefix}tambahdaftarahitam
┊•.̇𖥨֗🍓⭟${prefix}hapusdaftarahitam
┊•.̇𖥨֗🍓⭟${prefix}daftarahitam
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MANAJEMEN*
┊
┊•.̇𖥨֗🍓⭟${prefix}hapus
┊•.̇𖥨֗🍓⭟${prefix}bersihkan
┊•.̇𖥨֗🍓⭟${prefix}banhantu
┊•.̇𖥨֗🍓⭟${prefix}sembunyikantag
┊•.̇𖥨֗🍓⭟${prefix}tag
┊•.̇𖥨֗🍓⭟${prefix}hadiah
┊•.̇𖥨֗🍓⭟${prefix}linkgrup
┊•.̇𖥨֗🍓⭟${prefix}grup B/T
┊•.̇𖥨֗🍓⭟${prefix}aturtnama
┊•.̇𖥨֗🍓⭟${prefix}aturdesk
┊•.̇𖥨֗🍓⭟${prefix}tambahaturan
┊•.̇𖥨֗🍓⭟${prefix}hapusaturan
┊•.̇𖥨֗🍓⭟${prefix}batasippesan
┊•.̇𖥨֗🍓⭟${prefix}hapusbatasippesan
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PERINTAH BLOKIR*
┊
┊•.̇𖥨֗🍓⭟${prefix}blokirperintah
┊•.̇𖥨֗🍓⭟${prefix}bukablokirperintah
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MODERATOR*
┊
┊•.̇𖥨֗🍓⭟${prefix}tambahmod
┊•.̇𖥨֗🍓⭟${prefix}hapusmod
┊•.̇𖥨֗🍓⭟${prefix}daftarmod
┊•.̇𖥨֗🍓⭟${prefix}berikanperintahmod
┊•.̇𖥨֗🍓⭟${prefix}cabutperintahmod
┊•.̇𖥨֗🍓⭟${prefix}daftarperintahmod
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *KEMITRAAN*
┊
┊•.̇𖥨֗🍓⭟${prefix}kemitraan
┊•.̇𖥨֗🍓⭟${prefix}tambahkemitraan
┊•.̇𖥨֗🍓⭟${prefix}hapuskemitraan
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *AKTIVASI*
┊
┊•.̇𖥨֗🍓⭟${prefix}autounduh
┊•.̇𖥨֗🍓⭟${prefix}modegame
┊•.̇𖥨֗🍓⭟${prefix}modensfw
┊•.̇𖥨֗🍓⭟${prefix}modekemitraan
┊•.̇𖥨֗🍓⭟${prefix}selamatdatang
┊•.̇𖥨֗🍓⭟${prefix}selamattinggal
┊•.̇𖥨֗🍓⭟${prefix}autostiker
┊•.̇𖥨֗🍓⭟${prefix}hanyaadmin
┊•.̇𖥨֗🍓⭟${prefix}cepu
┊•.̇𖥨֗🍓⭟${prefix}modelite
┊•.̇𖥨֗🍓⭟${prefix}batascmd
┊•.̇𖥨֗🍓⭟${prefix}antilink
┊•.̇𖥨֗🍓⭟${prefix}antilinkkeras
┊•.̇𖥨֗🍓⭟${prefix}antiporn
┊•.̇𖥨֗🍓⭟${prefix}antibanjir
┊•.̇𖥨֗🍓⭟${prefix}antipalsu
┊•.̇𖥨֗🍓⭟${prefix}antipt
┊•.̇𖥨֗🍓⭟${prefix}antidok
┊•.̇𖥨֗🍓⭟${prefix}antilok
┊•.̇𖥨֗🍓⭟${prefix}antistiker
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PENGATURAN*
┊
┊•.̇𖥨֗🍓⭟${prefix}ucapanselamattinggal
┊•.̇𖥨֗🍓⭟${prefix}ucapanselamatdatang
┊•.̇𖥨֗🍓⭟${prefix}fotoselamatdatang
┊•.̇𖥨֗🍓⭟${prefix}hapusfotoselamatdatang
┊•.̇𖥨֗🍓⭟${prefix}fotoselamattinggal
┊•.̇𖥨֗🍓⭟${prefix}hapusfotoselamattinggal
┊•.̇𖥨֗🍓⭟${prefix}aturprefix
┊•.̇𖥨֗🍓⭟${prefix}bukagrup
┊•.̇𖥨֗🍓⭟${prefix}tutupgrup
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuadm;
