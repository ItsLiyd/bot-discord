const { EmbedBuilder } = require('discord.js');

// Export function yang akan dipanggil di index.js
module.exports = (client) => {
    // Listener untuk event ketika member baru bergabung ke server
    client.on('guildMemberAdd', async member => {
        
        const welcomeChannelId = '1357283129911672979'; // Ganti dengan ID channel selamat datang
        const rulesChannelId = '1357283130280644648';     // Ganti dengan ID channel peraturan
        const bannerImageUrl = 'https://i.supaimg.com/73f3dd6c-fd74-4590-88b4-439c26f4f125.jpg';   // Ganti dengan URL gambar banner kamu
        const devUsername = 'Pesatir_Handal';  // Ganti dengan username developer bot

        const channel = member.guild.channels.cache.get(welcomeChannelId);

        if (!channel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('NEW MEMBER')
            .setDescription(
            `Welcome <@${member.user.id}> to **${member.guild.name}**!` +
            `\nJangan lupa patuhi <#${rulesChannelId}> agar kamu tidak kena masalah 👍`
            )
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setImage(bannerImageUrl)
            .setFooter({ text: `made with love by [${devUsername}] • Today at ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}` })
            .setTimestamp();

        // Kirim pesan selamat datang
        channel.send({ 
            embeds: [welcomeEmbed] 
        }).catch(err => console.error('Gagal mengirim welcome:', err));
    });
};