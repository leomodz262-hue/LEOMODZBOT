// Menus - ES
// By: Hiudy
// index.js
// Mira, costó mucho trabajo crear este sistema de traducción.
// Y aún más trabajo traducir todo.
// Si usas el bot base, al menos da crédito.
// Si no es mucha molestia, considera hacer una donación.
// Enlace: https://cognima.com.br/donate.
// Aceptamos todo tipo de donaciones, pix, paypal, stripe,
// Tarjetas de crédito y débito, criptomonedas entre muchas otras.
// Cualquier cantidad nos ayuda mucho.

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
    console.warn(`[${new Date().toISOString()}] Menús inválidos detectados: ${invalidMenus.join(', ')}`);
    return false;
  }
  return true;
};


if (!validateMenus()) {
  console.error(`[${new Date().toISOString()}] Error: Uno o más menús no se cargaron correctamente.`);
};


module.exports = menus;
