export const TESTS_PER_WEEK = 354521;

export enum FILE_PATH {
    mailConfig = "secret/mailConfig.json",
    hmacKey = "secret/jsonwebtoken_hmacKey.txt",
    adminUser = "secret/adminUser.json"
}

<!-- can we use this for the number formatting?
  https://stackoverflow.com/a/47219162/1842673
  customFormat("### ### ###", TESTS_PER_WEEK)
    > 354 521
  or even
  customFormat("###&#8239;###&#8239;###", TESTS_PER_WEEK)
  > 354HalfSpace521
  -->

export enum LANG {
  de = 'de',
  en = 'en'
}

export type LANG_TYPE = keyof typeof LANG;
