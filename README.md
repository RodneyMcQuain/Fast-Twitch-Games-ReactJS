# Fast-Twitch-Games-ReactJS
This is a chrome extension that lets you quickly see, add, and remove streams for your favorite games. Games you add and remove are stored in local storage, so nothing changes next time you open the extension.

To my knowledge, there is no way to know whether a game is valid or not when calling the Twitch API, so you will be notified with "Invalid game name or no one is streaming this game" if you provide an invalid game name or no one is streaming that game. This is because if a fake game name is entered it will still return an empty array, same thing happens if you were to make a call to a game that exists, but does not have anyone currently streaming it. As a result, be sure you type the exact name of game (which will be the name that twitch displays on their site).

To test this extension you will need to download Google Chrome and this repo's files and replace the variable 'API_KEY' in scripts/popup.js with a real key. You can get this key by signing up and registering an app at https://dev.twitch.tv/dashboard or you can just use this old key of mine 'psg3wise3seulmw0lel36ofzu1edew'. Next, go to extensions in chrome settings and make sure you have developer mode in the top right turned on. Now, click "Load Unpacked" in the top left and provide the downloaded repo's directory and you're all set!

![alt text](https://i.imgur.com/6hEZxBg.png)

Note: This repo is a rewrite of an older project that used vanilla JavaScript, which can be found at: https://github.com/RodneyMcQuain/Fast-Twitch-Games
