var Client = require('instagram-private-api').V1;
var device = new Client.Device('lolo');
var storage = new Client.CookieMemoryStorage();
var credentials = require('./credentials.json')
var hashtags = require('./hashtags.json');

Client.Session.create(device, storage, credentials.username, credentials.password).then(function(data){
    like(data)
})

function like(session){

    var rand = (Math.random()*(120-60)+60)*1000
    if(rand > 118000){
        rand = (Math.random()*(360-300)+300)*1000
        console.log("5min sleep")
    }
    else if(rand > 119500){
        rand = (Math.random()*(600-500)+500)*1000
        console.log("10min sleep")
    }
    

    setTimeout(function(){
        var tag = hashtags[Math.floor(Math.random()*hashtags.length)]
        var tagMedia = new Client.Feed.TagMedia(session, tag);
        tagMedia.get().then(function(data){
            var media = data[0]
            console.log(media.account.params.username)
            user = media.account.id;
            Client.Like.create(session, media.id)
        })
        like(session)
    }, rand)
}