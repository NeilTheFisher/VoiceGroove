import type { VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { autoplay } from "./music/autoplay";
import { play } from "./music/play";
import { stop } from "./music/stop";

export function registerSpeechCommands(client: Client) {
  const speechCommands: { [key: string]: Function } = {
    "music play": play,
    "music stop": stop,
    "music autoplay": autoplay,
    "music auto play": autoplay,
  };

  const speechCommandsKeys = Object.keys(speechCommands);
  const smallestCommandLength = Math.min(
    ...speechCommandsKeys.map((x) => x.length)
  );

  client.on("speech", (msg: VoiceMessage) => {
    if (!msg.content || msg.content.length < smallestCommandLength) {
      return;
    }

    const searchStr = msg.content.toLowerCase();

    console.log("speech", msg.content);
    console.log("command search:", searchStr);

    let command = speechCommands[searchStr];

    if (!command) {
      for (const key of speechCommandsKeys) {
        if (searchStr.startsWith(key)) {
          command = speechCommands[key];
        }
      }
    }

    if (!command) {
      // command not found
      return;
    }

    msg.content = msg.content.replace(new RegExp(`^${command}(\\s)?`, "i"), "");

    command(client, msg);
  });
}
