let fs = require('fs')
let handler = async (m, { conn, text }) => {
let total = Math.floor(Math.random() * 999999999999999999999999999999);
let json = { exp: total }
conn.mining = conn.mining ? conn.mining : {}
  conn.reply(m.chat, `Upah yang antum dapatkan adalah\n*${json.exp}* XP & LIMIT`, m)
  conn.mining[m.chat] = true 
   global.db.data.users[m.sender].exp += json.exp * 1
   global.db.data.users[m.sender].limit += json.exp * 1
}
handler.help = ['kerja']
handler.tags = ['rpg']
handler.command = /^kerja|nguli/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler