import { EnvVar } from './EnvVar'
import { existsSync, readFileSync } from 'fs'


export class Options {
  private _PRODUCTION: EnvVar<boolean>
  private _STAGING: EnvVar<boolean>
  private _DOCKER: EnvVar<boolean>

  constructor() {
      // Default values are production configuration
      this._PRODUCTION = new EnvVar(process.env.PRODUCTION, false)
      this._STAGING = new EnvVar(process.env.STAGING, false)

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
  }

  public get PRODUCTION(): boolean {
      return this._PRODUCTION.value
  }

  public get STAGING(): boolean {
      return this._STAGING.value
  }

  public get DOCKER(): boolean {
      return this._DOCKER.value
  }

  public jsonify() {
      return JSON.stringify(this, null, 4)
  }
}
