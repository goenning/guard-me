import {Validator} from "./Validator";
import {ValidationResult} from "../ValidationResult";
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash";

export class LengthValidator extends Validator {
  private min: number;
  private max: number;
  private noMin: boolean;

  constructor(context: ValidationContext, min: number, max: number) {
    super(context);
    this.min = (min === undefined ? 0 : min);
    this.max = max;
    this.noMin = (this.min === 0);
  }

  public defaultMessageFormat(): string {
    if (_.isArray(this._context.value)) {
      return (this.noMin)
        ? "{PropertyName} should have no more than {1} elements"
        : "{PropertyName} should have between {0} and {1} elements";
    } else {
      return (this.noMin)
        ? "{PropertyName} should have no more than {1} characters"
        : "{PropertyName} should have between {0} and {1} characters";
    }
  }

  public args() {
    return [this.min, this.max];
  }

  public validate(): ValidationResult {
    let length = (_.isArray(this._context.value))
      ? this._context.value.length
      : this._context.value.length;

    let ok = length >= this.min && length <= this.max;

    if (!ok)
      return this.failure();

    return this.success();
  }
}