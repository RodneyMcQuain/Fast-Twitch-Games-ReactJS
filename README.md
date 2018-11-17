# Fast-Twitch-Games-ReactJS
This is a chrome extension that lets you quickly see, add, and remove streams for your favorite games. Games you add and remove are stored in local storage, so nothing changes next time you open the extension.

To my knowledge, there is no way to know whether a game is valid or not when calling the Twitch API, so you will be notified with "Invalid game name or no one is streaming this game" if you provide an invalid game name or no one is streaming that game. This is because if a fake game name is entered it will still return an empty array, same thing happens if you were to make a call to a game that exists, but does not have anyone currently streaming it. As a result, be sure you type the exact name of game (which will be the name that twitch displays on their site).

Keep in mind this app was written as a chrome extension, but it can be seen in web page form at: https://rodneymcquain.github.io/Fast-Twitch-Games-ReactJS/.

![alt text](https://i.imgur.com/6hEZxBg.png)

Note: This repo is a rewrite of an older project that used vanilla JavaScript, which can be found at: https://github.com/RodneyMcQuain/Fast-Twitch-Games
