import {Validator} from './Validator';
import {ValidationResult} from '../ValidationResult';
import {ValidationContext} from '../ValidationContext'

export class LengthValidator extends Validator {
  private min:number;
  private max:number;

  constructor(min:number, max?:number) {
    super();
    this.min = min;
    this.max = max;
  }

  public async validate(context:ValidationContext): Promise<ValidationResult> {
    var ok:boolean;
    
    if (this.max === undefined)
      ok = context.value.toString().length <= this.min
    else
      ok = context.value.toString().length >= this.min &&
           context.value.toString().length <= this.max;

    if (!ok)
      return this.failure("Error");

    return this.success();
  }
}