import { distube } from "../../..";
import { SpeechCommandCallback } from "../../../types";

export const volume: SpeechCommandCallback = (client, msg) => {
  if (!msg.content || !distube) return;

  const volume_str = msg.content;

  if (volume_str.includes("rape")) {
    distube.setVolume(msg.guild!, Number.MAX_SAFE_INTEGER);
    return;
  }

  const volume = parseInt(volume_str.split(" ")[0]);

  if (!Number.isNaN(volume)) {
    distube.setVolume(msg.guild!, volume);
  }
};
