// Menu - ID
// Oleh: Hiudy
// menugame.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

async function menubn(prefix, botName = "BotSaya", userName = "Pengguna", isLiteMode = false) {
  let menuContent = `
╭┈⊰ 🌸 『 *${botName}* 』
┊Halo, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PERMAINAN*
┊
┊•.̇𖥨֗🍓⭟${prefix}tictactoe
┊•.̇𖥨֗🍓⭟${prefix}sayatidakpernah
┊•.̇𖥨֗🍓⭟${prefix}jujuratauberani
┊•.̇𖥨֗🍓⭟${prefix}kesempatan
┊•.̇𖥨֗🍓⭟${prefix}kapan
┊•.̇𖥨֗🍓⭟${prefix}pasangan
┊•.̇𖥨֗🍓⭟${prefix}sayaship
┊•.̇𖥨֗🍓⭟${prefix}yatidak
┊•.̇𖥨֗🍓⭟${prefix}gbs${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bunuhdiri` : ''}
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INTERAKSI*
┊
┊•.̇𖥨֗🍓⭟${prefix}tendang
┊•.̇𖥨֗🍓⭟${prefix}tampar
┊•.̇𖥨֗🍓⭟${prefix}pukul
┊•.̇𖥨֗🍓⭟${prefix}ledakkan
┊•.̇𖥨֗🍓⭟${prefix}peluk
┊•.̇𖥨֗🍓⭟${prefix}gigit
┊•.̇𖥨֗🍓⭟${prefix}jilat
┊•.̇𖥨֗🍓⭟${prefix}cium
┊•.̇𖥨֗🍓⭟${prefix}bunuh
┊•.̇𖥨֗🍓⭟${prefix}elus
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;

  if (!isLiteMode) {
    menuContent += `
╭┈❪🍧ฺꕸ▸ *INTERAKSI "PANAS"*
┊
┊•.̇𖥨֗🍓⭟${prefix}pestaorgy
┊•.̇𖥨֗🍓⭟${prefix}seks
┊•.̇𖥨֗🍓⭟${prefix}ciumfrench
┊•.̇𖥨֗🍓⭟${prefix}pukulbokong
┊•.̇𖥨֗🍓⭟${prefix}crot
┊•.̇𖥨֗🍓⭟${prefix}isap
┊•.̇𖥨֗🍓⭟${prefix}oral
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  menuContent += `
╭┈❪🍧ฺꕸ▸ *LELUCON - P*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}gay` : ''}
┊•.̇𖥨֗🍓⭟${prefix}bodoh
┊•.̇𖥨֗🍓⭟${prefix}pintar
┊•.̇𖥨֗🍓⭟${prefix}wibu
┊•.̇𖥨֗🍓⭟${prefix}setia
┊•.̇𖥨֗🍓⭟${prefix}tidasetia${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}suamiorang` : ''}
┊•.̇𖥨֗🍓⭟${prefix}budak
┊•.̇𖥨֗🍓⭟${prefix}panas
┊•.̇𖥨֗🍓⭟${prefix}jelek
┊•.̇𖥨֗🍓⭟${prefix}kaya
┊•.̇𖥨֗🍓⭟${prefix}miskin${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}kontolbesar` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}pencuri` : ''}
┊•.̇𖥨֗🍓⭟${prefix}nakal
┊•.̇𖥨֗🍓⭟${prefix}juling
┊•.̇𖥨֗🍓⭟${prefix}mabuk${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}seksis` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homofobik` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}rasis` : ''}
┊•.̇𖥨֗🍓⭟${prefix}menyebalkan
┊•.̇𖥨֗🍓⭟${prefix}beruntung
┊•.̇𖥨֗🍓⭟${prefix}sial
┊•.̇𖥨֗🍓⭟${prefix}kuat
┊•.̇𖥨֗🍓⭟${prefix}lemah
┊•.̇𖥨֗🍓⭟${prefix}playboy
┊•.̇𖥨֗🍓⭟${prefix}pecundang
┊•.̇𖥨֗🍓⭟${prefix}macho
┊•.̇𖥨֗🍓⭟${prefix}konyol
┊•.̇𖥨֗🍓⭟${prefix}nerd
┊•.̇𖥨֗🍓⭟${prefix}malas
┊•.̇𖥨֗🍓⭟${prefix}rajin
┊•.̇𖥨֗🍓⭟${prefix}marah
┊•.̇𖥨֗🍓⭟${prefix}tampan
┊•.̇𖥨֗🍓⭟${prefix}licik
┊•.̇𖥨֗🍓⭟${prefix}baik
┊•.̇𖥨֗🍓⭟${prefix}lucu
┊•.̇𖥨֗🍓⭟${prefix}menawan
┊•.̇𖥨֗🍓⭟${prefix}misterius
┊•.̇𖥨֗🍓⭟${prefix}penyayang
┊•.̇𖥨֗🍓⭟${prefix}sombong
┊•.̇𖥨֗🍓⭟${prefix}rendahhati
┊•.̇𖥨֗🍓⭟${prefix}cemburu
┊•.̇𖥨֗🍓⭟${prefix}berani
┊•.̇𖥨֗🍓⭟${prefix}pengecut
┊•.̇𖥨֗🍓⭟${prefix}pintar${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}perebut` : ''}
┊•.̇𖥨֗🍓⭟${prefix}cengeng
┊•.̇𖥨֗🍓⭟${prefix}suka-bercanda${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonarista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}komunis` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lulista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}pengkhianat` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandit` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}anjing` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}gelandangan` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bajingan` : ''}
┊•.̇𖥨֗🍓⭟${prefix}mitos
┊•.̇𖥨֗🍓⭟${prefix}standar
┊•.̇𖥨֗🍓⭟${prefix}komedi${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psikopat` : ''}
┊•.̇𖥨֗🍓⭟${prefix}sangatkuat
┊•.̇𖥨֗🍓⭟${prefix}kurus
┊•.̇𖥨֗🍓⭟${prefix}berotot
┊•.̇𖥨֗🍓⭟${prefix}bos
┊•.̇𖥨֗🍓⭟${prefix}presiden
┊•.̇𖥨֗🍓⭟${prefix}raja
┊•.̇𖥨֗🍓⭟${prefix}bos
┊•.̇𖥨֗🍓⭟${prefix}playboy
┊•.̇𖥨֗🍓⭟${prefix}pelawak
┊•.̇𖥨֗🍓⭟${prefix}gamer
┊•.̇𖥨֗🍓⭟${prefix}programer
┊•.̇𖥨֗🍓⭟${prefix}visioner
┊•.̇𖥨֗🍓⭟${prefix}miliarder
┊•.̇𖥨֗🍓⭟${prefix}kuat
┊•.̇𖥨֗🍓⭟${prefix}pemenang
┊•.̇𖥨֗🍓⭟${prefix}tuan
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *LELUCON - W*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lesbian` : ''}
┊•.̇𖥨֗🍓⭟${prefix}bodoh_f
┊•.̇𖥨֗🍓⭟${prefix}pintar_f
┊•.̇𖥨֗🍓⭟${prefix}wibu_f
┊•.̇𖥨֗🍓⭟${prefix}setia_f
┊•.̇𖥨֗🍓⭟${prefix}tidasetia_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}istriorang` : ''}
┊•.̇𖥨֗🍓⭟${prefix}budak_f
┊•.̇𖥨֗🍓⭟${prefix}panas_f
┊•.̇𖥨֗🍓⭟${prefix}jelek_f
┊•.̇𖥨֗🍓⭟${prefix}kaya_f
┊•.̇𖥨֗🍓⭟${prefix}miskin_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}memekbesar` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}pencuri_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}nakal_f
┊•.̇𖥨֗🍓⭟${prefix}juling_f
┊•.̇𖥨֗🍓⭟${prefix}mabuk_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}seksis_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homofobik_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}rasis_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}menyebalkan_f
┊•.̇𖥨֗🍓⭟${prefix}beruntung_f
┊•.̇𖥨֗🍓⭟${prefix}sial_f
┊•.̇𖥨֗🍓⭟${prefix}kuat_f
┊•.̇𖥨֗🍓⭟${prefix}lemah_f
┊•.̇𖥨֗🍓⭟${prefix}playgirl
┊•.̇𖥨֗🍓⭟${prefix}pecundang_f
┊•.̇𖥨֗🍓⭟${prefix}konyol_f
┊•.̇𖥨֗🍓⭟${prefix}nerd_f
┊•.̇𖥨֗🍓⭟${prefix}malas_f
┊•.̇𖥨֗🍓⭟${prefix}rajin_f
┊•.̇𖥨֗🍓⭟${prefix}marah_f
┊•.̇𖥨֗🍓⭟${prefix}cantik
┊•.̇𖥨֗🍓⭟${prefix}licik_f
┊•.̇𖥨֗🍓⭟${prefix}baik_f
┊•.̇𖥨֗🍓⭟${prefix}lucu_f
┊•.̇𖥨֗🍓⭟${prefix}menawan_f
┊•.̇𖥨֗🍓⭟${prefix}misterius_f
┊•.̇𖥨֗🍓⭟${prefix}penyayang_f
┊•.̇𖥨֗🍓⭟${prefix}sombong_f
┊•.̇𖥨֗🍓⭟${prefix}rendahhati_f
┊•.̇𖥨֗🍓⭟${prefix}cemburu_f
┊•.̇𖥨֗🍓⭟${prefix}berani_f
┊•.̇𖥨֗🍓⭟${prefix}pengecut_f
┊•.̇𖥨֗🍓⭟${prefix}pintar_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}perebut_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}cengeng_f
┊•.̇𖥨֗🍓⭟${prefix}suka-bercanda_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonarista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}komunis_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lulista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}pengkhianat_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandit_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}anjing_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}gelandangan_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bajingan_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}mitos_f
┊•.̇𖥨֗🍓⭟${prefix}standar_f
┊•.̇𖥨֗🍓⭟${prefix}komedi_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psikopat_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}sangatkuat_f
┊•.̇𖥨֗🍓⭟${prefix}kurus_f
┊•.̇𖥨֗🍓⭟${prefix}berotot_f
┊•.̇𖥨֗🍓⭟${prefix}bos_f
┊•.̇𖥨֗🍓⭟${prefix}presiden_f
┊•.̇𖥨֗🍓⭟${prefix}ratu
┊•.̇𖥨֗🍓⭟${prefix}bos_f
┊•.̇𖥨֗🍓⭟${prefix}playgirl
┊•.̇𖥨֗🍓⭟${prefix}pelawak_f
┊•.̇𖥨֗🍓⭟${prefix}gamer_f
┊•.̇𖥨֗🍓⭟${prefix}programer_f
┊•.̇𖥨֗🍓⭟${prefix}visioner_f
┊•.̇𖥨֗🍓⭟${prefix}miliarder_f
┊•.̇𖥨֗🍓⭟${prefix}kuat_f
┊•.̇𖥨֗🍓⭟${prefix}pemenang_f
┊•.̇𖥨֗🍓⭟${prefix}nyonya
`;

    menuContent += `
