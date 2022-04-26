const axios = require("axios");
const sendTargetEmail = require("./mailer");
const target = require("./api/target");
// const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");

//Fn: timeout func for calls
const timeOut = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
};



//Fn: axios call to redsky api with response
 const targetChecker = async(url, itemDescription) => {
  await timeOut(5000);
  try {

    console.log('funtion initiated...')
     //extract item/tcin info from url string
     const itemTcin = url.substring(url.indexOf("preselect=") + 10, url.indexOf("#"));
     const itemName = url.substring(url.indexOf("/p/")+ 3, url.indexOf("/-"));
  
    const apiUrl = 'https://redsky.target.com/redsky_aggregations/v1/web/pdp_fulfillment_v1?'
    const axiosParams = {
      key: 'ff457966e64d5e877fdbad070f276d18ecec4a01',
      tcin: itemTcin,
      store_id: 2264,
      store_positions_store_id: 2264,
      has_store_positions_store_id: true,
      zip: 34761,
      state: 'FL',
      // latitude:40.46026,
      //longitude:-79.94393,
      //scheduled_delivery_store_id:2264,
      pricing_store_id: 2264,
      is_bot: false
    }
  
    const stockData = (await axios.get(apiUrl, { params: axiosParams })).data
    // const stockNotifyMe = stockData.data.product.notify_me_enabled;
    // const stockCheck = stockData.data['product']['fulfillment']
    const storeData = stockData.data['product']['fulfillment']['store_options'];
    console.log('api data check--->', storeData);
    // console.log('Is NotifyMe button active?---->', stockNotifyMe)
    
    const stockInfo = storeData.reduce((acc, store) => {
      //eval. if response/json item is in stock
      if(store.location_available_to_promise_quantity > 1) {
        acc.push(
          {
            'item': itemName,
            'itemDetail': itemDescription,
            'storeName': store.location_name,
            'storeAddress': store.location_address,
            'storeQuantity': store.location_available_to_promise_quantity,
            'linkToWebsite': url
          }
        );
      } 
      return acc;
     }, []);
  
     //initiate emailer if stockInfo has length/store info
     if(stockInfo.length) {
      console.log(`Target: ${itemName} - ${itemDescription} - IS in stock : Sending email`)
       sendTargetEmail(itemDescription,stockInfo)
     } else {
       console.log(`Target: ${itemName} - ${itemDescription} -  NOT in stock`)
     };
  } catch(error) {
    console.log('target checker error----->', error);
  }

  }; //Fn end
   

module.exports = {
  targetChecker
};