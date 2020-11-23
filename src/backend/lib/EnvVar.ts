import { Optional } from "lib/optional"

export class EnvVar<T> {
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
      else if (evar && typeof defaultValue === 'number') {
          this._isSet = true
          try {
              this.value = <T><unknown>parseInt(evar)
          }
          catch(err) {
              console.error("environment variable is not a number!")
              process.exit(1)
          }
      }
  }

  public get isSet(): boolean {
      return this._isSet
  }

  public setIfNotSet(value: T) {
      if (!this._isSet)
          this.value = value
  }
}
