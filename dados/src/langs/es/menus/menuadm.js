// Menus - ES
// By: Hiudy
// menuadm.js
// Mira, costó mucho trabajo crear este sistema de traducción.
// Y aún más trabajo traducir todo.
// Si usas el bot base, al menos da crédito.
// Si no es mucha molestia, considera hacer una donación.
// Enlace: https://cognima.com.br/donate.
// Aceptamos todo tipo de donaciones, pix, paypal, stripe,
// Tarjetas de crédito y débito, criptomonedas entre muchas otras.
// Cualquier cantidad nos ayuda mucho.

async function menuadm(prefix, botName = "MiBot", userName = "Usuario", isLiteMode = false) {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊¡Hola, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRACIÓN*
┊
┊•.̇𖥨֗🍓⭟${prefix}ban
┊•.̇𖥨֗🍓⭟${prefix}promover
┊•.̇𖥨֗🍓⭟${prefix}degradar
┊•.̇𖥨֗🍓⭟${prefix}silenciar
┊•.̇𖥨֗🍓⭟${prefix}dessilenciar
┊•.̇𖥨֗🍓⭟${prefix}advertir
┊•.̇𖥨֗🍓⭟${prefix}desadvertir
┊•.̇𖥨֗🍓⭟${prefix}listaadvertencias
┊•.̇𖥨֗🍓⭟${prefix}bloquearusuario
┊•.̇𖥨֗🍓⭟${prefix}desbloquearusuario
┊•.̇𖥨֗🍓⭟${prefix}listabloqueados
┊•.̇𖥨֗🍓⭟${prefix}agregarlistanegra
┊•.̇𖥨֗🍓⭟${prefix}eliminarlistanegra
┊•.̇𖥨֗🍓⭟${prefix}listanegra
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *GESTIÓN*
┊
┊•.̇𖥨֗🍓⭟${prefix}eliminar
┊•.̇𖥨֗🍓⭟${prefix}limpiar
┊•.̇𖥨֗🍓⭟${prefix}banfantasma
┊•.̇𖥨֗🍓⭟${prefix}ocultaretiqueta
┊•.̇𖥨֗🍓⭟${prefix}etiquetar
┊•.̇𖥨֗🍓⭟${prefix}sorteo
┊•.̇𖥨֗🍓⭟${prefix}enlacegrupo
┊•.̇𖥨֗🍓⭟${prefix}grupo A/C
┊•.̇𖥨֗🍓⭟${prefix}establecernombre
┊•.̇𖥨֗🍓⭟${prefix}establecerdesc
┊•.̇𖥨֗🍓⭟${prefix}agregarregla
┊•.̇𖥨֗🍓⭟${prefix}eliminarregla
┊•.̇𖥨֗🍓⭟${prefix}limitarmensaje
┊•.̇𖥨֗🍓⭟${prefix}eliminarlimitarmensaje
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *COMANDOS BLOQUEADOS*
┊
┊•.̇𖥨֗🍓⭟${prefix}bloquearcmd
┊•.̇𖥨֗🍓⭟${prefix}desbloquearcmd
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MODERADORES*
┊
┊•.̇𖥨֗🍓⭟${prefix}agregarmod
┊•.̇𖥨֗🍓⭟${prefix}eliminarmod
┊•.̇𖥨֗🍓⭟${prefix}listamods
┊•.̇𖥨֗🍓⭟${prefix}concedercmdmod
┊•.̇𖥨֗🍓⭟${prefix}revocarcmdmod
┊•.̇𖥨֗🍓⭟${prefix}listacmdsmod
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ASOCIACIONES*
┊
┊•.̇𖥨֗🍓⭟${prefix}asociaciones
┊•.̇𖥨֗🍓⭟${prefix}agregarasociacion
┊•.̇𖥨֗🍓⭟${prefix}eliminarasociacion
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ACTIVACIONES*
┊
┊•.̇𖥨֗🍓⭟${prefix}autodescarga
┊•.̇𖥨֗🍓⭟${prefix}modojuegos
┊•.̇𖥨֗🍓⭟${prefix}modonsfw
┊•.̇𖥨֗🍓⭟${prefix}modoasociacion
┊•.̇𖥨֗🍓⭟${prefix}bienvenida
┊•.̇𖥨֗🍓⭟${prefix}despedida
┊•.̇𖥨֗🍓⭟${prefix}autosticker
┊•.̇𖥨֗🍓⭟${prefix}soloadmin
┊•.̇𖥨֗🍓⭟${prefix}soplón
┊•.̇𖥨֗🍓⭟${prefix}modolite
┊•.̇𖥨֗🍓⭟${prefix}limitecmd
┊•.̇𖥨֗🍓⭟${prefix}antienlace
┊•.̇𖥨֗🍓⭟${prefix}antienlaceduro
┊•.̇𖥨֗🍓⭟${prefix}antiporno
┊•.̇𖥨֗🍓⭟${prefix}antiinundacion
┊•.̇𖥨֗🍓⭟${prefix}antifake
┊•.̇𖥨֗🍓⭟${prefix}antipt
┊•.̇𖥨֗🍓⭟${prefix}antidoc
┊•.̇𖥨֗🍓⭟${prefix}antiubic
┊•.̇𖥨֗🍓⭟${prefix}antisticker
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *AJUSTES*
┊
┊•.̇𖥨֗🍓⭟${prefix}leyendadespedida
┊•.̇𖥨֗🍓⭟${prefix}leyendabienvenida
┊•.̇𖥨֗🍓⭟${prefix}fotobienvenida
┊•.̇𖥨֗🍓⭟${prefix}eliminarfotobienvenida
┊•.̇𖥨֗🍓⭟${prefix}fotodespedida
┊•.̇𖥨֗🍓⭟${prefix}eliminarfotodespedida
┊•.̇𖥨֗🍓⭟${prefix}establecerprefijo
┊•.̇𖥨֗🍓⭟${prefix}abrirgrupo
┊•.̇𖥨֗🍓⭟${prefix}cerrargrupo
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuadm;
