import { VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { distube } from "../../..";
import type { SpeechCommandCallback } from "../../../types";

export const play: SpeechCommandCallback = (
  client: Client,
  msg: VoiceMessage
) => {
  if (!msg.content) return;

  console.log("playing", msg.content);
  // const channel = client.channels.cache.get(msg.member!.voice.channelId!);
  // play music in channel

  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    // leave voice channel
    // msg.connection.destroy();

    distube.play(voiceChannel, msg.content!);

    // distube.on("searchResult", (message, results, query) => {
    //   console.log("message", message);
    //   console.log("results", results);
    //   console.log("query", query);
    // });

    // ! hacky stuff... modify distube's connection to be the one that already exists.
    // ! distube normally connects on it's own but the bot is already connected to a voice channel because of voice commands.
    /* 
      replaced distube/dist/index.js:810
      ``this.connection = __privateMethod(this, _join, join_fn).call(this, channel);``
      with
      ``this.connection = msg.connection;``
    */
    // @ts-ignore
    distube.voices.connection = msg.connection;
  }
};
