var request = require('request');
var _ = require('lodash');


var spPostOpt = {
    url: 'http://strawpoll.me/api/v2/polls',
    headers:'Content-Type: application/json; charset=utf-8',
    json: {
        "title": "This is a test poll.",
        "options": [
            "Option #1",
            "Option #2"
        ],
        "multi": true,
        "permissive": true
    }
};


var pollInfo = function(options, res) {
    request.post(options, function (error, response, body) {
        if (error) {
            return console.error('upload failed:', error);
        }
        console.log('Upload successful!  Server responded with:', body);
        res(body.id);
    });
};

var getResults = function (id,votedColor) {
    var getPoll = function(allColors){
        request.get(spPostOpt.url + '/' + id, function (error, response, body) {
            if (error) {
                callback(error);
            }
            if (response.statusCode == 200) {
                body = JSON.parse(body);
                allColors(null, {'choices':body});
            }
        });
    };


    getPoll(function(error, allColors) {
        var votes = allColors.choices.votes;
        var colors = allColors.choices.options;
        var topVotedNum = _.max(votes);
        var idxTopVoted = _.indexOf(votes,topVotedNum);
        var topVotedColor = _.find(colors, idxTopVoted);
        console.log(topVotedColor,idxTopVoted,topVotedColor);
        votedColor(topVotedColor);
    });
};

console.log(getResults(700));