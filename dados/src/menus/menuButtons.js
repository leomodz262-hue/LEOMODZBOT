module.exports = async function menuButtons(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗🍓⭟",
    separatorIcon = "❁",
    middleBorder = "┊"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    
    return {
        text: formattedHeader + '\n\n🔘 *Selecione uma categoria abaixo:*',
        title: `🌸 ${botName}`,
        subtitle: `Olá, ${userName}!`,
        footer: 'Escolha uma opção para ver os comandos',
        interactiveButtons: [
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: '📋 Navegação do Menu',
                    sections: [
                        {
                            title: '🤖 Inteligência Artificial',
                            highlight_label: 'IA',
                            rows: [
                                {
                                    header: '🤖 Menu IA',
                                    title: 'Chatbots & Geração',
                                    description: 'IA conversacional, texto e imagem',
                                    id: `${prefix}menuia`
                                }
                            ]
                        },
                        {
                            title: '📥 Downloads & Pesquisas',
                            highlight_label: 'Downloads',
                            rows: [
                                {
                                    header: '📥 Menu Downloads',
                                    title: 'Baixar & Pesquisar',
                                    description: 'Músicas, vídeos, redes sociais',
                                    id: `${prefix}menudown`
                                }
                            ]
                        },
                        {
                            title: '🎮 Diversão & Entretenimento',
                            highlight_label: 'Diversão',
                            rows: [
                                {
                                    header: '🎮 Menu Diversão',
                                    title: 'Jogos & Interações',
                                    description: 'Jogos, rankings, ships e diversão',
                                    id: `${prefix}menubn`
                                }
                            ]
                        },
                        {
                            title: '🎨 Criação & Design',
                            highlight_label: 'Criação',
                            rows: [
                                {
                                    header: '🎨 Menu Stickers',
                                    title: 'Figurinhas & Stickers',
                                    description: 'Criar e personalizar figurinhas',
                                    id: `${prefix}menufig`
                                },
                                {
                                    header: '✨ Alteradores',
                                    title: 'Efeitos & Modificações',
                                    description: 'Texto, imagens e transformações',
                                    id: `${prefix}alteradores`
                                }
                            ]
                        },
                        {
                            title: '🛠️ Ferramentas & Utilitários',
                            highlight_label: 'Ferramentas',
                            rows: [
                                {
                                    header: '🛠️ Menu Ferramentas',
                                    title: 'Utilitários & Ajudas',
                                    description: 'Tradução, QR codes, links e mais',
                                    id: `${prefix}ferramentas`
                                }
                            ]
                        },
                        {
                            title: '👥 Comandos Gerais',
                            highlight_label: 'Membros',
                            rows: [
                                {
                                    header: '👥 Menu Membros',
                                    title: 'Comandos Para Todos',
                                    description: 'Perfil, status, configurações',
                                    id: `${prefix}menumemb`
                                }
                            ]
                        },
                        {
                            title: '💰 Economia & RPG',
                            highlight_label: 'Economia',
                            rows: [
                                {
                                    header: '💰 Menu Gold',
                                    title: 'Sistema Econômico',
                                    description: 'Ganhar, gastar e investir gold',
                                    id: `${prefix}menugold`
                                }
                            ]
                        },
                        {
                            title: '👑 Administração & Dono',
                            highlight_label: 'Admin',
                            rows: [
                                {
                                    header: '👑 Menu Admin',
                                    title: 'Gestão de Grupo',
                                    description: 'Moderação e controle do grupo',
                                    id: `${prefix}menuadm`
                                },
                                {
                                    header: '🔧 Menu Dono',
                                    title: 'Controle Total',
                                    description: 'Configurações avançadas do bot',
                                    id: `${prefix}menudono`
                                }
                            ]
                        }
                    ]
                })
            }
        ]
    };
}