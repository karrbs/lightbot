#!/usr/bin/env node
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const tmi = require("tmi.js");
var strawP = require("./Services/strawpoll.js");
var localHue = require("./Services/hue.js");
var twitch = require("./Services/twitch_api/twitch.js");
var config = require("config");

var twitchAuth = config.get("twitch.auth.key");
var twitchChannel = config.get("twitch.channel.name");
var twitchUser = config.get("twitch.auth.botName");
var twitchCluster = config.get("twitch.connection.cluster");
var twitchReconnect = config.get("twitch.connection.reconnect");
var twitchSecure = config.get("twitch.connection.secure");

var twitch_options = {
  options: {
    debug: true
  },
  connection: {
    cluster: twitchCluster,
    secure: twitchSecure,
    reconnect: twitchReconnect
  },
  identity: {
    username: twitchUser,
    password: "oauth:" + twitchAuth
  },
  channels: [twitchChannel]
};

var spPostOpt = {
  url: "https://strawpoll.com/api/poll",
  data: strawP.newPollValues
};

var client = new tmi.client(twitch_options);
var baseURL = "http://strawpoll.com/";
var userChannel = twitch_options.channels[0];
var pollID = "";
var oldPoll = "";
var votedColor = "";

client.connect();

client.on("connected", function() {});
client.on("chat", function(channel, user, message, self) {
  if (user["user-type"] === "mod" || user["username"] === twitchChannel) {
    //command for new poll/old
    if (message.toLowerCase() === "!lb poll") {
      if (pollID === oldPoll) {
        strawP.createPoll(spPostOpt, function(res) {
          pollID = res.content_id;
          client.action(
            userChannel,
            "The poll for lights is located here: " + baseURL + pollID
          );
          return pollID;
        });
      }
      if (pollID != oldPoll) {
        strawP.getPoll(spPostOpt.url + "/" + pollID, function(res) {
          var current = {};
          res.poll_answers.forEach(z => {
            var h = 0;
            if (z.votes > h) {
              current = z;
            }
            votedColor = current.answer;
          });

          localHue.selectedColor(votedColor);
          oldPoll = res.id;
          client.action(
            userChannel,
            "The color with the most votes is " +
              votedColor +
              ", please enjoy the new color!"
          );
          return oldPoll;
        });
      }
    }

    if (message.startsWith("!lb color")) {
      usersColor = message.toLowerCase().strip("!lb color ");
      client.action(
        twitch_options.channels[0],
        user["display-name"] + ", the color that was selected is " + usersColor
      );
      console.log(
        user["display-name"] + ", the color that was selected was " + usersColor
      );
      localHue.selectedColor(usersColor);
    }
  }
  //command for current poll
  if (message === "!lb current") {
    if (pollID === oldPoll) {
      client.action(
        twitch_options.channels[0],
        "We are currently in between polls. Please wait for the next one to be published."
      );
    }
    client.action(
      userChannel,
      "This is the current poll ->" + baseURL + pollID
    );
  }
  if (user["username"] === "heidi_kristine") {
    if (message === "!smite") {
      client.action(
        userChannel,
        "The almighty goddess of the chat , just smited Steampunktempest. He appears to still be breathing somehow."
      );
    }
  }
  if (message === "!lights") {
    client.action(
      userChannel,
      user["display-name"] +
        ", we can't all be god and control the lights. So please leave that up to me!"
    );
  }
});
