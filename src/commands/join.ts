import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from "@discordjs/voice";
import {
  CacheType,
  ChatInputCommandInteraction,
  GuildMember,
  Interaction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";

export async function join(
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | MessageContextMenuCommandInteraction<CacheType>
    | UserContextMenuCommandInteraction
) {
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
        .voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });
    await interaction.reply("Joined voice channel");
  } else {
    await interaction.reply("Join a voice channel and then try that again!");
  }
}
