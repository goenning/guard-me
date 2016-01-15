import {Validator} from "./validators/Validator";
import {ValidationContext} from "./ValidationContext";
import {ValidationResult, ValidationFailure} from "./ValidationResult";

export class ValidationRule {
  private _validators: Validator[];
  private _context: ValidationContext;

  constructor(context: ValidationContext) {
    this._validators = [];
    this._context = context;
  }

  public addValidator(validator: Validator) {
    this._validators.push(validator);
  }

  public async validate(): Promise<ValidationResult> {
    let ruleResult = new ValidationResult();
    for (let validator of this._validators) {
      let result = await validator.validate(this._context);
      if (!result.success) {
        ruleResult.addFailures(result.failures);
      }
    }
    return ruleResult;
  }
}