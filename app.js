// Use dotenv to load environment variables
require('dotenv').config();

// Load Twilio and GDAX
const twilio = require('twilio');
const gdax = require('gdax');

// Declare Lambda handler
const handler = (event, context, callback) => {
  // Set up GDAX for buying crypto
  const gdaxClient = new gdax.AuthenticatedClient(
    process.env.GDAX_API_KEY, 
    process.env.GDAX_SECRET, 
    process.env.GDAX_PASSPHRASE, 
    process.env.GDAX_API_ENDPOINT
  );

  // Set up Twilio client for sending SMS
  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
  );

  // Check the latest price of ETH
  gdaxClient.getProductTicker(
    'ETH-USD'
  )
  .then(data => {
    // Determine what $10 of ETH costs
    const price = (10/data.price);
    // Return smallest unit available for purchase
    const orderSize = price.toString().substr(0,10);
    
    // Place a buy order
    buyOrder(orderSize, data.price);
  })
  .catch(err => {
    // Dump the entire error and send failure notification
    console.error(err);
    sendSMS("Unable to get ETH ticker price. Response from GDAX: "+err.response.statusMessage+ ", "+err.data.message);
  });

  // Place a buy order
  function buyOrder(orderSize, currentPrice){
    const args = {
      'product_id': 'ETH-USD',
      'type': 'market',
      'side': 'buys',
      'size': orderSize
    }

    gdaxClient.buy(args)
    .then(data => {
      // Send success notification
      sendSMS("💸 Purchased "+orderSize+" ETH! The current USD price of ETH is $"+currentPrice.substr(0,6)+".");
    })
    .catch(err => {
      // Dump the entire error and send failure notification
      console.error(err);
      sendSMS("Unable to place buy order for ETH. Response from GDAX: "+err.response.statusMessage+ ", "+err.data.message);
    });
  }

  // Send SMS notification
  function sendSMS(message){
    twilioClient.messages.create({
      to: process.env.MY_NUMBER,
      from: process.env.TWILIO_SMS_NUMBER,
      body: message
    })
    .then(msg => {
      // Log the message from Twilio
      console.log(msg);
    })
    .catch(err => {
      console.error(err);
    })
    .done();
  }
}

module.exports = { handler }