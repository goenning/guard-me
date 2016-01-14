import {Validator} from './validators/Validator';
import {ValidationContext} from './ValidationContext';
import {ValidationResult, ValidationFailure} from './ValidationResult';

export class ValidationRule {
  private _validators:Validator[];
  private _context:ValidationContext;

  constructor(context:ValidationContext) {
    this._validators = [];
    this._context = context;
  }

  public addValidator(validator:Validator) {
    this._validators.push(validator);
  }

  public setMessageFormat(message:string) {
    if (this._validators.length > 0) {
      this._validators[this._validators.length-1].setMessageFormat(message);
    }
  }

  public async validate():Promise<ValidationResult> {
    var ruleResult = new ValidationResult();
    for(var validator of this._validators) {
      var result = await validator.validate(this._context);
      if (!result.success) {
        ruleResult.addFailures(result.failures);
      }
    }
    return ruleResult;
  }
}