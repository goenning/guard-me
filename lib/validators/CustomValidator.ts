import {Validator} from "./Validator"
import {ValidationResult} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"

export interface CustomValidationFunction {
  (value: any): Promise<boolean> | boolean
}

export class CustomValidator extends Validator {
  private custom: CustomValidationFunction

  constructor(context: ValidationContext, custom: CustomValidationFunction) {
    super(context)
    this.custom = custom
  }

  public defaultMessageFormat(): string {
    return this._context.getMessage("validators.custom")
  }

  public args() {
    return []
  }

  public async check() {
    try {
      return await this.custom(this._context.value)
    } catch (e) {
      return false
    }
  }
}