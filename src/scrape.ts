const puppeteer = require('puppeteer');
const fs = require('fs');
const jsonString = fs.readFileSync("./database.json");
const data = JSON.parse(jsonString);
const dataSet = new Set(data);

const twitter = require("./post")

scrape();

function scrape() {
  (async () => {
    const browser = await puppeteer.launch( {headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.gurufocus.com/insider/summary', {
      waitUntil: 'networkidle0',
      timeout: 0
    })

    for(let i = 10; i > 0; i--){
      let res = await page.evaluate( (i) => {
          let info = []
              info.push({
                ticker: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[0].innerText,
                insiderName: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[4].innerText,
                insiderPosition: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[5].innerText,
                positionType: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[7].innerText,
                quantity: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[8].innerText,
                priceChange: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[9].innerText,
                cost: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[11].innerText
              })
          return info
      },i);

      let result = res[0].cost;

      if(dataSet.has(result)){
        continue;
      } else {
        pushData(result, res)
        browser.close();
        return;
      }
  }


    function pushData(result, res) {
      if (data.length >= 10) {
        data.shift()
      }
      data.push(result)
      fs.writeFile ("./database.json", JSON.stringify(data), function(err){
        if (err) throw err;
        }
      )
        twitter.post(res)
  }

    })();

}


module.exports = { scrape };


  