import {Validator} from "./Validator"
import {ValidationResult} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash"

export class RequiredValidator extends Validator {
  private expected: any

  constructor(context: ValidationContext) {
    super(context)
  }

  public defaultMessageFormat(): string {
    return "{PropertyName} is required"
  }

  public args() {
    return [ ]
  }

  public validate(): ValidationResult {
    let emptyArray = _.isArray(this._context.value) && this._context.value.length === 0
    let empty = !this._context.value

    if (emptyArray || empty) {
      return this.failure()
    }

    return this.success()
  }
}