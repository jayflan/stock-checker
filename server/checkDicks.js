// const sendTargetEmail = require("./mailer");
const puppeteer = require("puppeteer-extra");

//add stealth plugin & use puppeteer defaults
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

//Fn: timeout func for calls
const timeOut = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
};
  
const checkerDicks = async(descStr, skuNum, url) => {
  await timeOut(5000);
  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    //intercept target request url with stock quantity data
    page.on('response', async (response) => {
      if (response.url().includes('inventoryapis') && response.status() === 200) {
          console.log('XHR response received');
          console.log(await response.json());
          // if(await response) console.log(await response.json());
          // const stockData = await response.json() || {};
          // console.log(stockData['data']['skus'].filter())
          // const targetItem = stockData['data']['skus'].filter(item => item.sku === skuNum)
          // console.log(targetItem)
      }
    });
    await page.goto(url)
    // await page.screenshot({ path: 'puppeteer.png'}) // screenshot turned off
    await browser.close();

  } catch(error) {
    console('REI checker error--->', error);
  }
};

// console.log(checkerREI());


//initiate emailer if stockInfo has length/store info
// if(stockInfo.length) {
// console.log(`Target: ${itemName} - ${itemDescription} - IS in stock : Sending email`)
//   sendTargetEmail(itemDescription,stockInfo)
// } else {
//   console.log(`Target: ${itemName} - ${itemDescription} -  NOT in stock`)
// };

module.exports = {
  checkerDicks
};