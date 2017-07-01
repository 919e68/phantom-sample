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

  let sports = []

  // get sports container
  let containers = $('div.container')
  // iterate sports
  for (let c = 0; c < containers.length; c++) {
    // init sport data
    let sport = {
      name: null,
      competitions: []
    }

    // get sport title
    let sportTitle = $(containers[c]).find('div.sport-container > h2.sport-title div.sportName').html()
    if (sportTitle) {
      sport.name = sportTitle.split('</div>')[1]
    }

    // get competitions container
    let competitions = $(containers[c]).find('div.cp-container')
    // iterate competitions
    for (let cp = 0; cp < competitions.length; cp++) {
      // init competition data
      let competition = {
        title: null,
        events: []
      }

      // get competition title
      let competitionTitle = $(competitions[cp]).find('h3.competitionName td.cpn').html()
      if (competitionTitle) {
        competition.title = competitionTitle
      }

      // get events container
      let events = $(competitions[cp]).find('div.event-container > div.event')
      // iterate events
      for (let ev = 0; ev < events.length; ev++) {
        let
      }


      // validate competition
      if (competition.title) {
        sport.competitions.push(competition)
      }
    }

    // validate sport
    if (sport.name) {
      sports.push(sport)
    }
  }

  // log sport
  if (sports.length > 0) {
    console.log(JSON.stringify(sports, null, 2))
    console.log('------------------------------')
  }

})