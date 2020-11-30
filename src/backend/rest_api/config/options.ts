import { readFileSync, existsSync } from 'fs'
import { FILE_PATH } from '../../lib/constants'
import { Options } from '../../lib/options'
import { Optional } from 'lib/optional'
import { EnvVar } from "backend/lib/";

class RestOptions extends Options {
    private _BASE_URL: EnvVar<string>
    private _ENABLE_MAIL: EnvVar<boolean>
    private _DISABLE_DISCORD_BOT: EnvVar<boolean>
    private _DISABLE_VERIFICATION: EnvVar<boolean>    
    private _DISABLE_RATE_LIMITING: EnvVar<boolean>
    private _SERVE_STATIC: EnvVar<boolean>
    private _RATE_LIMITING_BLOCK_DURATION: EnvVar<number>

    constructor() {
        super()
        // Default values are production configuration
        this._BASE_URL = new EnvVar(process.env.BASE_URL, "https://labhive.de")

        this._ENABLE_MAIL = new EnvVar(process.env.ENABLE_MAIL, true)
        this._DISABLE_DISCORD_BOT = new EnvVar(process.env.DISABLE_DISCORD_BOT, false)

        this._DISABLE_VERIFICATION = new EnvVar(process.env.DISABLE_VERIFICATION, false)
        this._DISABLE_RATE_LIMITING = new EnvVar(process.env.DISABLE_RATE_LIMITING, false)
        this._RATE_LIMITING_BLOCK_DURATION = new EnvVar(process.env.RATE_LIMITING_BLOCK_DURATION, 60)

        // autodetectable on production config, thus the default contig is for development
        this._SERVE_STATIC = new EnvVar(process.env.SERVE_STATIC, false)

        if (this.STAGING) {
            this._ENABLE_MAIL.setIfNotSet(false)
            this._DISABLE_DISCORD_BOT.setIfNotSet(true)
            this._DISABLE_VERIFICATION.setIfNotSet(true)
            this._DISABLE_RATE_LIMITING.setIfNotSet(true)
            this._RATE_LIMITING_BLOCK_DURATION.setIfNotSet(1)
            this._BASE_URL.setIfNotSet('https://dev.labhive.de')
        }

        if (this.ENABLE_MAIL && !existsSync(FILE_PATH.mailConfig)) {
            console.error("Mail is enabled, but no config exists!")
            console.error("Set the environment variable ENABLE_MAIL to '0' or 'false' to disable the mail sending feature!")
            process.exit(1)
        }

        if (this.PRODUCTION && !existsSync(FILE_PATH.hmacKey)) {
            console.error("Production mode is enabled, but no hmacKey exists!")
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

    public get DISABLE_VERIFICATION(): boolean {
        return this._DISABLE_VERIFICATION.value
    }

    public get BASE_URL(): string {
        return this._BASE_URL.value
    }

    public get DISABLE_RATE_LIMITING(): boolean {
        return this._DISABLE_RATE_LIMITING.value
    }

    public get RATE_LIMITING_BLOCK_DURATION(): number {
        return this._RATE_LIMITING_BLOCK_DURATION.value
    }

    public get DISABLE_DISCORD_BOT(): boolean {
        return this._DISABLE_DISCORD_BOT.value
    }

    public get SERVE_STATIC(): boolean {
        return this._SERVE_STATIC.value
    }
}

export let OPT = new RestOptions()

class Configuration {
    HMAC_KEY: string

    constructor() {
        this.HMAC_KEY = OPT.PRODUCTION ? readFileSync(FILE_PATH.hmacKey, { encoding: 'utf8' }) : "randomKey"
    }
}

export let CONF = new Configuration()

