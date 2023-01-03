import { distube } from "../../..";
import { SpeechCommandCallback } from "../../../types";

export const autoplay: SpeechCommandCallback = (client, msg) => {
  const queue = distube.getQueue(msg.guild!);
  queue?.toggleAutoplay();

  console.log("autoplay", queue?.autoplay);
};
