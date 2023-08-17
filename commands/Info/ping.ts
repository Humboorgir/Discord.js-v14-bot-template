import type { Command } from "@/types";
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with the bot's response time"),
  execute(interaction) {
    const ping = interaction.client.ws.ping;
    interaction.reply(`Ping: ${ping}ms`);
  },
} as Command;
