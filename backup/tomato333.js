let panels = []
  let divPanel = $('div.Panel.EventsMod')
  for (let p = 0; p < divPanel.length; p++) {

    let panelData = {
      title: $(divPanel[p]).find('.HdTitle').text(),
      markets: []
    }

    let elMarket = $(divPanel[p]).find('.MarketT')


    for (let m = 0; m < elMarket.length; m++) {
      let marketData = {
        title: $(elMarket[m]).find('.MarketHd > .SubHead > span').text(),
        tables: [],
      }

      let tableTitles = $(elMarket[m]).find('.MarketBd > div.MarketLea > .SubHeadT')
      let elTable = $(elMarket[m]).find('table tbody')
      for (let t = 0; t < elTable.length; t++) {

        //  getting row data
        let tableData = {
          title: $(tableTitles[t]).html(),
          rows: []
        }

        let tr = $(elTable[t]).find('tr')
        for (r = 0; r < tr.length; r++) {
          let td = $(tr[r]).find('td')
          let date = $(tr[r]).find('td.DateTime span')

          let rowData = {
            Date: $(date[0]).text() + ' ' + $(date[1]).text(),
            TeamA: {
              OddsL: $(td[2]).find('span.OddsL').text(),
              OddsM: $(td[2]).find('span.OddsM').text(),
              OddsR: $(td[2]).find('span.OddsR').text()
            },
            TeamB: {
              OddsL: $(td[3]).find('span.OddsL').text(),
              OddsM: $(td[3]).find('span.OddsM').text(),
              OddsR: $(td[3]).find('span.OddsR').text()
            }  
          }
          // end getting row data

          tableData.rows.push(rowData)
        }

        marketData.tables.push(tableData)
      }

      panelData.markets.push(marketData)
    }

    panels.push(panelData)
  }

  let msg = JSON.stringify(panels, null, 2)

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  })

  console.log(msg)