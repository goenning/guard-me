import {ValidationResult, ValidationFailure} from '../ValidationResult'
import {ValidationContext} from '../ValidationContext'

export abstract class Validator {
  public abstract validate(context:ValidationContext): Promise<ValidationResult>;

  protected success() {
    return new ValidationResult();
  }

  protected failure(message:string) {
    var result = new ValidationResult();
    result.addFailure(new ValidationFailure(message));
    return result;
  }
}