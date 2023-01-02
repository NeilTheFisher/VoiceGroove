import { VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { distube } from "../../..";

export function autoplay(client: Client, msg: VoiceMessage) {
  if (!msg.content) return;

  const queue = distube.getQueue(msg.guild!);
  queue?.toggleAutoplay();

  console.log("autoplay", queue?.autoplay);
}
