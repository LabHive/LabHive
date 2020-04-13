import { readFileSync, existsSync } from 'fs'
import { FILE_PATH } from './constants'
import Mail from 'nodemailer/lib/mailer'
import { IUserAdmin } from './database/schemas/IUserAdmin'

class EnvVar<T> {
    private _isSet: boolean = false
    value: T

    constructor(evar: Optional<string>, defaultValue: T) {
        this.value = defaultValue

        if (evar && typeof defaultValue === 'string') {
            this._isSet = true
            this.value = <T><unknown>evar
        }
        else if (evar && typeof defaultValue === 'boolean') {
            this._isSet = true
            this.value = <T><unknown>(evar === '1' || evar.toLowerCase() === 'true')
        }
    }

    public get isSet(): boolean {
        return this._isSet
    }
}

class Options {
    private _ENABLE_MAIL: EnvVar<boolean>
    private _PRODUCTION: EnvVar<boolean>
    private _DISABLE_VERIFICATION: EnvVar<boolean>
    private _BASE_URL: EnvVar<string>

    constructor() {
        this._ENABLE_MAIL = new EnvVar(process.env.ENABLE_MAIL, false)
        this._PRODUCTION = new EnvVar(process.env.PRODUCTION, false)
        this._DISABLE_VERIFICATION = new EnvVar(process.env.DISABLE_VERIFICATION, false)
        this._BASE_URL = new EnvVar(process.env.BASE_URL, "")
        
        if (this.PRODUCTION && !this._ENABLE_MAIL.isSet) {
            this._ENABLE_MAIL.value = true
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
    }

    public get ENABLE_MAIL(): boolean {
        return this._ENABLE_MAIL.value
    }

    public get PRODUCTION(): boolean {
        return this._PRODUCTION.value
    }

    public get DISABLE_VERIFICATION(): boolean {
        return this._DISABLE_VERIFICATION.value
    }

    public get BASE_URL(): string {
        return this._BASE_URL.value
    }
}

export let OPT = new Options()

class Configuration {
    HMAC_KEY: string
    MAIL_CONFIG: Mail.Options
    ADMIN_USER?: IUserAdmin

    constructor() {
        this.HMAC_KEY = OPT.PRODUCTION ? readFileSync(FILE_PATH.hmacKey, { encoding: 'utf8' }) : "randomKey"
        this.MAIL_CONFIG = OPT.ENABLE_MAIL ? JSON.parse(readFileSync(FILE_PATH.mailConfig, { encoding: 'utf8' })) : undefined

        if (!existsSync(FILE_PATH.adminUser)) {
            console.error("No admin user configuration found!")
            console.error("Create an admin user in secret/adminUser.json")
        } else {
            this.ADMIN_USER = JSON.parse(readFileSync(FILE_PATH.adminUser, { encoding: "utf8" }))
        }
    }
}

export let CONF = new Configuration()

