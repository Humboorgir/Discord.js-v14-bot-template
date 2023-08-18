import type { Event } from "@/types";

const event = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user!.tag}`);
  },
} as Event;

export default event;
