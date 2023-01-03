import { Guild } from "discord.js";
import { distube } from "../../..";
import { SpeechCommandCallback } from "../../../types";

export const skip: SpeechCommandCallback = (client, msg) => {
  distube.skip(msg.guild!).catch();
};
