import { join } from "./join";
import { leave } from "./leave";
import { Client } from "discord.js";
import { play } from "./play";
import { skip } from "./skip";

export function registerInteractions(client: Client) {
  const interactionCommands: { [key: string]: Function } = {
    join,
    leave,
    play,
    skip,
  };

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    interactionCommands[interaction.commandName]?.(interaction);
  });
}
