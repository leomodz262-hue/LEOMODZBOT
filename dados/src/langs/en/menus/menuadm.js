// Menus - EN
// By: Hiudy
// menuadm.js
// Look, it was a lot of work to create this translation system.
// And even more work to translate everything.
// If you use the base bot, at least give credit.
// If it'''s not too much trouble, consider making a donation.
// Link: https://cognima.com.br/donate.
// We accept all types of donations, pix, paypal, stripe,
// Credit and debit cards, crypto among many others.
// Any amount helps us a lot.

async function menuadm(prefix, botName = "MyBot", userName = "User", isLiteMode = false) {
  return `
╭┈⊰ 🌸 『 *${botName}* 』
┊Hello, *${userName}*!
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ADMINISTRATION*
┊
┊•.̇𖥨֗🍓⭟${prefix}ban
┊•.̇𖥨֗🍓⭟${prefix}promote
┊•.̇𖥨֗🍓⭟${prefix}demote
┊•.̇𖥨֗🍓⭟${prefix}mute
┊•.̇𖥨֗🍓⭟${prefix}unmute
┊•.̇𖥨֗🍓⭟${prefix}warn
┊•.̇𖥨֗🍓⭟${prefix}unwarn
┊•.̇𖥨֗🍓⭟${prefix}warnlist
┊•.̇𖥨֗🍓⭟${prefix}blockuser
┊•.̇𖥨֗🍓⭟${prefix}unblockuser
┊•.̇𖥨֗🍓⭟${prefix}listblocked
┊•.̇𖥨֗🍓⭟${prefix}addblacklist
┊•.̇𖥨֗🍓⭟${prefix}delblacklist
┊•.̇𖥨֗🍓⭟${prefix}blacklist
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MANAGEMENT*
┊
┊•.̇𖥨֗🍓⭟${prefix}del
┊•.̇𖥨֗🍓⭟${prefix}clear
┊•.̇𖥨֗🍓⭟${prefix}banghost
┊•.̇𖥨֗🍓⭟${prefix}hidetag
┊•.̇𖥨֗🍓⭟${prefix}tag
┊•.̇𖥨֗🍓⭟${prefix}giveaway
┊•.̇𖥨֗🍓⭟${prefix}grouplink
┊•.̇𖥨֗🍓⭟${prefix}group O/C
┊•.̇𖥨֗🍓⭟${prefix}setname
┊•.̇𖥨֗🍓⭟${prefix}setdesc
┊•.̇𖥨֗🍓⭟${prefix}addrule
┊•.̇𖥨֗🍓⭟${prefix}delrule
┊•.̇𖥨֗🍓⭟${prefix}limitmessage
┊•.̇𖥨֗🍓⭟${prefix}dellimitmessage
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *BLOCKED COMMANDS*
┊
┊•.̇𖥨֗🍓⭟${prefix}blockcmd
┊•.̇𖥨֗🍓⭟${prefix}unblockcmd
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *MODERATORS*
┊
┊•.̇𖥨֗🍓⭟${prefix}addmod
┊•.̇𖥨֗🍓⭟${prefix}delmod
┊•.̇𖥨֗🍓⭟${prefix}modlist
┊•.̇𖥨֗🍓⭟${prefix}grantmodcmd
┊•.̇𖥨֗🍓⭟${prefix}revokemodcmd
┊•.̇𖥨֗🍓⭟${prefix}modcmdlist
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *PARTNERSHIPS*
┊
┊•.̇𖥨֗🍓⭟${prefix}partnerships
┊•.̇𖥨֗🍓⭟${prefix}addpartnership
┊•.̇𖥨֗🍓⭟${prefix}delpartnership
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *ACTIVATIONS*
┊
┊•.̇𖥨֗🍓⭟${prefix}autodl
┊•.̇𖥨֗🍓⭟${prefix}gamesmode
┊•.̇𖥨֗🍓⭟${prefix}nsfwmode
┊•.̇𖥨֗🍓⭟${prefix}partnershipmode
┊•.̇𖥨֗🍓⭟${prefix}welcome
┊•.̇𖥨֗🍓⭟${prefix}goodbye
┊•.̇𖥨֗🍓⭟${prefix}autosticker
┊•.̇𖥨֗🍓⭟${prefix}adminonly
┊•.̇𖥨֗🍓⭟${prefix}snitch
┊•.̇𖥨֗🍓⭟${prefix}litemode
┊•.̇𖥨֗🍓⭟${prefix}cmdlimit
┊•.̇𖥨֗🍓⭟${prefix}antilink
┊•.̇𖥨֗🍓⭟${prefix}antihardlink
┊•.̇𖥨֗🍓⭟${prefix}antiporn
┊•.̇𖥨֗🍓⭟${prefix}antiflood
┊•.̇𖥨֗🍓⭟${prefix}antifake
┊•.̇𖥨֗🍓⭟${prefix}antipt
┊•.̇𖥨֗🍓⭟${prefix}antidoc
┊•.̇𖥨֗🍓⭟${prefix}antiloc
┊•.̇𖥨֗🍓⭟${prefix}antisticker
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯

╭┈❪🍧ฺꕸ▸ *SETTINGS*
┊
┊•.̇𖥨֗🍓⭟${prefix}goodbyecaption
┊•.̇𖥨֗🍓⭟${prefix}welcomecaption
┊•.̇𖥨֗🍓⭟${prefix}welcomephoto
┊•.̇𖥨֗🍓⭟${prefix}rmwelcomephoto
┊•.̇𖥨֗🍓⭟${prefix}goodbyephoto
┊•.̇𖥨֗🍓⭟${prefix}rmgoodbyephoto
┊•.̇𖥨֗🍓⭟${prefix}setprefix
┊•.̇𖥨֗🍓⭟${prefix}opengroup
┊•.̇𖥨֗🍓⭟${prefix}closegroup
╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯
`;
}

module.exports = menuadm;
