// Menu - ID
// Oleh: Hiudy
// menupemilik.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

async function menuDono(prefix, botName = "BotSaya", userName = "Pengguna") {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PENGATURAN*
┊
┊•.̇𖥨֗🍓⭟${prefix}awalan
┊•.̇𖥨֗🍓⭟${prefix}nomorpemilik
┊•.̇𖥨֗🍓⭟${prefix}namapemilik
┊•.̇𖥨֗🍓⭟${prefix}namabot
┊•.̇𖥨֗🍓⭟${prefix}bahasa
┊•.̇𖥨֗🍓⭟${prefix}fotomenu
┊•.̇𖥨֗🍓⭟${prefix}videomenu
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MANAJEMEN*
┊
┊•.̇𖥨֗🍓⭟${prefix}tambahsubpemilik
┊•.̇𖥨֗🍓⭟${prefix}hapussubpemilik
┊•.̇𖥨֗🍓⭟${prefix}daftarsubpemilik
┊•.̇𖥨֗🍓⭟${prefix}tambahpremium
┊•.̇𖥨֗🍓⭟${prefix}hapuspremium
┊•.̇𖥨֗🍓⭟${prefix}daftarpremium
┊•.̇𖥨֗🍓⭟${prefix}bangrup
┊•.̇𖥨֗🍓⭟${prefix}unbangrup
┊•.̇𖥨֗🍓⭟${prefix}daftarbangrup
┊•.̇𖥨֗🍓⭟${prefix}blokircmdg
┊•.̇𖥨֗🍓⭟${prefix}bukablokircmdg
┊•.̇𖥨֗🍓⭟${prefix}blokirpenggunag
┊•.̇𖥨֗🍓⭟${prefix}bukablokirpenggunag
┊•.̇𖥨֗🍓⭟${prefix}daftarblokir
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *SEWA*
┊
┊•.̇𖥨֗🍓⭟${prefix}modesewa
┊•.̇𖥨֗🍓⭟${prefix}tambahsewa
┊•.̇𖥨֗🍓⭟${prefix}buatkode
┊•.̇𖥨֗🍓⭟${prefix}daftarsewa
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRASI*
┊
┊•.̇𖥨֗🍓⭟${prefix}gabung
┊•.̇𖥨֗🍓⭟${prefix}jadiadmin
┊•.̇𖥨֗🍓⭟${prefix}jadianggota
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸  *LAINNYA*
┊
┊•.̇𖥨֗🍓⭟${prefix}daftargrup
┊•.̇𖥨֗🍓⭟${prefix}antipv
┊•.̇𖥨֗🍓⭟${prefix}antipv2
┊•.̇𖥨֗🍓⭟${prefix}pesanantipv
┊•.̇𖥨֗🍓⭟${prefix}antipv3
┊•.̇𖥨֗🍓⭟${prefix}lihatpesan
┊•.̇𖥨֗🍓⭟${prefix}tm
┊•.̇𖥨֗🍓⭟${prefix}kasus
┊•.̇𖥨֗🍓⭟${prefix}dapatkankasus
┊•.̇𖥨֗🍓⭟${prefix}modeliteglobal
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuDono;
