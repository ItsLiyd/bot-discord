const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('menampilkan daftar command yang tersedia.'),

    async execute(interaction) {
        const commands = interaction.client.commands;
        
        // 1. Cek apakah ada command yang termuat
        if (commands.size === 0) {
            return interaction.reply({
                content: 'kaga ada command tersedia bg, kek nya ada masalah deh.',
                ephemeral: true
            });
        }

        // 2. Buat string daftar command
        const commandList = commands
            .map(command => {
                const name = command.data.name;
                const description = command.data.description || 'Tidak ada deskripsi.';
                return `**/${name}** - ${description}`;
            })
            .join('\n');

        // 3. Buat Embed untuk tampilan yang rapi
        const helpEmbed = new EmbedBuilder()
            .setColor(FF0000) // Warna Merah
            .setTitle('📖 Daftar Command TawBot')
            .addFields(
                { 
                    name: 'Commands Tersedia', 
                    value: commandList 
                }
            )
            .setFooter({ text: `Total ${commands.size} command terdaftar.` })
            .setTimestamp();

        // Kirim embed
        await interaction.reply({ 
            embeds: [helpEmbed],
            ephemeral: false
        });
    },

};
