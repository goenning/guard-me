import {ValidationResult, ValidationFailure} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash";

export abstract class Validator {
  private _messageFormat: string
  private _messageFormatFunction: () => string | Promise<string>
  protected _context: ValidationContext

  constructor(context: ValidationContext) {
    this._context = context
  }

  public async getMessageFormat(): Promise<string> {
    if (this._messageFormat !== undefined)
      return this._messageFormat

    if (this._messageFormatFunction !== undefined)
      return this._messageFormatFunction()

    return this.defaultMessageFormat()
  }

  public setMessageFormat(format: string | (() => string | Promise<string>)): Validator {
    if (typeof format === "string")
      this._messageFormat = format
    else
      this._messageFormatFunction = format
    return this
  }

  public abstract defaultMessageFormat(): string
  public abstract args(): any[]
  public abstract check(): Promise<Boolean> | Boolean

  public async validate(): Promise<ValidationResult> {
    let ok = await this.check()
    if (ok)
      return this.success()
    else
      return await this.failure()
  }

  protected success() {
    return new ValidationResult()
  }

  protected async failure() {
    let message = await this.getMessageFormat()
    message = message.replace(`{PropertyName}`, _.capitalize(this._context.property.displayName))

    let args = this.args()
    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {

        let arg = args[i]
        if (_.isObject(arg))
          arg = JSON.stringify(arg)

        message = message.replace(`{${i}}`, arg)
      }
    }

    let result = new ValidationResult()
    result.addFailure(new ValidationFailure(this._context.property.name, message))
    return result
  }
}