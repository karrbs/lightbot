var request = require('request');

var newPollValues = {"title": "Light bot test poll",
    "options": [
        "red",
        "purple",
        "orange",
        "green",
        "blue",
        "hotpink",
        "special",
        "Color Loop"
    ],
    "multi": true,
    "permissive": true};

var createPoll = function(options, res) {
    request.post(options, function (error, response, body) {
        if (error) {
            return console.error('upload failed:', error);
        }
        console.log(response.statusCode);
        console.log('Upload successful!  Server responded with:', body);
        res(body);
    });
};



var getPoll = function (url, res) {
        request.get(url, function (error, response, body) {
            if (error) {
                callback(error);
            }
            if (response.statusCode == 200) {
                body = JSON.parse(body);
                res(null,{"choices": body});

            }
        });
};

module.exports = {
    createPoll: function(options,res){
        return createPoll(options,res);
    },
    getPoll: function(url,res){
        return getPoll(url,res);
    },
    newPollValues: newPollValues
    }

