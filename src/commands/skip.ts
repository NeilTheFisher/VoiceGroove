import { distube } from "..";
import { CommandCallback } from "../types";

export const skip: CommandCallback = async (interaction) => {
  if (interaction.guild?.id) {
    await distube.skip(interaction.guild.id);
  } else {
    console.error("unable to skip", interaction);
  }
};