╭┈❪🍧ฺꕸ▸ *PERINGKAT - P*
┊
┊•.̇𖥨֗🍓⭟${prefix}peringkatgay
┊•.̇𖥨֗🍓⭟${prefix}peringkatbodoh
┊•.̇𖥨֗🍓⭟${prefix}peringkatpintar
┊•.̇𖥨֗🍓⭟${prefix}peringkatwibu
┊•.̇𖥨֗🍓⭟${prefix}peringkatsetia
┊•.̇𖥨֗🍓⭟${prefix}peringkattidaksetia
┊•.̇𖥨֗🍓⭟${prefix}peringkatsuamiorang
┊•.̇𖥨֗🍓⭟${prefix}peringkatbudak
┊•.̇𖥨֗🍓⭟${prefix}peringkatpanas
┊•.̇𖥨֗🍓⭟${prefix}peringkatkaya
┊•.̇𖥨֗🍓⭟${prefix}peringkatmiskin
┊•.̇𖥨֗🍓⭟${prefix}peringkatkuat
┊•.̇𖥨֗🍓⭟${prefix}peringkatplayboy
┊•.̇𖥨֗🍓⭟${prefix}peringkatmacho
┊•.̇𖥨֗🍓⭟${prefix}peringkatnerd
┊•.̇𖥨֗🍓⭟${prefix}peringkatrajin
┊•.̇𖥨֗🍓⭟${prefix}peringkatmarah
┊•.̇𖥨֗🍓⭟${prefix}peringkattampan
┊•.̇𖥨֗🍓⭟${prefix}peringkatlicik
┊•.̇𖥨֗🍓⭟${prefix}peringkatlucu
┊•.̇𖥨֗🍓⭟${prefix}peringkatmenawan
┊•.̇𖥨֗🍓⭟${prefix}peringkatvisioner
┊•.̇𖥨֗🍓⭟${prefix}peringkatkuat
┊•.̇𖥨֗🍓⭟${prefix}peringkatpemenang
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PERINGKAT - W*
┊
┊•.̇𖥨֗🍓⭟${prefix}peringkatlesbian
┊•.̇𖥨֗🍓⭟${prefix}peringkatbodoh_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatpintar_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatwibu_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatsetia_f
┊•.̇𖥨֗🍓⭟${prefix}peringkattidaksetia_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatistriorang
┊•.̇𖥨֗🍓⭟${prefix}peringkatbudak_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatpanas_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatkaya_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatmiskin_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatkuat_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatplaygirl
┊•.̇𖥨֗🍓⭟${prefix}peringkatnerd_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatrajin_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatmarah_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatcantik
┊•.̇𖥨֗🍓⭟${prefix}peringkatlicik_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatlucu_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatmenawan_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatvisioner_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatkuat_f
┊•.̇𖥨֗🍓⭟${prefix}peringkatpemenang_f
`;

  menuContent += `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

  return menuContent;
}

module.exports = menubn;
