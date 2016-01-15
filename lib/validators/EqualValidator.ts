import {Validator} from "./Validator";
import {ValidationResult} from "../ValidationResult";
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash";

export class EqualValidator extends Validator {
  private expected: any;

  constructor(context: ValidationContext, expected: any) {
    super(context);
    this.expected = expected;
  }

  public defaultMessageFormat(): string {
    return "{PropertyName} should be equal to {0}";
  }

  public args() {
    return [this.expected];
  }

  public validate(): ValidationResult {
    let equal = _.isEqual(this._context.value, this.expected);
    if (!equal)
      return this.failure();

    return this.success();
  }
}