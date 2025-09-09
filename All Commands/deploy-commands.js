// deploy-commands.js

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
// Ambil semua file .js langsung dari folder "command"
const commandsPath = path.join(__dirname, 'command');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[WARNING] Perintah di ${filePath} tidak memiliki properti "data" atau "execute" yang dibutuhkan.`);
  }
}

// Buat instance REST
const rest = new REST().setToken('ISI-PAKE-TOKEN-BOT-LUWH'); // Ganti ini dengan token bot mu

// Jalankan fungsi untuk mendaftarkan perintah
(async () => {
  try {
    console.log(`Mulai memuat ${commands.length} perintah aplikasi (/)`);

    // Ganti ini dengan ID aplikasi bot Anda dan ID server mu
    const data = await rest.put(
      Routes.applicationGuildCommands('ISI-PAKE-ID-APLIKASI-BOT-LUWH', 'ISI-PAKE-ID-SERVER-LUWH'),
      { body: commands },
    );

    console.log(`Berhasil memuat ${data.length} perintah aplikasi (/)!`);
  } catch (error) {
    console.error(error);
  }
})();
