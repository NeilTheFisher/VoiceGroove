import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

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

rest
  .put(Routes.applicationCommands("877310497110765598"), {
    body: commands,
  })
  .then(() => {
    console.log("Successfully registered application commands.");
  })
  .catch((err) => {
    console.error(err);
  });
