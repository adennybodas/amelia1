
const axios = require('axios');

let handler = async (m, { conn, text }) => {
 conn.autoai = conn.autoai ? conn.autoai : {};

 if (!text) throw `example : auto on/off `;

 if (text == "on") {
 conn.autoai[m.sender] = {
 pesan: []
 }
 m.reply("[ ✓ ] Success create session chat")
 } else if (text == "off") {
 delete conn.autoai[m.sender]
 m.reply("[ ✓ ] Success delete session chat")
 }
}

handler.before = async (m, { conn }) => {
conn.autoai = conn.autoai ? conn.autoai : {};
 if (m.isBaileys && m.fromMe) return;
 if (!m.text) return
 if (!conn.autoai[m.sender]) return;

 if (
 m.text.startsWith(".") ||
 m.text.startsWith("#") ||
 m.text.startsWith("!") ||
 m.text.startsWith("/") ||
 m.text.startsWith("\\/")
 ) return

 if (conn.autoai[m.sender] && m.text) {
 let name = conn.getName(m.sender)
 await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
 const messages = [
 ...conn.AMEL[m.sender].pesan,
 { role: "system", content: `Kamu adalah Amelia, dan developer kamu adalah ADENNY BODAS, lawan bicarmu bernama ${name}` },
 { role: "user", content: m.text }
 ];
 try {
 const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
 messages
 });

 const responseData = response.data;
 const hasil = responseData;
 await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
 m.reply(hasil.answer)
 conn.AMEL[m.sender].pesan = messages
 } catch (error) {
 console.error("Error fetching data:", error);
 throw error;
 }
 }
}

handler.command = ['auto'];
handler.tags = ["auto"]
handler.help = ['auto'].map(a => a + " *[on/off]*");

module.exports = handler