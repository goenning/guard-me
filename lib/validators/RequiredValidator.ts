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
    return this._context.getMessage("validators.required")
  }

  public args() {
    return []
  }

  public check() {
    let emptyArray = _.isArray(this._context.value) && this._context.value.length === 0
    let empty = !this._context.value

    return !(emptyArray || empty)
  }
}