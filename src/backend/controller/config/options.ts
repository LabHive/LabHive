import { readFileSync, existsSync } from 'fs'
import { FILE_PATH } from 'backend/lib/constants'
import Mail from 'nodemailer/lib/mailer'
import { EnvVar } from 'backend/lib/EnvVar'

class Options {
    private _PRODUCTION: EnvVar<boolean>
    private _STAGING: EnvVar<boolean>
    private _DISABLE_DISCORD_BOT: EnvVar<boolean>
    private _ENABLE_MAIL: EnvVar<boolean>
    private _DOCKER: EnvVar<boolean>

    constructor() {
        // Default values are production configuration
        this._PRODUCTION = new EnvVar(process.env.PRODUCTION, false)
        this._STAGING = new EnvVar(process.env.STAGING, false)
        this._ENABLE_MAIL = new EnvVar(process.env.ENABLE_MAIL, true)
        this._DISABLE_DISCORD_BOT = new EnvVar(process.env.DISABLE_DISCORD_BOT, false)

        // autodetectable on production config, thus the default contig is for development
        this._DOCKER = new EnvVar(process.env.DOCKER, false)

        if (this.STAGING === this.PRODUCTION) {
            console.error("Invalid configuration, STAGING and PRODUCTION are mutually exclusive options. At least one option must be true")
            process.exit(1)
        }

        try {
            if (existsSync("/proc/1/cgroup") && readFileSync("/proc/1/cgroup", { encoding: 'utf8' }).indexOf('docker') > -1) {
                console.log("Docker detected!")
                this._DOCKER.value = true
            }
        } catch (err) {
            console.error(err)
        }

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

    public get PRODUCTION(): boolean {
        return this._PRODUCTION.value
    }

    public get STAGING(): boolean {
        return this._STAGING.value
    }

    public get DISABLE_DISCORD_BOT(): boolean {
        return this._DISABLE_DISCORD_BOT.value
    }

    public get DOCKER(): boolean {
        return this._DOCKER.value
    }

    public jsonify() {
        return JSON.stringify(this, null, 4)
    }
}

export let OPT = new Options()

class Configuration {
    MAIL_CONFIG: Mail.Options
    DISCORD_BOT_TOKEN: string

    constructor() {
        this.DISCORD_BOT_TOKEN = !OPT.DISABLE_DISCORD_BOT ? readFileSync(FILE_PATH.discordBotToken, { encoding: 'utf8' }) : ""
        this.MAIL_CONFIG = OPT.ENABLE_MAIL ? JSON.parse(readFileSync(FILE_PATH.mailConfig, { encoding: 'utf8' })) : undefined
    }
}

export let CONF = new Configuration()

