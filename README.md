# lightlybot
Lightly Bot is a twitch boat that allows a stream to have the viewers of their stream vote on the light color of the streamers Philips Hue lighting.

## Things to know
I am are currently using the www.strawpoll.com for the polling system until I have time to develope a polling system.

While this project is currently written in node.js I am looking at redeveloping this in GO and Vue or maybe even Dart.  

If you have an issue please log it with details on how you got the issue.

# TODO:
- [ ] Convert to language Go or Dart
- [ ] Find a replacement for string package
- [ ] Create user interface (web and/or application)
- [ ] Create auto configuration of Philips Hue bridge
- [ ] Create auto authentication for Twitch account


# Requirements
- Node.js
- NPM

# Setup
1. Download this repo
2. Navigate to the downloaded repo *(if you downloaded .zip unzip the file)*
3. Navigate to the config folder
4. Rename the .json file in the config folder from `RenameToDefault.json` to `default.json`
5. Use the [configuration](#configuration) section fill all the blank spaces in the `default.json` file 

# Installation
1. Open up terminal or CMD 
2. Navigate to inside of the extracted or downloaded of the repo
3. Type and run `npm install` or `sudo npm install`
4. Type and run `npm install -g .` or `sudo npm install -g .`
5. To test run `lightlybot`
6. Ctr + C to close

# Configuration
```JSON
{
  "options": {
    "debug": true
  },
  "philips": {
    "host": "", // IP of your Philips Hue bridge
    "light": , // Number of the light you want to change 
    "auth": {
      "key": "" // Set to the key give to the user.
    }
  },
  "twitch": {
    "connection": {
      "cluster": "aws",
      "secure": true,
      "reconnect": "true"
    },
    "channel": {
      "name": "" //Replace with name of the twitch chat you want the bot to join
    },
    "auth": {
      "user": "lightlyBot",
      "clientId":"", // given by twitch
      "key": "" // given by twitch
    }
  }
}
```