import {Validator} from "./Validator";
import {ValidationResult} from "../ValidationResult";
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash";

export class NotEqualValidator extends Validator {
  private expected: any;

  constructor(context: ValidationContext, expected: any) {
    super(context);
    this.expected = expected;
  }

  public defaultMessageFormat(): string {
    return "{PropertyName} must not be equal to {0}";
  }

  public args() {
    return [this.expected];
  }

  public check() {
    return !_.isEqual(this._context.value, this.expected);
  }
}