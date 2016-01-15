import {ValidationContext} from "./ValidationContext"
import {ValidationRule} from "./ValidationRule"
import {ValidationResult} from "./ValidationResult"
import {ExpressionProperty} from "./ExpressionProperty"
import * as validators from "./validators"

export class Assertion {
  private _rule: ValidationRule
  private _context: ValidationContext
  private _lastValidator: validators.Validator

  public constructor(property: ExpressionProperty) {
    this._context = new ValidationContext(property)
    this._rule = new ValidationRule(this._context)
  }

  public message(messageFormat: string) {
    if (this._lastValidator !== undefined) {
      this._lastValidator.setMessageFormat(messageFormat)
    }
    return this
  }

  public must(fn: (actual: any) => Promise<boolean>): Assertion {
    return this.addValidator(new validators.CustomValidator(this._context, fn))
  }

  public equal(expected: any): Assertion {
    return this.addValidator(new validators.EqualValidator(this._context, expected))
  }

  public notEqual(expected: any): Assertion {
    return this.addValidator(new validators.NotEqualValidator(this._context, expected))
  }

  public required(): Assertion {
    return this.addValidator(new validators.RequiredValidator(this._context))
  }

  public length(min: number, max: number): Assertion {
    return this.addValidator(new validators.LengthValidator(this._context, min, max))
  }

  public async resolve(): Promise<ValidationResult> {
    return await this._rule.validate()
  }

  private addValidator(validator: validators.Validator) {
    this._lastValidator = validator
    this._rule.addValidator(validator)
    return this
  }
}