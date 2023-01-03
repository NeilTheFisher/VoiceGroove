import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import type { CommandCallback } from "../types";

export const join: CommandCallback = async (interaction) => {
  if (
    interaction.member instanceof GuildMember &&
    interaction.member.voice.channel
  ) {
    const channel = interaction.member.voice.channel;
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      selfDeaf: false,
      // selfMute: true,
      adapterCreator: channel.guild
        .voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator, // todo check if this is correct
    });
    await interaction.reply("Joined voice channel");
  } else {
    await interaction.reply("Join a voice channel and then try that again!");
  }
};
