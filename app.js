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
  // Later we'll send a buy order instead
  gdaxClient.getProductOrderBook(
    'ETH-USD'
  )
  .then(data => {
    sendMessage(data.asks[0][0]);
  })
  .catch(error => {
    res.status(500);
    res.send(err.toString());
  });

  // Send SMS
  function sendMessage(last_ask){
    twilioClient.messages.create({
      to: process.env.MY_NUMBER,
      from: process.env.TWILIO_SMS_NUMBER,
      body: 'The current price for ETH is $'+last_ask+'. 💸'
    })
    .then(message => {
      console.log(message);
    })
    .catch(err => {
      res.status(500);
      res.send(err.toString());
    })
    .done();
  }
}

module.exports = { handler }