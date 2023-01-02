import { Client, GatewayIntentBits } from "discord.js";
import {
  addSpeechEvent,
  resolveSpeechWithWitai,
  VoiceMessage,
} from "discord-speech-recognition";
import { DisTube } from "distube";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";

import dotenv from "dotenv";
dotenv.config();

import { join } from "./commands/join";
import { leave } from "./commands/leave";
import { play } from "./commands/speech/music/play";

export const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

// console.debug(process.env.DISCORD_TOKEN, process.env.WITAI_KEY);

addSpeechEvent(client, {
  key: process.env.WITAI_KEY,
  speechRecognition: resolveSpeechWithWitai,
});

export const distube = new DisTube(client, {
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin()],
  searchSongs: 5,
  searchCooldown: 30,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});

const interactionCommands: { [key: string]: Function } = {
  join,
  leave,
};

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  interactionCommands[interaction.commandName](interaction);
});

const speechCommands: { [key: string]: Function } = {
  "music play": play,
  play: play,
};

const speechCommandsKeys = Object.keys(speechCommands);

client.on("speech", (msg: VoiceMessage) => {
  if (!msg.content) return;

  const searchStr = msg.content.toLowerCase();

  console.log("speech", msg.content);

  let command = speechCommands[searchStr];

  if (!command) {
    for (const key of speechCommandsKeys) {
      if (searchStr.includes(key)) {
        command = speechCommands[key];
      }
    }
  }

  if (!command) {
    // todo
    // msg.author.send("Command not found");
    return;
  }

  msg.content = msg.content.replace(new RegExp(`/^${command}/i`), "");

  command(client, msg);

  // speechCommands[msg.content](msg);

  // msg.author.send(msg.content);
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);

//

/* 
import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import {
  addSpeechEvent,
  VoiceMessage,
  resolveSpeechWithWitai,
} from "discord-speech-recognition";

import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});
addSpeechEvent(client, {
  key: process.env.WITAI_KEY,
  speechRecognition: resolveSpeechWithWitai,
});

client.on("messageCreate", (msg) => {
  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as any,
      selfDeaf: false,
    });
    // .receiver.subscribe("210828522086858752", {
    //   autoDestroy: true,
    // })
    // .on("data", (data) => {
    //   const encoder = new OpusEncoder(48000, 1);
    //   const encoded = encoder.encode(data);
    //   console.log(encoded);
    // });
  }
});

client.on("speech", (msg: VoiceMessage) => {
  console.log(msg);

  // If bot didn't recognize speech, content will be empty
  if (!msg.content) return;

  // msg.author.send(msg.content);
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);
 */
