# Discord.js v14 bot template

Clone this repo to create a new discord.js v14 bot, no need to write boilerplate, everything's already set up.\
Comes with a command handler, event handler, and enough code to get your bot online.\

### <u>This is mostly for personal use but if you'd like to use it, feel free to do so!</u>

<br/>

# MIT LICENSED

This project is licensed under MIT

# How to use

## Installation

- Clone this repository
- Enter one of the following commands to install typescript:\
  `npm i -g typescript` (recommended)\
  `npm i --save-dev typescript`
- Run `npm install` to install the required dependencies
- Create a file in the root director and name it `.env`\
  Paste your bot's token there in the following format: \
  DISCORD_TOKEN=`Your bot's token`

## Scripts

- `npm run dev` when you're coding the bot, restarts whenever you make changes
- `npm run build` to compile the typescript code into javascript (the result will be saved in ./dist)
- `npm run start` to run the compiled code in ./dist

## That's it!

Create a folder in commands directory to create a new category, and create a file inside them to create a new command.\
 (categories don't affect the actual code in any way, they're just meant to organize commands in development)\
 <br/>

#### Commands are supposed to export a default object with the following properties:

```
data: Slash command builder
execute(interation): The function executed when someone runs this command
```

#### Events also work in a similar way:

```
name: string
once: boolen, uses event.once instead of event.on if true (optional)
execute(...args): The function executed when this event is emitted
```
