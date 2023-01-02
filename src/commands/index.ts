import { join } from "./join";
import { leave } from "./leave";
import { Client } from "discord.js";

export function registerInteractions(client: Client) {
  const interactionCommands: { [key: string]: Function } = {
    join,
    leave,
  };

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    interactionCommands[interaction.commandName](interaction);
  });
}
