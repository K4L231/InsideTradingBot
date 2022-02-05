
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch( {headless: true});
  const page = await browser.newPage();
  await page.goto('https://www.gurufocus.com/insider/summary', {
    waitUntil: 'networkidle0',
    timeout: 0
})

    let res = await page.evaluate( () => {
        let info = []
        for(let i = 1; i < 10; i++){
            info.push({
              ticker: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[0].innerText,
              insiderName: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[4].innerText,
              insiderPosition: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[5].innerText,
              positionType: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[7].innerText,
              quantity: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[8].innerText,
              priceChange: document.querySelector(`#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(${i})`).querySelectorAll('td')[9].innerText
            })
        }
        return info;
    });

  console.log(res)

  browser.close();
})();