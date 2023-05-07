import { GuildMember } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import { distube } from "..";
import { CommandCallback } from "../types";
import { playErrorHandler, replyErrorHandler } from "./speech/music/errors";

export const play: CommandCallback = async (interaction) => {
  if (
    interaction.member instanceof GuildMember &&
    interaction.member.voice.channel
  ) {
    const voiceChannel = interaction.member.voice.channel;

    const song = interaction.options.data[0].value as string;

    distube.play(voiceChannel, song).catch(playErrorHandler);

    await interaction
      .reply(`Playing ${song} in ${voiceChannel.name}!`)
      .catch(replyErrorHandler);
  } else {
    await interaction
      .reply("Join a voice channel and then try that again!")
      .catch(replyErrorHandler);
  }
};
