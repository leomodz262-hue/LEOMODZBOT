// Menus - FR
// Par: Hiudy
// menuadm.js
// Regardez, il a fallu beaucoup de travail pour créer ce système de traduction.
// Et encore plus de travail pour tout traduire.
// Si vous utilisez le bot de base, créditez au moins.
// Si ce n'''est pas trop de problèmes, envisagez de faire un don.
// Lien: https://cognima.com.br/donate.
// Nous acceptons tous les types de dons, pix, paypal, stripe,
// Cartes de crédit et de débit, crypto parmi beaucoup d'''autres.
// Tout montant nous aide beaucoup.

async function menuadm(prefix, botName = "MonBot", userName = "Utilisateur", isLiteMode = false) {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Bonjour, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRATION*
┊
┊•.̇𖥨֗🍓⭟${prefix}bannir
┊•.̇𖥨֗🍓⭟${prefix}promouvoir
┊•.̇𖥨֗🍓⭟${prefix}retrograder
┊•.̇𖥨֗🍓⭟${prefix}muet
┊•.̇𖥨֗🍓⭟${prefix}demuet
┊•.̇𖥨֗🍓⭟${prefix}avertir
┊•.̇𖥨֗🍓⭟${prefix}desavertir
┊•.̇𖥨֗🍓⭟${prefix}listeavertissements
┊•.̇𖥨֗🍓⭟${prefix}bloquerutilisateur
┊•.̇𖥨֗🍓⭟${prefix}debloquerutilisateur
┊•.̇𖥨֗🍓⭟${prefix}listebloques
┊•.̇𖥨֗🍓⭟${prefix}ajouterlistenoire
┊•.̇𖥨֗🍓⭟${prefix}supprimerlistenoire
┊•.̇𖥨֗🍓⭟${prefix}listenoire
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *GESTION*
┊
┊•.̇𖥨֗🍓⭟${prefix}supprimer
┊•.̇𖥨֗🍓⭟${prefix}effacer
┊•.̇𖥨֗🍓⭟${prefix}bannirfantome
┊•.̇𖥨֗🍓⭟${prefix}cachertag
┊•.̇𖥨֗🍓⭟${prefix}tag
┊•.̇𖥨֗🍓⭟${prefix}tirageausort
┊•.̇𖥨֗🍓⭟${prefix}liengroupe
┊•.̇𖥨֗🍓⭟${prefix}groupe O/F
┊•.̇𖥨֗🍓⭟${prefix}definirnom
┊•.̇𖥨֗🍓⭟${prefix}definirdesc
┊•.̇𖥨֗🍓⭟${prefix}ajouterregle
┊•.̇𖥨֗🍓⭟${prefix}supprimerregle
┊•.̇𖥨֗🍓⭟${prefix}limitemessage
┊•.̇𖥨֗🍓⭟${prefix}supprimerlimitemessage
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *COMMANDES BLOQUÉES*
┊
┊•.̇𖥨֗🍓⭟${prefix}bloquercmd
┊•.̇𖥨֗🍓⭟${prefix}debloquercmd
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MODÉRATEURS*
┊
┊•.̇𖥨֗🍓⭟${prefix}ajoutermod
┊•.̇𖥨֗🍓⭟${prefix}supprimermod
┊•.̇𖥨֗🍓⭟${prefix}listemods
┊•.̇𖥨֗🍓⭟${prefix}accordercmdmod
┊•.̇𖥨֗🍓⭟${prefix}revoquercmdmod
┊•.̇𖥨֗🍓⭟${prefix}listecmdsmod
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PARTENARIATS*
┊
┊•.̇𖥨֗🍓⭟${prefix}partenariats
┊•.̇𖥨֗🍓⭟${prefix}ajouterpartenariat
┊•.̇𖥨֗🍓⭟${prefix}supprimerpartenariat
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ACTIVATIONS*
┊
┊•.̇𖥨֗🍓⭟${prefix}autotelechargement
┊•.̇𖥨֗🍓⭟${prefix}modejeux
┊•.̇𖥨֗🍓⭟${prefix}modensfw
┊•.̇𖥨֗🍓⭟${prefix}modepartenariat
┊•.̇𖥨֗🍓⭟${prefix}bienvenue
┊•.̇𖥨֗🍓⭟${prefix}aurevoir
┊•.̇𖥨֗🍓⭟${prefix}autosticker
┊•.̇𖥨֗🍓⭟${prefix}adminseulement
┊•.̇𖥨֗🍓⭟${prefix}mouchard
┊•.̇𖥨֗🍓⭟${prefix}modelite
┊•.̇𖥨֗🍓⭟${prefix}limitecmd
┊•.̇𖥨֗🍓⭟${prefix}antilien
┊•.̇𖥨֗🍓⭟${prefix}antilienhard
┊•.̇𖥨֗🍓⭟${prefix}antiporn
┊•.̇𖥨֗🍓⭟${prefix}antiinondation
┊•.̇𖥨֗🍓⭟${prefix}antifaux
┊•.̇𖥨֗🍓⭟${prefix}antipt
┊•.̇𖥨֗🍓⭟${prefix}antidoc
┊•.̇𖥨֗🍓⭟${prefix}antilocalisation
┊•.̇𖥨֗🍓⭟${prefix}antiautocollant
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PARAMÈTRES*
┊
┊•.̇𖥨֗🍓⭟${prefix}legendeaurevoir
┊•.̇𖥨֗🍓⭟${prefix}legendebienvenue
┊•.̇𖥨֗🍓⭟${prefix}photobienvenue
┊•.̇𖥨֗🍓⭟${prefix}supprimerphotobienvenue
┊•.̇𖥨֗🍓⭟${prefix}photoaurevoir
┊•.̇𖥨֗🍓⭟${prefix}supprimerphotoaurevoir
┊•.̇𖥨֗🍓⭟${prefix}definirprefixe
┊•.̇𖥨֗🍓⭟${prefix}ouvrirgroupe
┊•.̇𖥨֗🍓⭟${prefix}fermergroupe
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuadm;
