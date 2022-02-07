var Twitter = require('twitter');
require('dotenv').config();
post(4)
async function post(newPost) {
    var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
    });

    client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
        if(error) throw error;
        console.log(tweet);  // Tweet body.
        console.log(response);  // Raw response object.
      });
    return
    
}


module.exports = { post };
