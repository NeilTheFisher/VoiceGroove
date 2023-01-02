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

import "./push_interactions";

export const client = new Client({
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

export const distube = new DisTube(client, {
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin()],
  ytdlOptions: {
    quality: "highestaudio",
  },
  searchSongs: 5,
  searchCooldown: 30,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});

registerInteractions(client);

registerSpeechCommands(client);

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);
