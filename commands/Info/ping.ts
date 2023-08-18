import type { Command } from "@/types";
import { SlashCommandBuilder } from "discord.js";

const command = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with the bot's response time"),
  execute(interaction) {
    const ping = interaction.client.ws.ping;
    interaction.reply(`Ping: ${ping}ms`);
  },
} as Command;

export default command;
