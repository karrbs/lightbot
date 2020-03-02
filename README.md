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

# Setup
1. Download this repo
2. Rename the .json file in the config folder to `Default.json`
3. Fill all the blank spaces in the `Default.json` file

# Configuration
```JSON
{
  "options": {
    "debug": true
  },
  "philips": {
    "host": "", // IP of your Philips Hue bridge
    "auth": {
      "key": "" // Set to the key give to the user.
    }
  },
  "twitch": {
    "connection": {
      "cluster": "aws",
      "reconnect": "true"
    },
    "channel": {
      "name": "karrbs"
    },
    "auth": {
      "user": "lightlyBot",
      "clientId":"", // given by twitch
      "key": "" // given by twitch
    }
  }
}
```