import { readFileSync, existsSync } from 'fs'
import { FILE_PATH } from 'backend/lib/constants'
import { Options } from '../../Options'

class DatabaseOptions extends Options  {

    constructor() {
        super()
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

