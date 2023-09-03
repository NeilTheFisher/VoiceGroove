import { replyErrorHandler } from "./speech/music/errors";
import { CommandCallback } from "../types";
import { distube } from "..";

export const leave: CommandCallback = async (interaction) => {
  distube.voices.leave(interaction.guildId!);

  await interaction.reply("Left voice channel").catch(replyErrorHandler);
};
