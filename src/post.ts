var Twitter = require('twitter');
require('dotenv').config();

async function post(newPost) {
  let object = newPost[0]
  let ticker = object.ticker
  let insiderName = object.insiderName
  let insiderPosition = object.insiderPosition
  let positionType = object.positionType
  let quantity = object.quantity
  let priceChange = object.priceChange
  let cost = object.cost

  let update: string = `${insiderName}, ${insiderPosition} of #${ticker} opened new ${positionType} order for ${cost} (qty: ${quantity})`

  var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret,
    });

    await client.post('statuses/update', {status: update},  function(error, tweet, response) {
        if(error) throw error;
        console.log(tweet.text);
      });
      return
}

module.exports = { post };