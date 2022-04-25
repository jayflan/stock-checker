const nodemailer = require("nodemailer");
const sesTransport = require("nodemailer-ses-transport");
const AWS = require("aws-sdk");
const { getMaxListeners } = require("./app");
require ("dotenv").config();

const ses = new AWS.SES({
  apiVersion: "2010-12-10",
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

//create Nodemailer SES trasnporter
const transporter = nodemailer.createTransport(sesTransport({
  SES: { ses, AWS },
  sendingRate: 1
}));

//send some mail
const sendTargetEmail = (itemName, stockInfo) => {
  
  const html = `
    <h3>${itemName}</h3>
    <div>
      <ul style="list-style-type:none;">
        <h4>Store Information</h4>
        ${stockInfo.map(store => 
          `<li>
            <a href=${store['linkToWebsite']}
            >
            Link
            </a>
            <div>
              Name: ${store['storeName']}
            </div
            <div>
              Address: ${store['storeAddress']}
            </div>
            <div>
              Quantity: ${store['storeQuantity']}
            </div>
          </li>`
        )}
      </ul>
    </div>
  `;

  transporter.sendMail(
  {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "Alert: Target Item in Stock! ",
    // text: "Item in stock at Target",
    html: html,
    ses: {
      //SendRawEmail tags needed
      Tags: [
        {
          Name: "tag_name",
          Value: "tag_value"
        }
      ]
    }
  },
  (err, info) => {
    console.log(err || info);
    // console.log(info.envelope);
    // console.log(info.messageId);
  });
};

module.exports = sendTargetEmail;


