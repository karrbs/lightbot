var tmi = require('tmi.js');
var http = require('http');
var _ = require('lodash');
var S = require('string');
var config = require('config');



var clientID = config.get('twitchAPI.clientID');
var scope = config.get('twitchAPI.scope');


