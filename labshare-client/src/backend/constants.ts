import { EventEmitter } from 'events';

export const TESTS_PER_WEEK = 382154;

export enum FILE_PATH {
    mailConfig = "secret/mailConfig.json",
    hmacKey = "secret/jsonwebtoken_hmacKey.txt",
    adminUsers = "secret/adminUsers.json",
    discordBotToken = "secret/discordBotToken.txt"
}


export enum LANG {
  de = 'de',
  en = 'en'
}

export type LANG_TYPE = keyof typeof LANG;

export const GlobalEvent = new EventEmitter();
