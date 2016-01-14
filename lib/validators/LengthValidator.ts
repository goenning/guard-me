import {Validator} from './Validator';
import {ValidationResult} from '../ValidationResult';
import {ValidationContext} from '../ValidationContext'

export class LengthValidator extends Validator {
  private min:number;
  private max:number;

  constructor(context:ValidationContext, min:number, max?:number) {
    super(context);
    this.min = min;
    this.max = max;
  }

  public defaultMessageFormat():string {
    return (this.max) ?
            "{PropertyName} should have between {0} and {1} characters" :
            "{PropertyName} should have more than {0} characters";
  }

  public args() {
    return [ this.min, this.max ];
  }

  public async validate(): Promise<ValidationResult> {
    var ok:boolean;

    if (this.max === undefined)
      ok = this._context.value.toString().length <= this.min
    else
      ok = this._context.value.toString().length >= this.min &&
           this._context.value.toString().length <= this.max;

    if (!ok)
      return this.failure();

    return this.success();
  }
}