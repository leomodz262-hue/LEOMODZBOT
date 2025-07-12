// Menus - EN
// By: Hiudy
// index.js
// Look, it was a lot of work to create this translation system.
// And even more work to translate everything.
// If you use the base bot, at least give credit.
// If it'''s not too much trouble, consider making a donation.
// Link: https://cognima.com.br/donate.
// We accept all types of donations, pix, paypal, stripe,
// Credit and debit cards, crypto among many others.
// Any amount helps us a lot.

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
    console.warn(`[${new Date().toISOString()}] Invalid menus detected: ${invalidMenus.join(', ')}`);
    return false;
  }
  return true;
};


if (!validateMenus()) {
  console.error(`[${new Date().toISOString()}] Error: One or more menus failed to load correctly.`);
};


module.exports = menus;
