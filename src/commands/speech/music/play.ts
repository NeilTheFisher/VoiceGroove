import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import { VoiceMessage } from "discord-speech-recognition";
import { Client, GuildTextBasedChannel, TextChannel } from "discord.js";
import { distube } from "../../..";

export function play(client: Client, msg: VoiceMessage) {
  console.log("play");

  // const channel = client.channels.cache.get(msg.member!.voice.channelId!);
  // play music in channel

  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    // leave voice channel
    // msg.connection.destroy();

    distube.play(voiceChannel, msg.content!);

    // !hacky stuff... modify distube's connection to be the same as the one before.
    // !distube normally connects on it's own but the bot is already connected to a voice channel.
    /* 
      replaced distube/dist/index.js:810
      ``this.connection = __privateMethod(this, _join, join_fn).call(this, channel);``
      with
      ``this.connection = msg.connection;``
    */
    // @ts-ignore
    distube.voices.connection = msg.connection;

    // distube.emit("connection" as any, msg.connection, null);
  }

  // const player = createAudioPlayer();

  // msg.connection.subscribe(player);

  // const resource = createAudioResource(
  //   // "https://soundcloud.com/famous_dex1/japan"
  //   "./kaixan - betrayal.mp3"
  // );

  // player.play(resource);

  // player.on(AudioPlayerStatus.Idle, () => {
  //   msg.connection.destroy();
  // });

  // player.on("error", (error) => {
  //   console.error(error);
  //   msg.connection.destroy();
  // });

  // player.on("debug", (message) => {
  //   console.log(message);
  // });

  // player.on("stateChange", (oldState, newState) => {
  //   console.log(oldState.status, newState.status);
  // });
}
