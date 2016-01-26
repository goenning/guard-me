import {ValidationContext} from "./ValidationContext"
import {ValidationRule} from "./ValidationRule"
import {ValidationResult} from "./ValidationResult"
import {PropertyWrapper} from "./PropertyWrapper"
import * as validators from "./validators"

export class Assertion {
  private _rule: ValidationRule
  private _context: ValidationContext
  private _lastValidator: validators.Validator

  public constructor(property: PropertyWrapper) {
    this._context = new ValidationContext(property, require("./locale/en-US.json"))
    this._rule = new ValidationRule(this._context)
  }

  public message(messageFormat: string | (() => string | Promise<string>)) {
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

  public matches(regexp: RegExp): Assertion {
    return this.addValidator(new validators.MatchesValidator(this._context, regexp))
  }

  public isEmail(): Assertion {
    return this.addValidator(new validators.MatchesValidator(this._context, /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))
  }

  public notEqual(expected: any): Assertion {
    return this.addValidator(new validators.NotEqualValidator(this._context, expected))
  }

  public required(): Assertion {
    return this.addValidator(new validators.RequiredValidator(this._context))
  }

  public greaterThan(value: number, inclusive?: boolean): Assertion {
    return this.addValidator(new validators.GreaterThanValidator(this._context, value, inclusive))
  }

  public lessThan(value: number, inclusive?: boolean): Assertion {
    return this.addValidator(new validators.LessThanValidator(this._context, value, inclusive))
  }

  public isIn(array: any[]): Assertion {
    return this.addValidator(new validators.InValidator(this._context, array))
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