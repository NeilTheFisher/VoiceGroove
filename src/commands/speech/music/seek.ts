import { Guild } from "discord.js";
import { distube } from "../../..";
import { SpeechCommandCallback } from "../../../types";

const words = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function seek(guild: Guild, msg: string, rewind: boolean) {
  const first = msg.split(" ")[0];

  let seek = parseInt(first);

  if (Number.isNaN(seek)) {
    seek = words[first as keyof typeof words];
  }

  if (!Number.isNaN(seek)) {
    const queue = distube.getQueue(guild);
    if (queue) {
      distube.seek(guild, queue.currentTime + seek);
    }
  }
}

export const rewind: SpeechCommandCallback = (client, msg) => {
  seek(msg.guild!, msg.content!, true);
};

export const forward: SpeechCommandCallback = (client, msg) => {
  seek(msg.guild!, msg.content!, false);
};
