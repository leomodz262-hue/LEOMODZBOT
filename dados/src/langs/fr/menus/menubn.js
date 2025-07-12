// Menus - FR
// Par: Hiudy
// menjeux.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'autres.
// Tout montant nous aide beaucoup.

async function menubn(prefix, botName = "MonBot", userName = "Utilisateur", isLiteMode = false) {
  let menuContent = `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *JEUX*
┊
┊•.̇𖥨֗🍓⭟${prefix}morpion
┊•.̇𖥨֗🍓⭟${prefix}jenaijamais
┊•.̇𖥨֗🍓⭟${prefix}actionouverite
┊•.̇𖥨֗🍓⭟${prefix}chance
┊•.̇𖥨֗🍓⭟${prefix}quand
┊•.̇𖥨֗🍓⭟${prefix}couple
┊•.̇𖥨֗🍓⭟${prefix}jeship
┊•.̇𖥨֗🍓⭟${prefix}ouinon
┊•.̇𖥨֗🍓⭟${prefix}pfc${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}suicide` : ''}
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INTERACTIONS*
┊
┊•.̇𖥨֗🍓⭟${prefix}coupdepied
┊•.̇𖥨֗🍓⭟${prefix}gifle
┊•.̇𖥨֗🍓⭟${prefix}coupdepoing
┊•.̇𖥨֗🍓⭟${prefix}exploser
┊•.̇𖥨֗🍓⭟${prefix}calin
┊•.̇𖥨֗🍓⭟${prefix}mordre
┊•.̇𖥨֗🍓⭟${prefix}lecher
┊•.̇𖥨֗🍓⭟${prefix}embrasser
┊•.̇𖥨֗🍓⭟${prefix}tuer
┊•.̇𖥨֗🍓⭟${prefix}tapotement
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`

  if (!isLiteMode) {
    menuContent += `
╭┈❪🍧ฺꕸ▸ *INTERACTIONS "CHAUDES"*
┊
┊•.̇𖥨֗🍓⭟${prefix}orgie
┊•.̇𖥨֗🍓⭟${prefix}sexe
┊•.̇𖥨֗🍓⭟${prefix}baiserfrancais
┊•.̇𖥨֗🍓⭟${prefix}fessee
┊•.̇𖥨֗🍓⭟${prefix}ejaculer
┊•.̇𖥨֗🍓⭟${prefix}sucer
┊•.̇𖥨֗🍓⭟${prefix}pipe
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`
  }

  menuContent += `
