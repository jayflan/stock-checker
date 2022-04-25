const axios = require("axios");
const express = require("express");
const router = express.Router();


//GET redsky api via tcin id params
router.get("/id", async (req, res, next) => {
  try {
    const tcin = req.params.id;
    const apiUrl = 'https://redsky.target.com/redsky_aggregations/v1/web/pdp_fulfillment_v1?'
    const axiosParams = {
      key: 'ff457966e64d5e877fdbad070f276d18ecec4a01',
      tcin: tcin,
      store_id: 2264,
      store_positions_store_id: 2264,
      has_store_positions_store_id: true,
      zip: 34761,
      state: 'FL',
      // latitude:40.46026,
      //longitude:-79.94393,
      //scheduled_delivery_store_id:2264,
      pricing_store_id: 2264,
      is_bot:false
    }
    const storeData = (await axios.get(apiUrl, { params: axiosParams }).data)
    console.log(storeData)
    res.send(storeData);
  } catch (error) {
    next(error);
  }
});
