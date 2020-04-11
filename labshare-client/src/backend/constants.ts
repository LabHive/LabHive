

export enum FILE_PATH {
    mailConfig = "secret/mailConfig.json",
    hmacKey = "secret/jsonwebtoken_hmacKey.txt",
    adminUser = "secret/adminUser.json"
}

export enum LANG {
    de = "de",
    en = "en"
}

export type LANG_TYPE = keyof typeof LANG
