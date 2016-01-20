import {Validator} from "./Validator"
import {ValidationResult} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash"

export class MatchesValidator extends Validator {
  private regexp: RegExp

  constructor(context: ValidationContext, regexp: RegExp) {
    super(context)
    this.regexp = regexp
  }

  public defaultMessageFormat(): string {
    return "{PropertyName} must match {0}"
  }

  public args() {
    return [this.regexp.toString()]
  }

  public check() {
    return this.regexp.test(this._context.value)
  }
}