╭┈❪🍧ฺꕸ▸ *BLAGUES - H*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}gay` : ''}
┊•.̇𖥨֗🍓⭟${prefix}bete
┊•.̇𖥨֗🍓⭟${prefix}intelligent
┊•.̇𖥨֗🍓⭟${prefix}otaku
┊•.̇𖥨֗🍓⭟${prefix}fidele
┊•.̇𖥨֗🍓⭟${prefix}infidele${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}cocu` : ''}
┊•.̇𖥨֗🍓⭟${prefix}canard
┊•.̇𖥨֗🍓⭟${prefix}chaud
┊•.̇𖥨֗🍓⭟${prefix}laid
┊•.̇𖥨֗🍓⭟${prefix}riche
┊•.̇𖥨֗🍓⭟${prefix}pauvre${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}grossebite` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}voleur` : ''}
┊•.̇𖥨֗🍓⭟${prefix}coquin
┊•.̇𖥨֗🍓⭟${prefix}louche
┊•.̇𖥨֗🍓⭟${prefix}ivre${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}sexiste` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homophobe` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}raciste` : ''}
┊•.̇𖥨֗🍓⭟${prefix}ennuyeux
┊•.̇𖥨֗🍓⭟${prefix}chanceux
┊•.̇𖥨֗🍓⭟${prefix}malchanceux
┊•.̇𖥨֗🍓⭟${prefix}fort
┊•.̇𖥨֗🍓⭟${prefix}faible
┊•.̇𖥨֗🍓⭟${prefix}dragueur
┊•.̇𖥨֗🍓⭟${prefix}pigeon
┊•.̇𖥨֗🍓⭟${prefix}macho
┊•.̇𖥨֗🍓⭟${prefix}idiot
┊•.̇𖥨֗🍓⭟${prefix}nerd
┊•.̇𖥨֗🍓⭟${prefix}paresseux
┊•.̇𖥨֗🍓⭟${prefix}travailleur
┊•.̇𖥨֗🍓⭟${prefix}colerique
┊•.̇𖥨֗🍓⭟${prefix}beau
┊•.̇𖥨֗🍓⭟${prefix}malin
┊•.̇𖥨֗🍓⭟${prefix}gentil
┊•.̇𖥨֗🍓⭟${prefix}drole
┊•.̇𖥨֗🍓⭟${prefix}charmant
┊•.̇𖥨֗🍓⭟${prefix}mysterieux
┊•.̇𖥨֗🍓⭟${prefix}affectueux
┊•.̇𖥨֗🍓⭟${prefix}arrogant
┊•.̇𖥨֗🍓⭟${prefix}humble
┊•.̇𖥨֗🍓⭟${prefix}jaloux
┊•.̇𖥨֗🍓⭟${prefix}courageux
┊•.̇𖥨֗🍓⭟${prefix}lache
┊•.̇𖥨֗🍓⭟${prefix}intelligent${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}voleurdepetiteamie` : ''}
┊•.̇𖥨֗🍓⭟${prefix}pleurnichard
┊•.̇𖥨֗🍓⭟${prefix}joueur${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonariste` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petiste` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}communiste` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}luliste` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}traitre` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandit` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}chien` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}clochard` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}scelerat` : ''}
┊•.̇𖥨֗🍓⭟${prefix}mythe
┊•.̇𖥨֗🍓⭟${prefix}standard
┊•.̇𖥨֗🍓⭟${prefix}comedie${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psychopathe` : ''}
┊•.̇𖥨֗🍓⭟${prefix}tresfort
┊•.̇𖥨֗🍓⭟${prefix}maigre
┊•.̇𖥨֗🍓⭟${prefix}muscle
┊•.̇𖥨֗🍓⭟${prefix}chef
┊•.̇𖥨֗🍓⭟${prefix}president
┊•.̇𖥨֗🍓⭟${prefix}roi
┊•.̇𖥨֗🍓⭟${prefix}patron
┊•.̇𖥨֗🍓⭟${prefix}playboy
┊•.̇𖥨֗🍓⭟${prefix}blagueur
┊•.̇𖥨֗🍓⭟${prefix}joueur
┊•.̇𖥨֗🍓⭟${prefix}programmeur
┊•.̇𖥨֗🍓⭟${prefix}visionnaire
┊•.̇𖥨֗🍓⭟${prefix}milliardaire
┊•.̇𖥨֗🍓⭟${prefix}puissant
┊•.̇𖥨֗🍓⭟${prefix}gagnant
┊•.̇𖥨֗🍓⭟${prefix}monsieur
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *BLAGUES - F*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lesbienne` : ''}
┊•.̇𖥨֗🍓⭟${prefix}bete_f
┊•.̇𖥨֗🍓⭟${prefix}intelligente
┊•.̇𖥨֗🍓⭟${prefix}otaku_f
┊•.̇𖥨֗🍓⭟${prefix}fidele_f
┊•.̇𖥨֗🍓⭟${prefix}infidele_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}cocue` : ''}
┊•.̇𖥨֗🍓⭟${prefix}canard_f
┊•.̇𖥨֗🍓⭟${prefix}chaude
┊•.̇𖥨֗🍓⭟${prefix}laide
┊•.̇𖥨֗🍓⭟${prefix}riche_f
┊•.̇𖥨֗🍓⭟${prefix}pauvre_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}grossechatte` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazie` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}voleuse` : ''}
┊•.̇𖥨֗🍓⭟${prefix}coquine
┊•.̇𖥨֗🍓⭟${prefix}louche_f
┊•.̇𖥨֗🍓⭟${prefix}ivre_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}sexiste_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homophobe_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}raciste_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}ennuyeuse
┊•.̇𖥨֗🍓⭟${prefix}chanceuse
┊•.̇𖥨֗🍓⭟${prefix}malchanceuse
┊•.̇𖥨֗🍓⭟${prefix}forte_f
┊•.̇𖥨֗🍓⭟${prefix}faible_f
┊•.̇𖥨֗🍓⭟${prefix}dragueuse
┊•.̇𖥨֗🍓⭟${prefix}pigeon_f
┊•.̇𖥨֗🍓⭟${prefix}idiote
┊•.̇𖥨֗🍓⭟${prefix}nerd_f
┊•.̇𖥨֗🍓⭟${prefix}paresseuse
┊•.̇𖥨֗🍓⭟${prefix}travailleuse
┊•.̇𖥨֗🍓⭟${prefix}colerique_f
┊•.̇𖥨֗🍓⭟${prefix}belle
┊•.̇𖥨֗🍓⭟${prefix}maline
┊•.̇𖥨֗🍓⭟${prefix}gentille
┊•.̇𖥨֗🍓⭟${prefix}drole_f
┊•.̇𖥨֗🍓⭟${prefix}charmante
┊•.̇𖥨֗🍓⭟${prefix}mysterieuse
┊•.̇𖥨֗🍓⭟${prefix}affectueuse_f
┊•.̇𖥨֗🍓⭟${prefix}arrogante_f
┊•.̇𖥨֗🍓⭟${prefix}humble_f
┊•.̇𖥨֗🍓⭟${prefix}jalouse
┊•.̇𖥨֗🍓⭟${prefix}courageuse
┊•.̇𖥨֗🍓⭟${prefix}lache_f
┊•.̇𖥨֗🍓⭟${prefix}intelligente${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}voleusedepetitami` : ''}
┊•.̇𖥨֗🍓⭟${prefix}pleurnicharde
┊•.̇𖥨֗🍓⭟${prefix}joueuse${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonariste_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petiste_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}communiste_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}luliste_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}traitresse` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandite` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}chienne` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}clocharde` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}scelerate` : ''}
┊•.̇𖥨֗🍓⭟${prefix}mythe_f
┊•.̇𖥨֗🍓⭟${prefix}standard_f
┊•.̇𖥨֗🍓⭟${prefix}comedie_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psychopathe_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}tresforte_f
┊•.̇𖥨֗🍓⭟${prefix}maigre_f
┊•.̇𖥨֗🍓⭟${prefix}musclee
┊•.̇𖥨֗🍓⭟${prefix}cheffe
┊•.̇𖥨֗🍓⭟${prefix}presidente
┊•.̇𖥨֗🍓⭟${prefix}reine
┊•.̇𖥨֗🍓⭟${prefix}patronne
┊•.̇𖥨֗🍓⭟${prefix}playgirl
┊•.̇𖥨֗🍓⭟${prefix}blagueuse_f
┊•.̇𖥨֗🍓⭟${prefix}joueuse
┊•.̇𖥨֗🍓⭟${prefix}programmeuse
┊•.̇𖥨֗🍓⭟${prefix}visionnaire_f
┊•.̇𖥨֗🍓⭟${prefix}milliardaire_f
┊•.̇𖥨֗🍓⭟${prefix}puissante
┊•.̇𖥨֗🍓⭟${prefix}gagnante
┊•.̇𖥨֗🍓⭟${prefix}madame
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`

    menuContent += `
╭┈❪🍧ฺꕸ▸ *CLASSEMENTS - H*
┊
┊•.̇𖥨֗🍓⭟${prefix}rankgay
┊•.̇𖥨֗🍓⭟${prefix}rankbete
┊•.̇𖥨֗🍓⭟${prefix}rankintelligent
┊•.̇𖥨֗🍓⭟${prefix}rankotaku
┊•.̇𖥨֗🍓⭟${prefix}rankfidele
┊•.̇𖥨֗🍓⭟${prefix}rankinfidele
┊•.̇𖥨֗🍓⭟${prefix}rankcocu
┊•.̇𖥨֗🍓⭟${prefix}rankcanard
┊•.̇𖥨֗🍓⭟${prefix}rankchaud
┊•.̇𖥨֗🍓⭟${prefix}rankriche
┊•.̇𖥨֗🍓⭟${prefix}rankpauvre
┊•.̇𖥨֗🍓⭟${prefix}rankfort
┊•.̇𖥨֗🍓⭟${prefix}rankdragueur
┊•.̇𖥨֗🍓⭟${prefix}rankmacho
┊•.̇𖥨֗🍓⭟${prefix}ranknerd
┊•.̇𖥨֗🍓⭟${prefix}ranktravailleur
┊•.̇𖥨֗🍓⭟${prefix}rankcolerique
┊•.̇𖥨֗🍓⭟${prefix}rankbeau
┊•.̇𖥨֗🍓⭟${prefix}rankmalin
┊•.̇𖥨֗🍓⭟${prefix}rankdrole
┊•.̇𖥨֗🍓⭟${prefix}rankcharmant
┊•.̇𖥨֗🍓⭟${prefix}rankvisionnaire
┊•.̇𖥨֗🍓⭟${prefix}rankpuissant
┊•.̇𖥨֗🍓⭟${prefix}rankgagnant
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *CLASSEMENTS - F*
┊
┊•.̇𖥨֗🍓⭟${prefix}ranklesbienne
┊•.̇𖥨֗🍓⭟${prefix}rankbete_f
┊•.̇𖥨֗🍓⭟${prefix}rankintelligente
┊•.̇𖥨֗🍓⭟${prefix}rankotaku_f
┊•.̇𖥨֗🍓⭟${prefix}rankfidele_f
┊•.̇𖥨֗🍓⭟${prefix}rankinfidele_f
┊•.̇𖥨֗🍓⭟${prefix}rankcocue
┊•.̇𖥨֗🍓⭟${prefix}rankcanard_f
┊•.̇𖥨֗🍓⭟${prefix}rankchaude
┊•.̇𖥨֗🍓⭟${prefix}rankriche_f
┊•.̇𖥨֗🍓⭟${prefix}rankpauvre_f
┊•.̇𖥨֗🍓⭟${prefix}rankforte_f
┊•.̇𖥨֗🍓⭟${prefix}rankdragueuse
┊•.̇𖥨֗🍓⭟${prefix}ranknerd_f
┊•.̇𖥨֗🍓⭟${prefix}ranktravailleuse
┊•.̇𖥨֗🍓⭟${prefix}rankcolerique_f
┊•.̇𖥨֗🍓⭟${prefix}rankbelle
┊•.̇𖥨֗🍓⭟${prefix}rankmaline
┊•.̇𖥨֗🍓⭟${prefix}rankdrole_f
┊•.̇𖥨֗🍓⭟${prefix}rankcharmante
┊•.̇𖥨֗🍓⭟${prefix}rankvisionnaire_f
┊•.̇𖥨֗🍓⭟${prefix}rankpuissante
┊•.̇𖥨֗🍓⭟${prefix}rankgagnante
`

  menuContent += `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`

  return menuContent
}

module.exports = menubn;
