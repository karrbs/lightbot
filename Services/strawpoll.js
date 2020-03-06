var request = require("axios");
var current = new Date();

var newPollValues = {
  poll: {
    title: "Light bot test poll",
    answers: [
      "red",
      "purple",
      "orange",
      "green",
      "blue",
      "hotpink",
      "special"
      // "Color Loop"
    ],
    priv: false,
    ma: 0,
    mip: 0,
    co: 0,
    vpn: 0,
    enter_name: 0,
    has_deadline: false,
    deadline: new Date(current.getTime() + 86400000),
    only_reg: 0,
    has_image: 0,
    image: null
  }
};

var createPoll = function(options, res) {
  request.default.post["Content-Type"] = "application/json";
  request.post(options.url, options.data).then(function(response) {
    if (response.status == "200") {
      console.log(response);
      console.log("Upload successful!  Server responded with:", response);
      res(response.data);
    } else {
      return console.error("upload failed:", error);
    }
  });
};

var getPoll = function(url, res) {
  request.get(url).then(function(response) {
    if (response.status == "200") {
      console.log(response);
      console.log("Upload successful!  Server responded with:", response);
      res(response.data);
    } else {
      return console.error("upload failed:", error);
    }
  });
};

module.exports = {
  createPoll: function(options, res) {
    return createPoll(options, res);
  },
  getPoll: function(url, res) {
    return getPoll(url, res);
  },
  newPollValues: newPollValues
};
