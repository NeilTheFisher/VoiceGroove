import { distube } from "..";
import { GuildMember } from "discord.js";
import type { CommandCallback } from "../types";
import { replyErrorHandler, joinErrorHandler } from "./speech/music/errors";

export const join: CommandCallback = async (interaction) => {
  if (
    interaction.member instanceof GuildMember &&
    interaction.member.voice.channel
  ) {
    const channel = interaction.member.voice.channel;

    const connection = await distube.voices
      .join(channel)
      .catch(joinErrorHandler);

    if (connection) {
      connection.setSelfMute(false);
      connection.setSelfDeaf(false);
      await interaction.reply("Joined voice channel").catch(replyErrorHandler);
    }
  } else {
    await interaction
      .reply("Join a voice channel and then try that again!")
      .catch(replyErrorHandler);
  }
};
