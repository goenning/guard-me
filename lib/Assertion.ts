import {ValidationContext} from './ValidationContext';
import {ValidationRule} from './ValidationRule';
import {ValidationResult} from './ValidationResult';
import * as validators from './validators';

export class Assertion {
  private _rule: ValidationRule;
  private _context: ValidationContext;

  constructor(actual:any) {
      this._context = new ValidationContext(actual);
      this._rule = new ValidationRule(this._context);
  }

  message(text:string) {
    return this;
  }

  custom(fn:(actual:any) => Promise<boolean>): Assertion {
    this._rule.addValidator(new validators.CustomValidator(this._context, fn));
    return this;
  }

  equal(expected:any): Assertion {
    this._rule.addValidator(new validators.EqualValidator(this._context, expected));
    return this;
  }

  length(min:number, max?:number): Assertion {
    this._rule.addValidator(new validators.LengthValidator(this._context, min, max));
    return this;
  }

  async resolve(): Promise<ValidationResult> {
    return await this._rule.validate();
  }
}