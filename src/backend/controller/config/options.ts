import { readFileSync, existsSync } from 'fs'
import { FILE_PATH } from 'backend/lib/constants'
import Mail from 'nodemailer/lib/mailer'
import { EnvVar, Options } from 'backend/lib/'

class ControllerOptions extends Options {
    private _DISABLE_DISCORD_BOT: EnvVar<boolean>
    private _ENABLE_MAIL: EnvVar<boolean>

    constructor() {
        super()
        // Default values are production configuration
        this._ENABLE_MAIL = new EnvVar(process.env.ENABLE_MAIL, true)
        this._DISABLE_DISCORD_BOT = new EnvVar(process.env.DISABLE_DISCORD_BOT, false)

        if (this.ENABLE_MAIL && !existsSync(FILE_PATH.mailConfig)) {
            console.error("Mail is enabled, but no config exists!")
            console.error("Set the environment variable ENABLE_MAIL to '0' or 'false' to disable the mail sending feature!")
            process.exit(1)
        }

        if (!this.DISABLE_DISCORD_BOT && !existsSync(FILE_PATH.discordBotToken)) {
            console.error("Discord Bot is enabled, but no discord token could be found!")
            process.exit(1)
        }
    }

    public get ENABLE_MAIL(): boolean {
        return this._ENABLE_MAIL.value
    }

    public get DISABLE_DISCORD_BOT(): boolean {
        return this._DISABLE_DISCORD_BOT.value
    }
}

export let OPT = new ControllerOptions()

class Configuration {
    MAIL_CONFIG: Mail.Options
    DISCORD_BOT_TOKEN: string

    constructor() {
        this.DISCORD_BOT_TOKEN = !OPT.DISABLE_DISCORD_BOT ? readFileSync(FILE_PATH.discordBotToken, { encoding: 'utf8' }) : ""
        this.MAIL_CONFIG = OPT.ENABLE_MAIL ? JSON.parse(readFileSync(FILE_PATH.mailConfig, { encoding: 'utf8' })) : undefined
    }
}

export let CONF = new Configuration()

