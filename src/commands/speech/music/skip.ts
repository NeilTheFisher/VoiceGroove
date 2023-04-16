import { Guild } from "discord.js";
import { distube } from "../../..";
import { SpeechCommandCallback } from "../../../types";
import { skipErrorHandler } from "./errors";

export const skip: SpeechCommandCallback = (client, msg) => {
  distube.skip(msg.guild!).catch(skipErrorHandler);
};
