import { REST } from "@discordjs/rest";
import {
  RESTPutAPIApplicationCommandsJSONBody,
  Routes,
} from "discord-api-types/v10";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.APP_ID) {
  console.error("Missing APP_ID in env.");
  process.exit(1);
}

if (!process.env.DISCORD_TOKEN) {
  console.error("Missing DISCORD_TOKEN in env.");
  process.exit(1);
}

const commands: RESTPutAPIApplicationCommandsJSONBody = [
  {
    name: "join",
    description: "Joins voice channel and starts speech recognition",
  },
  {
    name: "leave",
    description: "Leaves voice channel",
  },
  {
    name: "play",
    description: "Plays a song",
    options: [
      {
        name: "song",
        description: "The song to play",
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.APP_ID), {
    body: commands,
  })
  .then(() => {
    console.log("Successfully registered application commands.");
  })
  .catch((err) => {
    console.error(err);
  });
