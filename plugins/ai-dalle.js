
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} cat`

try {
let gpt = await (await fetch(`https://itzpire.site/ai/dalle?prompt=${text}`)).json()
conn.sendFile(m.chat, gpt.result,null,"*[ ADENNY - BODAS ]* " + '\n*• Prompt:* ' + text)
 } catch(e) {
 throw "`*Command Not Responded*`"
}
}
handler.help = ["dalle"]
handler.tags = ["ai"]
handler.command = ["dalle"]
module.exports = handler

