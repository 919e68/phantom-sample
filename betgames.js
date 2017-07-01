let WebSocket = require('ws')
let process = require('child_process')
let cheerio = require('cheerio')

let wss = new WebSocket.Server({ port: 7000 })
let spawn = process.spawn
let child = spawn('phantomjs', ['web.js'])

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(panels, null, 2))
    }
  })
}

child.stdout.on('data', function (data) {
  let htmlString = data.toString()
  $ = cheerio.load(htmlString)

  let tex = $('#message-text').html()
  
  if (tex) {
    console.log(tex)
  }
})