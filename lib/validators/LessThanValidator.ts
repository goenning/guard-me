import {Validator} from "./Validator"
import {ValidationResult} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash"

export class LessThanValidator extends Validator {
  private value: number
  private inclusive: boolean

  constructor(context: ValidationContext, value: number, inclusive?: boolean) {
    super(context);
    this.value = value
    this.inclusive = inclusive
  }

  public defaultMessageFormat(): string {
    if (this.inclusive === true)
      return this._context.getMessage("validators.lessThanOrEqualTo")
    return this._context.getMessage("validators.lessThan")
  }

  public args() {
    return [this.value]
  }

  public check() {
    return (this.inclusive === true)
      ? this._context.value <= this.value
      : this._context.value < this.value
  }
}