import { VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { distube } from "../../..";
import type { SpeechCommandCallback } from "../../../types";

import { playErrorHandler } from "./errors";

export const play: SpeechCommandCallback = async (
  client: Client,
  msg: VoiceMessage
) => {
  if (!msg.content) return;

  console.log("playing", msg.content);

  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    await distube.play(voiceChannel, msg.content!).catch(playErrorHandler);
  }
};
