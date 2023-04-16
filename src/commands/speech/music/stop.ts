import { VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { distube } from "../../..";
import { stopErrorHandler } from "./errors";

export function stop(client: Client, msg: VoiceMessage) {
  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    distube.stop(voiceChannel).catch(stopErrorHandler);
  }
}
