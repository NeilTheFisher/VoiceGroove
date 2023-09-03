import { Client, GatewayIntentBits } from "discord.js";
import {
  addSpeechEvent,
  resolveSpeechWithWitai,
} from "discord-speech-recognition";
import { DisTube } from "distube";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";

import dotenv from "dotenv";
dotenv.config();

import { registerSpeechCommands } from "./commands/speech";
import { registerInteractions } from "./commands";

console.log("Starting...");

import "./push_interactions";

if (!process.env.DISCORD_TOKEN || !process.env.WITAI_KEY) {
  console.error("Missing DISCORD_TOKEN or WITAI_KEY in env.");
  process.exit(1);
}

export const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    // GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

addSpeechEvent(client, {
  key: process.env.WITAI_KEY,
  speechRecognition: resolveSpeechWithWitai,
});

export const distube = new DisTube(client, {
  plugins: [
    new SoundCloudPlugin(),
    new SpotifyPlugin(),
    new YtDlpPlugin({
      update: true,
    }),
  ],
  ytdlOptions: {
    quality: "highestaudio",
  },
  nsfw: true,
  searchSongs: 5,
  searchCooldown: 30,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  joinNewVoiceChannel: false,
});

distube.on("playSong", (queue, song) => {
  console.log("song", { name: song.name, url: song.url }); // todo make this a discord message and move it somewhere else
});

registerInteractions(client);

registerSpeechCommands(client);

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
});
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
});
