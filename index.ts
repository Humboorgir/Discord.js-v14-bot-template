require("dotenv").config();

import * as Discord from "discord.js";
import * as path from "path";
import * as fs from "fs";
import type { Command } from "./types";
const { Guilds, GuildMessages, MessageContent } = Discord.GatewayIntentBits;

const client = new Discord.Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { DISCORD_TOKEN } = process.env;

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user!.tag}`);
});

client.commands = new Discord.Collection<string, Command>();

// Command handler
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;
    if (!command.data || !command.execute) {
      console.log(command.data);
      console.log(`The command at ${filePath} is missing a required 'data' or 'execute' property.`);
      continue;
    }
    console.log(`Loaded command ${command.data.name}`);
    client.commands.set(command.data.name, command);
  }
}

// Event handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath).default;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(DISCORD_TOKEN);
