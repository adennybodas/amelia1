const axios = require('axios');

let handler = async (m, { conn, text }) => {
    if (!text) throw `Halo Kak, ada yang bisa amel bantu?`;

    
        let name = conn.getName(m.sender);
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        try {
            const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
                messages: [
                    { role: "system", content: `Kamu adalah AMELIA, dan developer kamu adalah ADENNY BODAS, lawan bicarmu bernama ${name}` },
                    { role: "user", content: text }
                ]
            });

            const hasil = response.data;
            
            m.reply(hasil.answer);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

handler.command = ['amelia', 'lia', 'amel'];
handler.tags = ["amel"]
handler.help = ['amel', 'lia', 'amelia'].map(a => a + " *[text]*");

module.exports = handler;