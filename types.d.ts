import type { Collection, CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
}
export interface Event {
  name: string;
  execute: (...args: any) => void;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
