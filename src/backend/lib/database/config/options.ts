import { readFileSync, existsSync } from 'fs'
import { FILE_PATH } from 'backend/lib/constants'
import Mail from 'nodemailer/lib/mailer'
import { EnvVar } from 'backend/lib/EnvVar'
import { Options } from '../../Options'

class DatabaseOptions extends Options  {
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

export let OPT = new DatabaseOptions()

class Configuration {
    DB_CONFIG?: {username: string, password: string}
    ADMIN_USERS?: any[]

    constructor() {
        if (!existsSync(FILE_PATH.adminUsers)) {
            console.error("No admin user configuration found!")
            console.error("Create an admin user in secret/adminUsers.json")
        } else {
            this.ADMIN_USERS = JSON.parse(readFileSync(FILE_PATH.adminUsers, { encoding: "utf8" }))
        }

        if (!existsSync(FILE_PATH.dbConfig) && OPT.PRODUCTION) {
            console.error("No DB Config found")
            process.exit(1);
        }
        else if (existsSync(FILE_PATH.dbConfig)) {
            this.DB_CONFIG =  JSON.parse(readFileSync(FILE_PATH.dbConfig, { encoding: 'utf8' })) 
        }
    }
}

export let CONF = new Configuration()

