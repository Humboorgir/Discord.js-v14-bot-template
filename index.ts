require("dotenv").config();

import type { Client } from "discord.js";
import * as Discord from "discord.js";
const { Guilds, GuildMessages, MessageContent } = Discord.GatewayIntentBits;

const client = new Discord.Client({ intents: [Guilds, GuildMessages, MessageContent] });
const { DISCORD_TOKEN } = process.env;

client.on("ready", (client: Client) => {
  console.log(`Logged in as ${client.user!.tag}`);
});

client.login(DISCORD_TOKEN);
