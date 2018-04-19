# Serverless Dollar-cost Averaging for the Crypto Markets

Use a Node.js AWS Lambda function to purchase cryptocurrency every day via GDAX and have Twilio send you an SMS notification to tell you about it.

### What even is this?

- **Serverless** functions execute server-side code without the requirement that you manage the actual server. In this case, this application uses [AWS Lambda](https://aws.amazon.com/lambda/) to invoke some Node.js code. This Lambda function is triggered to run on a daily schedule thanks to [Amazon Cloudwatch events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html).

- **Dollar-cost averaging** is a fancy term for a very simple investment strategy that essentially just means spreading your purchase equally over a given timespan to reduce volatility. Wikipedia discusses this in a lot more detail [here](https://en.wikipedia.org/wiki/Dollar_cost_averaging) if you're interested.

- **Crypto Markets** refers to digital currency exchanges. In this context, we'll be using the [GDAX](https://www.gdax.com) [APIs](https://docs.gdax.com/) to conduct automated trading, basically just purchasing a small amount of [Ethereum](https://www.ethereum.org/) every day. 

## Big important disclaimer!

This is provided as an example, but I'm absolutely not giving investment advice and provide no warranty for this application. You should use at your own risk and be prepared to lose all money that you might choose to invest in any cryptocurrency. As Kai Ryssdal would say, markets go down, too. 📉

## How does this work?

Check out [the blog post](http://adamjstevenson.com/tutorials/2018/02/25/serverless-nodejs-dollar-cost-averaging-for-crypto-markets.html) to get all the details.