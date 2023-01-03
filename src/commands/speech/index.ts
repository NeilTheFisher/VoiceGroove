import type { VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import { SpeechCommandCallback } from "../../types";
import { autoplay } from "./music/autoplay";
import { play } from "./music/play";
import { volume } from "./music/volume";
import { rewind, forward } from "./music/seek";
import { skip } from "./music/skip";
import { stop } from "./music/stop";

export function registerSpeechCommands(client: Client) {
  const botName = "music";

  // prettier-ignore
  const speechCommands: Record<string, SpeechCommandCallback> = {
    "play": play,
    //
    "volume": volume,
    //
    "fast forward": forward,
    "forward": forward,
    "rewind": rewind,
    //
    "skip": skip,
    "next": skip,
    //
    "stop": stop,
    "shut up": stop,
    "shut the fuck up": stop,
    //
    "autoplay": autoplay,
    "auto play": autoplay,
  };

  // prepend bot name to all commands
  for (const key in speechCommands) {
    speechCommands[`${botName} ${key}`] = speechCommands[key];
    delete speechCommands[key];
  }

  const speechCommandsKeys = Object.keys(speechCommands);
  const smallestCommandLength = Math.min(
    ...speechCommandsKeys.map((key) => key.length)
  );

  const cmdRegex = new RegExp(
    // prettier-ignore
    `^(?<start>((A|And|Hey|The|(\\s)?)\\s+)?(?<command>${speechCommandsKeys.join("|")})(\\s)?)`,
    "i"
  );

  client.on("speech", (msg: VoiceMessage) => {
    if (
      !msg.content ||
      msg.content.length < smallestCommandLength ||
      msg.content.length > 100
    ) {
      return;
    }

    console.debug(`Speech: "${msg.content}"`);

    const searchStr = msg.content.toLowerCase().trim();

    let match: string | undefined = searchStr;

    let command: SpeechCommandCallback | undefined = speechCommands[match];
    let replaceStr: string | undefined = match;

    if (!command) {
      const groups = searchStr.match(cmdRegex)?.groups;
      if (groups) {
        match = groups.command;

        if (match) {
          console.debug(`Match: "${match}"`);

          command = speechCommands[match];
          replaceStr = groups.start || match;
        }
      }

      if (!command) {
        // no match found
        return;
      }
    }

    msg.content = searchStr.replace(replaceStr, "").trim();

    command(client, msg);
  });
}
