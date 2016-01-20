import {Validator} from "./Validator"
import {ValidationResult} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash"

export class InValidator extends Validator {
  private array: any[]

  constructor(context: ValidationContext, array: any[]) {
    super(context)
    this.array = array
    if (!this.array || _.isEmpty(this.array)) {
      this.array = []
    }
  }

  public defaultMessageFormat(): string {
    return "{PropertyName} must be inside {0}"
  }

  public args() {
    return [this.array]
  }

  public check() {
    return this.array.indexOf(this._context.value) >= 0
  }
}