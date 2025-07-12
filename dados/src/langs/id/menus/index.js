// Menu - ID
// Oleh: Hiudy
// index.js
// Lihat, butuh banyak kerja untuk membuat sistem terjemahan ini.
// Dan bahkan lebih banyak pekerjaan untuk menerjemahkan semuanya.
// Jika Anda menggunakan bot dasar, setidaknya berikan kredit.
// Jika tidak terlalu merepotkan, pertimbangkan untuk memberikan donasi.
// Tautan: https://cognima.com.br/donate.
// Kami menerima semua jenis donasi, pix, paypal, stripe,
// Kartu kredit dan debit, crypto di antara banyak lainnya.
// Jumlah berapa pun sangat membantu kami.

const menus = {
  menu: require('./menu'),
  menuAlterador: require('./alteradores'),
  menudown: require('./menudown'),
  menuadm: require('./menuadm'),
  menubn: require('./menubn'),
  menuDono: require('./menudono'),
  menuMembros: require('./menumemb'),
  menuFerramentas: require('./ferramentas'),
  menuSticker: require('./menufig'),
  menuIa: require('./menuia'),
  menuTopCmd: require('./topcmd')
};


function validateMenus() {
  const invalidMenus = Object.entries(menus).filter(([name, menu]) => !menu || typeof menu !== 'function').map(([name]) => name);
  if (invalidMenus.length) {
    console.warn(`[${new Date().toISOString()}] Menu tidak valid terdeteksi: ${invalidMenus.join(', ')}`);
    return false;
  }
  return true;
};


if (!validateMenus()) {
  console.error(`[${new Date().toISOString()}] Kesalahan: Satu atau lebih menu gagal dimuat dengan benar.`);
};


module.exports = menus;
