var tmi = require('tmi.js');
var hue = require("node-hue-api");
var http = require('http');
var _ = require('lodash');
var S = require('string');
var strawP = require('./Services/strawpoll.js');
var localHue = require('./Services/hue.js');

var date = new Date();

// Twitch stuff


var twitch_options ={
    options:{
        debug: true
    },
    connection:{
        cluster:"aws",
        reconnect:true
    },
    identity:{
        username: "lightlyBot",
        password: "oauth:hkp77uxcngu8ke8ukifdt868rvurvr"
    },
    channels: ["karrbs"]
};



var spPostOpt = {
    url: 'http://strawpoll.me/api/v2/polls',
    timeout: 2000,
    followAllRedirects: true,
    headers:'Content-Type: application/json; charset=utf-8',
    json: strawP.newPollValues
};

var client = new tmi.client(twitch_options);
var baseURL = 'http://strawpoll.me/';
var userChannel = twitch_options.channels[0];
var pollID = '';
var oldPoll = '';
var votedColor = '';

client.connect();


client.on("connected", function(){
    //strawP.createPoll(spPostOpt,function(res){
       // pollID = res.id;
        //client.action(userChannel, "The poll for lights is located here: ");
        //client.action(userChannel, "!lb current");
    //});
});
client.on("chat", function (channel, user, message, self) {
    if (user["user-type"] === "mod") {
        //command for new poll/old
        if (message.toLowerCase() === "!lb poll") {
            if (pollID === oldPoll) {
                strawP.createPoll(spPostOpt, function (res) {
                    pollID = res.id;
                    client.action(userChannel, "The poll for lights is located here: " + baseURL + pollID);
                    return pollID
                });
            }
            if(pollID != oldPoll) {
                strawP.getPoll(spPostOpt.url + '/' + pollID, function (err, res) {
                    console.log(res);
                    colors = res.choices.options;
                    votes = res.choices.votes;

                    maxVote = _.max(votes);
                    idxMaxVote = _.indexOf(votes, maxVote);
                    votedColor = colors[idxMaxVote];

                    //localHue.selectedColor(votedColor);
                    oldPoll = res.choices.id;
                    client.action(userChannel, "The color with the most votes is " + votedColor + ", please enjoy the new color!");
                    return oldPoll
                });
            }
        }

        //override for color --- does this still work
        if (message.startsWith("!lb color")) {
            usersColor = S(message.toLowerCase()).strip('!lb color ').s;
            client.action(options.channels[0], user['display-name'] + ", the color that was selected is " + usersColor);
            console.log(user['display-name'] + ", the color that was selected was " + usersColor);
            localHue.selectedColor(usersColor);
        };
    }
    //command for current poll
    if(message === "!lb current"){
        if(pollID === oldPoll){
            client.action(twitch_options.channels[0],  "We are currently in between polls. Please wait for the next one to be published.");
        }
        client.action(userChannel,  "This is the current poll ->" + baseURL + pollID);
    }
    if(message === "!lights"){
        client.action(userChannel, user['display-name'] + ", we can't all be god and control the lights. So please leave that up to me!")
    }
});
