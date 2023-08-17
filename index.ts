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
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (!command.data || !command.execute) {
      console.log(`The command at ${filePath} is missing a required 'data' or 'execute' property.`);
      continue;
    }
    client.commands.set(command.data.name, command);
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(DISCORD_TOKEN);
