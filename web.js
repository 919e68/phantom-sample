var webPage = require('webpage')
var page = webPage.create()

var address = 'https://betgames9.betgames.tv/ext/game/odds/testpartner/8/0/decimal'

page.onConsoleMessage = function(msg) {
  console.log(msg)
}

page.open(address, function(status) {
  page.evaluate(function() {

    setInterval(function() {
      console.log(document.body.innerHTML)
    }, 100)

  })
})