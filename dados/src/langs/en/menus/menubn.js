// Menus - EN
// By: Hiudy
// menugames.js
// Look, it was a lot of work to create this translation system.
// And even more work to translate everything.
// If you use the base bot, at least give credit.
// If it'''s not too much trouble, consider making a donation.
// Link: https://cognima.com.br/donate.
// We accept all types of donations, pix, paypal, stripe,
// Credit and debit cards, crypto among many others.
// Any amount helps us a lot.

async function menubn(prefix, botName = "MyBot", userName = "User", isLiteMode = false) {
  let menuContent = `
╭┈⊰ 🌸 『 *${botName}* 』
┊Hello, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *GAMES*
┊
┊•.̇𖥨֗🍓⭟${prefix}tictactoe
┊•.̇𖥨֗🍓⭟${prefix}neverhaveiever
┊•.̇𖥨֗🍓⭟${prefix}truthordare
┊•.̇𖥨֗🍓⭟${prefix}chance
┊•.̇𖥨֗🍓⭟${prefix}when
┊•.̇𖥨֗🍓⭟${prefix}couple
┊•.̇𖥨֗🍓⭟${prefix}iship
┊•.̇𖥨֗🍓⭟${prefix}yesno
┊•.̇𖥨֗🍓⭟${prefix}rps${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}suicide` : ''}
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *INTERACTIONS*
┊
┊•.̇𖥨֗🍓⭟${prefix}kick
┊•.̇𖥨֗🍓⭟${prefix}slap
┊•.̇𖥨֗🍓⭟${prefix}punch
┊•.̇𖥨֗🍓⭟${prefix}explode
┊•.̇𖥨֗🍓⭟${prefix}hug
┊•.̇𖥨֗🍓⭟${prefix}bite
┊•.̇𖥨֗🍓⭟${prefix}lick
┊•.̇𖥨֗🍓⭟${prefix}kiss
┊•.̇𖥨֗🍓⭟${prefix}kill
┊•.̇𖥨֗🍓⭟${prefix}headpat
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;

  if (!isLiteMode) {
    menuContent += `
╭┈❪🍧ฺꕸ▸ *"HOT" INTERACTIONS*
┊
┊•.̇𖥨֗🍓⭟${prefix}orgy
┊•.̇𖥨֗🍓⭟${prefix}sex
┊•.̇𖥨֗🍓⭟${prefix}fkiss
┊•.̇𖥨֗🍓⭟${prefix}spank
┊•.̇𖥨֗🍓⭟${prefix}cum
┊•.̇𖥨֗🍓⭟${prefix}suck
┊•.̇𖥨֗🍓⭟${prefix}blowjob
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
  }

  menuContent += `
╭┈❪🍧ฺꕸ▸ *JOKES - M*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}gay` : ''}
┊•.̇𖥨֗🍓⭟${prefix}dumb
┊•.̇𖥨֗🍓⭟${prefix}smart
┊•.̇𖥨֗🍓⭟${prefix}weeb
┊•.̇𖥨֗🍓⭟${prefix}faithful
┊•.̇𖥨֗🍓⭟${prefix}unfaithful${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}cuckold` : ''}
┊•.̇𖥨֗🍓⭟${prefix}simp
┊•.̇𖥨֗🍓⭟${prefix}hot
┊•.̇𖥨֗🍓⭟${prefix}ugly
┊•.̇𖥨֗🍓⭟${prefix}rich
┊•.̇𖥨֗🍓⭟${prefix}poor${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bigdick` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}thief` : ''}
┊•.̇𖥨֗🍓⭟${prefix}naughty
┊•.̇𖥨֗🍓⭟${prefix}crosseyed
┊•.̇𖥨֗🍓⭟${prefix}drunk${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}sexist` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homophobic` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}racist` : ''}
┊•.̇𖥨֗🍓⭟${prefix}annoying
┊•.̇𖥨֗🍓⭟${prefix}lucky
┊•.̇𖥨֗🍓⭟${prefix}unlucky
┊•.̇𖥨֗🍓⭟${prefix}strong
┊•.̇𖥨֗🍓⭟${prefix}weak
┊•.̇𖥨֗🍓⭟${prefix}player
┊•.̇𖥨֗🍓⭟${prefix}sucker
┊•.̇𖥨֗🍓⭟${prefix}macho
┊•.̇𖥨֗🍓⭟${prefix}silly
┊•.̇𖥨֗🍓⭟${prefix}nerd
┊•.̇𖥨֗🍓⭟${prefix}lazy
┊•.̇𖥨֗🍓⭟${prefix}hardworking
┊•.̇𖥨֗🍓⭟${prefix}angry
┊•.̇𖥨֗🍓⭟${prefix}beautiful
┊•.̇𖥨֗🍓⭟${prefix}slick
┊•.̇𖥨֗🍓⭟${prefix}nice
┊•.̇𖥨֗🍓⭟${prefix}funny
┊•.̇𖥨֗🍓⭟${prefix}charming
┊•.̇𖥨֗🍓⭟${prefix}mysterious
┊•.̇𖥨֗🍓⭟${prefix}affectionate
┊•.̇𖥨֗🍓⭟${prefix}arrogant
┊•.̇𖥨֗🍓⭟${prefix}humble
┊•.̇𖥨֗🍓⭟${prefix}jealous
┊•.̇𖥨֗🍓⭟${prefix}brave
┊•.̇𖥨֗🍓⭟${prefix}coward
┊•.̇𖥨֗🍓⭟${prefix}clever${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}stealer` : ''}
┊•.̇𖥨֗🍓⭟${prefix}crybaby
┊•.̇𖥨֗🍓⭟${prefix}playful${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonarist` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petist` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}communist` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lulist` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}traitor` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandit` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}dog` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bum` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}scoundrel` : ''}
┊•.̇𖥨֗🍓⭟${prefix}myth
┊•.̇𖥨֗🍓⭟${prefix}standard
┊•.̇𖥨֗🍓⭟${prefix}comedy${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psychopath` : ''}
┊•.̇𖥨֗🍓⭟${prefix}verystrong
┊•.̇𖥨֗🍓⭟${prefix}skinny
┊•.̇𖥨֗🍓⭟${prefix}muscular
┊•.̇𖥨֗🍓⭟${prefix}boss
┊•.̇𖥨֗🍓⭟${prefix}president
┊•.̇𖥨֗🍓⭟${prefix}king
┊•.̇𖥨֗🍓⭟${prefix}boss
┊•.̇𖥨֗🍓⭟${prefix}playboy
┊•.̇𖥨֗🍓⭟${prefix}joker
┊•.̇𖥨֗🍓⭟${prefix}gamer
┊•.̇𖥨֗🍓⭟${prefix}programmer
┊•.̇𖥨֗🍓⭟${prefix}visionary
┊•.̇𖥨֗🍓⭟${prefix}billionaire
┊•.̇𖥨֗🍓⭟${prefix}powerful
┊•.̇𖥨֗🍓⭟${prefix}winner
┊•.̇𖥨֗🍓⭟${prefix}sir
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *JOKES - F*
┊${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lesbian` : ''}
┊•.̇𖥨֗🍓⭟${prefix}dumb_f
┊•.̇𖥨֗🍓⭟${prefix}smart_f
┊•.̇𖥨֗🍓⭟${prefix}weeb_f
┊•.̇𖥨֗🍓⭟${prefix}faithful_f
┊•.̇𖥨֗🍓⭟${prefix}unfaithful_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}cuckold_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}simp_f
┊•.̇𖥨֗🍓⭟${prefix}hot_f
┊•.̇𖥨֗🍓⭟${prefix}ugly_f
┊•.̇𖥨֗🍓⭟${prefix}rich_f
┊•.̇𖥨֗🍓⭟${prefix}poor_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bigpussy` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}nazi_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}thief_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}naughty_f
┊•.̇𖥨֗🍓⭟${prefix}crosseyed_f
┊•.̇𖥨֗🍓⭟${prefix}drunk_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}sexist_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}homophobic_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}racist_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}annoying_f
┊•.̇𖥨֗🍓⭟${prefix}lucky_f
┊•.̇𖥨֗🍓⭟${prefix}unlucky_f
┊•.̇𖥨֗🍓⭟${prefix}strong_f
┊•.̇𖥨֗🍓⭟${prefix}weak_f
┊•.̇𖥨֗🍓⭟${prefix}player_f
┊•.̇𖥨֗🍓⭟${prefix}sucker_f
┊•.̇𖥨֗🍓⭟${prefix}silly_f
┊•.̇𖥨֗🍓⭟${prefix}nerd_f
┊•.̇𖥨֗🍓⭟${prefix}lazy_f
┊•.̇𖥨֗🍓⭟${prefix}hardworking_f
┊•.̇𖥨֗🍓⭟${prefix}angry_f
┊•.̇𖥨֗🍓⭟${prefix}beautiful_f
┊•.̇𖥨֗🍓⭟${prefix}slick_f
┊•.̇𖥨֗🍓⭟${prefix}nice_f
┊•.̇𖥨֗🍓⭟${prefix}funny_f
┊•.̇𖥨֗🍓⭟${prefix}charming_f
┊•.̇𖥨֗🍓⭟${prefix}mysterious_f
┊•.̇𖥨֗🍓⭟${prefix}affectionate_f
┊•.̇𖥨֗🍓⭟${prefix}arrogant_f
┊•.̇𖥨֗🍓⭟${prefix}humble_f
┊•.̇𖥨֗🍓⭟${prefix}jealous_f
┊•.̇𖥨֗🍓⭟${prefix}brave_f
┊•.̇𖥨֗🍓⭟${prefix}coward_f
┊•.̇𖥨֗🍓⭟${prefix}clever_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}stealer_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}crybaby_f
┊•.̇𖥨֗🍓⭟${prefix}playful_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bolsonarist_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}petist_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}communist_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}lulist_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}traitor_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bandit_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bitch` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}bum_f` : ''}${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}scoundrel_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}myth_f
┊•.̇𖥨֗🍓⭟${prefix}standard_f
┊•.̇𖥨֗🍓⭟${prefix}comedy_f${!isLiteMode ? `
┊•.̇𖥨֗🍓⭟${prefix}psychopath_f` : ''}
┊•.̇𖥨֗🍓⭟${prefix}verystrong_f
┊•.̇𖥨֗🍓⭟${prefix}skinny_f
┊•.̇𖥨֗🍓⭟${prefix}muscular_f
┊•.̇𖥨֗🍓⭟${prefix}boss_f
┊•.̇𖥨֗🍓⭟${prefix}president_f
┊•.̇𖥨֗🍓⭟${prefix}queen
┊•.̇𖥨֗🍓⭟${prefix}boss_f
┊•.̇𖥨֗🍓⭟${prefix}playgirl
┊•.̇𖥨֗🍓⭟${prefix}joker_f
┊•.̇𖥨֗🍓⭟${prefix}gamer_f
┊•.̇𖥨֗🍓⭟${prefix}programmer_f
┊•.̇𖥨֗🍓⭟${prefix}visionary_f
┊•.̇𖥨֗🍓⭟${prefix}billionaire_f
┊•.̇𖥨֗🍓⭟${prefix}powerful_f
┊•.̇𖥨֗🍓⭟${prefix}winner_f
┊•.̇𖥨֗🍓⭟${prefix}madam
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *RANKS - M*
┊
┊•.̇𖥨֗🍓⭟${prefix}rankgay
┊•.̇𖥨֗🍓⭟${prefix}rankdumb
┊•.̇𖥨֗🍓⭟${prefix}ranksmart
┊•.̇𖥨֗🍓⭟${prefix}rankweeb
┊•.̇𖥨֗🍓⭟${prefix}rankfaithful
┊•.̇𖥨֗🍓⭟${prefix}rankunfaithful
┊•.̇𖥨֗🍓⭟${prefix}rankcuckold
┊•.̇𖥨֗🍓⭟${prefix}ranksimp
┊•.̇𖥨֗🍓⭟${prefix}rankhot
┊•.̇𖥨֗🍓⭟${prefix}rankrich
┊•.̇𖥨֗🍓⭟${prefix}rankpoor
┊•.̇𖥨֗🍓⭟${prefix}rankstrong
┊•.̇𖥨֗🍓⭟${prefix}rankplayer
┊•.̇𖥨֗🍓⭟${prefix}rankmacho
┊•.̇𖥨֗🍓⭟${prefix}ranknerd
┊•.̇𖥨֗🍓⭟${prefix}rankhardworking
┊•.̇𖥨֗🍓⭟${prefix}rankangry
┊•.̇𖥨֗🍓⭟${prefix}rankbeautiful
┊•.̇𖥨֗🍓⭟${prefix}rankslick
┊•.̇𖥨֗🍓⭟${prefix}rankfunny
┊•.̇𖥨֗🍓⭟${prefix}rankcharming
┊•.̇𖥨֗🍓⭟${prefix}rankvisionary
┊•.̇𖥨֗🍓⭟${prefix}rankpowerful
┊•.̇𖥨֗🍓⭟${prefix}rankwinner
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *RANKS - F*
┊
┊•.̇𖥨֗🍓⭟${prefix}ranklesbian
┊•.̇𖥨֗🍓⭟${prefix}rankdumb_f
┊•.̇𖥨֗🍓⭟${prefix}ranksmart_f
┊•.̇𖥨֗🍓⭟${prefix}rankweeb_f
┊•.̇𖥨֗🍓⭟${prefix}rankfaithful_f
┊•.̇𖥨֗🍓⭟${prefix}rankunfaithful_f
┊•.̇𖥨֗🍓⭟${prefix}rankcuckold_f
┊•.̇𖥨֗🍓⭟${prefix}ranksimp_f
┊•.̇𖥨֗🍓⭟${prefix}rankhot_f
┊•.̇𖥨֗🍓⭟${prefix}rankrich_f
┊•.̇𖥨֗🍓⭟${prefix}rankpoor_f
┊•.̇𖥨֗🍓⭟${prefix}rankstrong_f
┊•.̇𖥨֗🍓⭟${prefix}rankplayer_f
┊•.̇𖥨֗🍓⭟${prefix}ranknerd_f
┊•.̇𖥨֗🍓⭟${prefix}rankhardworking_f
┊•.̇𖥨֗🍓⭟${prefix}rankangry_f
┊•.̇𖥨֗🍓⭟${prefix}rankbeautiful_f
┊•.̇𖥨֗🍓⭟${prefix}rankslick_f
┊•.̇𖥨֗🍓⭟${prefix}rankfunny_f
┊•.̇𖥨֗🍓⭟${prefix}rankcharming_f
┊•.̇𖥨֗🍓⭟${prefix}rankvisionary_f
┊•.̇𖥨֗🍓⭟${prefix}rankpowerful_f
┊•.̇𖥨֗🍓⭟${prefix}rankwinner_f
`;

  menuContent += `╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`;

  return menuContent;
}

module.exports = menubn;
