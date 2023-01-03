import type { VoiceMessage } from "discord-speech-recognition";
import type {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";

export type CommandCallback = (
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | MessageContextMenuCommandInteraction<CacheType>
    | UserContextMenuCommandInteraction
) => void;

export type SpeechCommandCallback = (client: Client, msg: VoiceMessage) => void;
