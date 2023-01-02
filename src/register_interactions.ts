import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";

dotenv.config();

const commands = [
  {
    name: "join",
    description: "Bot joins voice channel and starts speech recognition",
  },
  {
    name: "leave",
    description: "Bot leaves voice channel",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

try {
  await rest.put(Routes.applicationCommands("877310497110765598"), {
    body: commands,
  });
  console.log("Successfully registered application commands.");
} catch (error) {
  console.error(error);
}
