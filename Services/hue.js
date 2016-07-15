var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var config = require('config');
var presetColor = require("./color_preset.json");
var S = require('string');
var _ = require('lodash');

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var hostname = config.get('phillips.host'),
    username = config.get('phillips.auth.key'),
    api = new HueApi(hostname, username),
    state;

var selectedColor = function(color){
    if(color === "Color Loop"){
        color = "loopOfColor";
    };
    if(color === "hot pink"){
        color = "hotpink";
    };

    switch (color){
        case 'red':
            state = lightState.create().on().effect("none").transitionTime(30).bri(254).rgb(219,20,61);
            break;
        case 'blue':
            state = lightState.create().on().effect('none').transitionTime(30).bri(254).hue(45484).sat(254).ct(153).xy(0.1545, 0.0967);
            break;
        case 'hotpink':
            state = lightState.create().on().effect('none').transitionTime(30).bri(254).xy(0.3944, 0.1704);
            break;
        case 'purple':
            state = lightState.create().on().effect('none').transitionTime(30).bri(254).xy(0.1864, 0.0809);
            break;
        case 'orange':
            state = lightState.create().on().effect('none').transitionTime(30).bri(254).xy(0.5335,0.4165);
            break;
        case 'green':
            state = lightState.create().on().effect('none').transitionTime(30).bri(254).hue(25468).effect('none').sat(254).ct(153).xy(0.1727, 0.698);
            break;
        case 'special':
            state = lightState.create().on().effect('none').transitionTime(30).bri(254).rgb(64,226,160);
            break;
        case 'loopOfColor':
            state = lightState.create().on().effect('colorloop');
            break;
        default:
            state = "Could not select a valid color.";
        break;

    }
    api.setLightState(1, state).then(displayResult).done();

};

module.exports = {
    selectedColor: function(color){
        return selectedColor(color);
    }
}