import { getVoiceConnection } from "@discordjs/voice";
import type {
  CacheType,
  ChatInputCommandInteraction,
  Interaction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";

export async function leave(
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | MessageContextMenuCommandInteraction<CacheType>
    | UserContextMenuCommandInteraction
) {
  const connection = getVoiceConnection(interaction.guildId!);
  if (connection) {
    connection.destroy();
    await interaction.reply("Left voice channel");
  } else {
    await interaction.reply("Bot isn't in voice channel!");
  }
}
