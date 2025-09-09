const cron = require('node-cron');

module.exports = (client) => {
    const channelId = 'CHANNEL-ID'; // secara logika akan terkirim di #chat

    // ┌─────────────── menit (0 - 59)
    // │ ┌───────────── jam (0 - 23)
    // │ │ ┌─────────── hari dalam sebulan (1 - 31)
    // │ │ │ ┌───────── bulan (1 - 12)
    // │ │ │ │ ┌─────── hari dalam seminggu (0 - 6, di mana 0 adalah Minggu)
    // │ │ │ │ │
    // │ │ │ │ │
    // * * * * *


    cron.schedule('* * * * *', async () => {
        try {
            const channel = await client.channels.fetch(channelId);
            if (channel) {

              // Tambahkan '\n' di sini untuk baris baru
                channel.send('ISI-DENGAN-PESAN-OTOMATIS');
                console.log('Pesan otomatis berhasil dikirim.');
            } else {
                console.error('Channel ga ditemuin njir 😹.');
            }
        } catch (error) {
            console.error('woi njer, ada kesalahan tuh 😁:', error);
        }
    }, {
        timezone: "Asia/Jakarta"
    });

};
