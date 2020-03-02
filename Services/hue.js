var hue = require("node-hue-api").v3;
const HueApi = hue.HueApi;
var LightState = require("node-hue-api").v3.lightStates.LightState;
var config = require("config");
var S = require("string");
var _ = require("lodash");

var hostname = config.get("philips.host"),
  username = config.get("philips.auth.key"),
  state;

var selectedColor = function(color) {
  if (color === "Color Loop") {
    color = "loopOfColor";
  }
  if (color === "hot pink") {
    color = "hotpink";
  }

  switch (color) {
    case "red":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(219, 20, 61);
      break;
    case "blue":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(0, 68, 255);
      break;
    case "hotpink":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(245, 66, 242);
      break;
    case "purple":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(54, 0, 135);
      break;
    case "orange":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(255, 132, 0);
      break;
    case "green":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(0, 135, 45);
      break;
    case "special":
      state = new LightState()
        .on()
        .effectNone()
        .transitiontime(30)
        .bri(254)
        .rgb(64, 226, 160);
      break;
    case "loopOfColor":
      state = new LightState().on().effect("colorloop");
      break;
    default:
      break;
  }

  hue.discovery
    .nupnpSearch()
    .then(searchResults => {
      const host = searchResults[0].ipaddress;
      return hue.api.createLocal(hostname).connect(username);
    })
    .then(api => {
      return api.lights
        .setLightState(4, state)
        .then(result => {
          console.log(`Light state change was successful? ${result}`);
        })
        .done();
    })
    .then(result => {
      console.log(`Light state change was successful? ${result}`);
    });
};

module.exports = {
  selectedColor: function(color) {
    return selectedColor(color);
  }
};
