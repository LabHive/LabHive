export const TESTS_PER_WEEK = 354521;

export enum FILE_PATH {
  mailConfig = 'secret/mailConfig.json',
  hmacKey = 'secret/jsonwebtoken_hmacKey.txt'
}

export enum LANG {
  de = 'de',
  en = 'en'
}

export type LANG_TYPE = keyof typeof LANG;
