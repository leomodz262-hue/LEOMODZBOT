// Menus - FR
// Par: Hiudy
// index.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'''est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'''autres.
// Tout montant nous aide beaucoup.

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
    console.warn(`[${new Date().toISOString()}] Menus non valides détectés: ${invalidMenus.join(', ')}`);
    return false;
  }
  return true;
};


if (!validateMenus()) {
  console.error(`[${new Date().toISOString()}] Erreur : Un ou plusieurs menus n'''ont pas pu être chargés correctement.`);
};


module.exports = menus;
