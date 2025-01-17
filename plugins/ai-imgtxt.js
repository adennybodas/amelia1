const fetch = require('node-fetch');
let lastUsed = 0;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Contoh:* ${usedPrefix + command} blue sea`;

  let currentTime = Date.now();
  if (currentTime - lastUsed < 10000) throw "Cooldown 10 detik coba lagi nanti";

  lastUsed = currentTime;

  try {
    let gpt = await (await fetch(`https://tti.photoleapapp.com/api/v1/generate?prompt=${text}`)).json();
    m.reply(wait)
    conn.sendMessage(m.chat, {image: { url: gpt.result_url}, caption: text}, {quoted: m});
  } catch(e) {
    throw "`*NO respons,DI COBA LAGI *`";
  }
}

handler.help = ['im'].map(a => a + " *[prompt]*");
handler.tags = ["ai"];
handler.command = ['im'];

module.exports = handler;