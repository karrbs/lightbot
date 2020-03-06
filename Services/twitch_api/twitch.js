var tmi = require("tmi.js");
var http = require("axios");
var _ = require("lodash");
var S = require("string");
var config = require("config");
var util = require("util");

var clientID = config.get("twitch.auth.clientId");

var createGetAuth = function(options, res) {
  var baseUrl =
    "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=";
  var redirectURL = "&redirect_uri=";
  var scope = "&scope=";
  var state = "&state="; //[your provided unique token]

  var fullURL = util.format(
    "%s%s%s%s%s%s%s",
    baseUrl,
    clientID,
    redirectURL,
    "http://localhost",
    scope,
    "chat_login",
    state,
    "dev"
  );

  console.log(fullURL);
  http.get(options, function(error, response, body) {
    if (error) {
      return console.error("upload failed:", error);
    }
    console.log(response.statusCode);
    console.log("Upload successful!  Server responded with:", body);
    res(body);
  });
};

createGetAuth();
