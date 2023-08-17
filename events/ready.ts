import type { Event } from "@/types";

export default {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user!.tag}`);
  },
} as Event;
