// Menus - ES
// By: Hiudy
// menujuegos.js
// Mira, costó mucho trabajo crear este sistema de traducción.
// Y aún más trabajo traducir todo.
// Si usas el bot base, al menos da crédito.
// Si no es mucha molestia, considera hacer una donación.
// Enlace: https://cognima.com.br/donate.
// Aceptamos todo tipo de donaciones, pix, paypal, stripe,
// Tarjetas de crédito y débito, criptomonedas entre muchas otras.
// Cualquier cantidad nos ayuda mucho.

async function menubn(prefix, botName = "MiBot", userName = "Usuario", isLiteMode = false) {
  let menuContent = `
╭┈⊰ 🌸 『 *${botName}* 』
┊¡Hola, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *JUEGOS*
┊
┊•.̇𖥨֗🍓⭟${prefix}tresenraya
┊•.̇𖥨֗🍓⭟${prefix}younunca
┊•.̇𖥨֗🍓⭟${prefix}verdadoreto
┊•.̇𖥨֗🍓⭟${prefix}oportunidad
┊•.̇𖥨֗🍓⭟${prefix}cuando
┊•.̇𖥨֗🍓⭟${prefix}pareja
┊•.̇𖥨֗🍓⭟${prefix}shippeo
┊•.̇𖥨֗🍓⭟${prefix}siono
┊•.̇𖥨֗🍓⭟${prefix}ppt${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}suicidio` : ''}
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INTERACCIONES*
┊
┊•.̇𖥨֗🍓⭟${prefix}patear
┊•.̇𖥨֗🍓⭟${prefix}abofetear
┊•.̇𖥨֗🍓⭟${prefix}golpear
┊•.̇𖥨֗🍓⭟${prefix}explotar
┊•.̇𖥨֗🍓⭟${prefix}abrazar
┊•.̇𖥨֗🍓⭟${prefix}morder
┊•.̇𖥨֗🍓⭟${prefix}lamer
┊•.̇𖥨֗🍓⭟${prefix}besar
┊•.̇𖥨֗🍓⭟${prefix}matar
┊•.̇𖥨֗🍓⭟${prefix}cariñito
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;

  if (!isLiteMode) {
    menuContent += `
╭┈❪🍧ฺꕸ▸ *INTERACCIONES "CALIENTES"*
┊
┊•.̇𖥨֗🍓⭟${prefix}orgia
┊•.̇𖥨֗🍓⭟${prefix}sexo
┊•.̇𖥨֗🍓⭟${prefix}besofrances
┊•.̇𖥨֗🍓⭟${prefix}nalgada
┊•.̇𖥨֗🍓⭟${prefix}eyacular
┊•.̇𖥨֗🍓⭟${prefix}mamar
┊•.̇𖥨֗🍓⭟${prefix}mamada
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  menuContent += `
╭┈❪🍧ฺꕸ▸ *BROMAS - M*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}gay` : ''}
┊•.̇𖥨֗🍓⭟${prefix}tonto
┊•.̇𖥨֗🍓⭟${prefix}inteligente
┊•.̇𖥨֗🍓⭟${prefix}otaku
┊•.̇𖥨֗🍓⭟${prefix}fiel
┊•.̇𖥨֗🍓⭟${prefix}infiel${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}cornudo` : ''}
┊•.̇𖥨֗🍓⭟${prefix}pagafantas
┊•.̇𖥨֗🍓⭟${prefix}bueno
┊•.̇𖥨֗🍓⭟${prefix}feo
┊•.̇𖥨֗🍓⭟${prefix}rico
┊•.̇𖥨֗🍓⭟${prefix}pobre${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}vergudo` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}ladron` : ''}
┊•.̇𖥨֗🍓⭟${prefix}travieso
┊•.̇𖥨֗🍓⭟${prefix}bizco
┊•.̇𖥨֗🍓⭟${prefix}borracho${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}machista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homofobico` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}racista` : ''}
┊•.̇𖥨֗🍓⭟${prefix}molesto
┊•.̇𖥨֗🍓⭟${prefix}suertudo
┊•.̇𖥨֗🍓⭟${prefix}desafortunado
┊•.̇𖥨֗🍓⭟${prefix}fuerte
┊•.̇𖥨֗🍓⭟${prefix}debil
┊•.̇𖥨֗🍓⭟${prefix}ligon
┊•.̇𖥨֗🍓⭟${prefix}tonto
┊•.̇𖥨֗🍓⭟${prefix}macho
┊•.̇𖥨֗🍓⭟${prefix}bobo
┊•.̇𖥨֗🍓⭟${prefix}nerd
┊•.̇𖥨֗🍓⭟${prefix}perezoso
┊•.̇𖥨֗🍓⭟${prefix}trabajador
┊•.̇𖥨֗🍓⭟${prefix}enojado
┊•.̇𖥨֗🍓⭟${prefix}hermoso
┊•.̇𖥨֗🍓⭟${prefix}astuto
┊•.̇𖥨֗🍓⭟${prefix}agradable
┊•.̇𖥨֗🍓⭟${prefix}divertido
┊•.̇𖥨֗🍓⭟${prefix}encantador
┊•.̇𖥨֗🍓⭟${prefix}misterioso
┊•.̇𖥨֗🍓⭟${prefix}cariñoso
┊•.̇𖥨֗🍓⭟${prefix}arrogante
┊•.̇𖥨֗🍓⭟${prefix}humilde
┊•.̇𖥨֗🍓⭟${prefix}celoso
┊•.̇𖥨֗🍓⭟${prefix}valiente
┊•.̇𖥨֗🍓⭟${prefix}cobarde
┊•.̇𖥨֗🍓⭟${prefix}listo${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}robanovias` : ''}
┊•.̇𖥨֗🍓⭟${prefix}lloron
┊•.̇𖥨֗🍓⭟${prefix}jugueton${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonarista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}comunista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lulista` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}traidor` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandido` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}perro` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}vago` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}sinverguenza` : ''}
┊•.̇𖥨֗🍓⭟${prefix}mito
┊•.̇𖥨֗🍓⭟${prefix}estandar
┊•.̇𖥨֗🍓⭟${prefix}comedia${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psicopata` : ''}
┊•.̇𖥨֗🍓⭟${prefix}muyfuerte
┊•.̇𖥨֗🍓⭟${prefix}flaco
┊•.̇𖥨֗🍓⭟${prefix}musculoso
┊•.̇𖥨֗🍓⭟${prefix}jefe
┊•.̇𖥨֗🍓⭟${prefix}presidente
┊•.̇𖥨֗🍓⭟${prefix}rey
┊•.̇𖥨֗🍓⭟${prefix}jefe
┊•.̇𖥨֗🍓⭟${prefix}playboy
┊•.̇𖥨֗🍓⭟${prefix}bromista
┊•.̇𖥨֗🍓⭟${prefix}jugador
┊•.̇𖥨֗🍓⭟${prefix}programador
┊•.̇𖥨֗🍓⭟${prefix}visionario
┊•.̇𖥨֗🍓⭟${prefix}multimillonario
┊•.̇𖥨֗🍓⭟${prefix}poderoso
┊•.̇𖥨֗🍓⭟${prefix}ganador
┊•.̇𖥨֗🍓⭟${prefix}señor
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *BROMAS - F*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lesbiana` : ''}
┊•.̇𖥨֗🍓⭟${prefix}tonta
┊•.̇𖥨֗🍓⭟${prefix}inteligente_f
┊•.̇𖥨֗🍓⭟${prefix}otaku_f
┊•.̇𖥨֗🍓⭟${prefix}fiel_f
┊•.̇𖥨֗🍓⭟${prefix}infiel_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}cornuda` : ''}
┊•.̇𖥨֗🍓⭟${prefix}pagafantas_f
┊•.̇𖥨֗🍓⭟${prefix}buena
┊•.̇𖥨֗🍓⭟${prefix}fea
┊•.̇𖥨֗🍓⭟${prefix}rica_f
┊•.̇𖥨֗🍓⭟${prefix}pobre_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}conchuda` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}ladrona` : ''}
┊•.̇𖥨֗🍓⭟${prefix}traviesa
┊•.̇𖥨֗🍓⭟${prefix}bizca
┊•.̇𖥨֗🍓⭟${prefix}borracha${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}machista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homofobica_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}racista_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}molesta
┊•.̇𖥨֗🍓⭟${prefix}suertuda
┊•.̇𖥨֗🍓⭟${prefix}desafortunada
┊•.̇𖥨֗🍓⭟${prefix}fuerte_f
┊•.̇𖥨֗🍓⭟${prefix}debil_f
┊•.̇𖥨֗🍓⭟${prefix}ligona
┊•.̇𖥨֗🍓⭟${prefix}tonta
┊•.̇𖥨֗🍓⭟${prefix}boba_f
┊•.̇𖥨֗🍓⭟${prefix}nerd_f
┊•.̇𖥨֗🍓⭟${prefix}perezosa
┊•.̇𖥨֗🍓⭟${prefix}trabajadora
┊•.̇𖥨֗🍓⭟${prefix}enojada
┊•.̇𖥨֗🍓⭟${prefix}hermosa
┊•.̇𖥨֗🍓⭟${prefix}astuta_f
┊•.̇𖥨֗🍓⭟${prefix}agradable_f
┊•.̇𖥨֗🍓⭟${prefix}divertida_f
┊•.̇𖥨֗🍓⭟${prefix}encantadora
┊•.̇𖥨֗🍓⭟${prefix}misteriosa_f
┊•.̇𖥨֗🍓⭟${prefix}cariñosa_f
┊•.̇𖥨֗🍓⭟${prefix}arrogante_f
┊•.̇𖥨֗🍓⭟${prefix}humilde_f
┊•.̇𖥨֗🍓⭟${prefix}celosa
┊•.̇𖥨֗🍓⭟${prefix}valiente_f
┊•.̇𖥨֗🍓⭟${prefix}cobarde_f
┊•.̇𖥨֗🍓⭟${prefix}lista${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}robanovios` : ''}
┊•.̇𖥨֗🍓⭟${prefix}llorona
┊•.̇𖥨֗🍓⭟${prefix}juguetona${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonarista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}comunista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lulista_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}traidora` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandida` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}perra` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}vaga_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}sinverguenza_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}mito_f
┊•.̇𖥨֗🍓⭟${prefix}estandar_f
┊•.̇𖥨֗🍓⭟${prefix}comedia_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psicopata_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}muyfuerte_f
┊•.̇𖥨֗🍓⭟${prefix}flaca
┊•.̇𖥨֗🍓⭟${prefix}musculosa
┊•.̇𖥨֗🍓⭟${prefix}jefa
┊•.̇𖥨֗🍓⭟${prefix}presidenta
┊•.̇𖥨֗🍓⭟${prefix}reina
┊•.̇𖥨֗🍓⭟${prefix}jefa
┊•.̇𖥨֗🍓⭟${prefix}playgirl
┊•.̇𖥨֗🍓⭟${prefix}bromista_f
┊•.̇𖥨֗🍓⭟${prefix}jugadora
┊•.̇𖥨֗🍓⭟${prefix}programadora
┊•.̇𖥨֗🍓⭟${prefix}visionaria
┊•.̇𖥨֗🍓⭟${prefix}multimillonaria
┊•.̇𖥨֗🍓⭟${prefix}poderosa
┊•.̇𖥨֗🍓⭟${prefix}ganadora
┊•.̇𖥨֗🍓⭟${prefix}señora
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;

    menuContent += `
╭┈❪🍧ฺꕸ▸ *RANGOS - M*
┊
┊•.̇𖥨֗🍓⭟${prefix}rankgay
┊•.̇𖥨֗🍓⭟${prefix}ranktonto
┊•.̇𖥨֗🍓⭟${prefix}rankinteligente
┊•.̇𖥨֗🍓⭟${prefix}rankotaku
┊•.̇𖥨֗🍓⭟${prefix}rankfiel
┊•.̇𖥨֗🍓⭟${prefix}rankinfiel
┊•.̇𖥨֗🍓⭟${prefix}rankcornudo
┊•.̇𖥨֗🍓⭟${prefix}rankpagafantas
┊•.̇𖥨֗🍓⭟${prefix}rankbueno
┊•.̇𖥨֗🍓⭟${prefix}rankrico
┊•.̇𖥨֗🍓⭟${prefix}rankpobre
┊•.̇𖥨֗🍓⭟${prefix}rankfuerte
┊•.̇𖥨֗🍓⭟${prefix}rankligon
┊•.̇𖥨֗🍓⭟${prefix}rankmacho
┊•.̇𖥨֗🍓⭟${prefix}ranknerd
┊•.̇𖥨֗🍓⭟${prefix}ranktrabajador
┊•.̇𖥨֗🍓⭟${prefix}rankenojado
┊•.̇𖥨֗🍓⭟${prefix}rankhermoso
┊•.̇𖥨֗🍓⭟${prefix}rankastuto
┊•.̇𖥨֗🍓⭟${prefix}rankdivertido
┊•.̇𖥨֗🍓⭟${prefix}rankencantador
┊•.̇𖥨֗🍓⭟${prefix}rankvisionario
┊•.̇𖥨֗🍓⭟${prefix}rankpoderoso
┊•.̇𖥨֗🍓⭟${prefix}rankganador
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *RANGOS - F*
┊
┊•.̇𖥨֗🍓⭟${prefix}ranklesbiana
┊•.̇𖥨֗🍓⭟${prefix}ranktonta
┊•.̇𖥨֗🍓⭟${prefix}rankinteligente_f
┊•.̇𖥨֗🍓⭟${prefix}rankotaku_f
┊•.̇𖥨֗🍓⭟${prefix}rankfiel_f
┊•.̇𖥨֗🍓⭟${prefix}rankinfiel_f
┊•.̇𖥨֗🍓⭟${prefix}rankcornuda
┊•.̇𖥨֗🍓⭟${prefix}rankpagafantas_f
┊•.̇𖥨֗🍓⭟${prefix}rankbuena
┊•.̇𖥨֗🍓⭟${prefix}rankrica_f
┊•.̇𖥨֗🍓⭟${prefix}rankpobre_f
┊•.̇𖥨֗🍓⭟${prefix}rankfuerte_f
┊•.̇𖥨֗🍓⭟${prefix}rankligona
┊•.̇𖥨֗🍓⭟${prefix}ranknerd_f
┊•.̇𖥨֗🍓⭟${prefix}ranktrabajadora
┊•.̇𖥨֗🍓⭟${prefix}rankenojada
┊•.̇𖥨֗🍓⭟${prefix}rankhermosa
┊•.̇𖥨֗🍓⭟${prefix}rankastuta_f
┊•.̇𖥨֗🍓⭟${prefix}rankdivertida_f
┊•.̇𖥨֗🍓⭟${prefix}rankencantadora
┊•.̇𖥨֗🍓⭟${prefix}rankvisionaria
┊•.̇𖥨֗🍓⭟${prefix}rankpoderosa
┊•.̇𖥨֗🍓⭟${prefix}rankganadora
`;

  menuContent += `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

  return menuContent;
}

module.exports = menubn;
