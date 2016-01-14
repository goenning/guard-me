import {Validator} from './Validator';
import {ValidationResult} from '../ValidationResult';
import {ValidationContext} from '../ValidationContext'

export class CustomValidator extends Validator {
  private custom:(value:any) => Promise<boolean>;

  constructor(context:ValidationContext, custom:(value:any) => Promise<boolean>) {
    super(context);
    this.custom = custom;
  }

  public defaultMessageFormat():string {
    return "Custom validation failed.";
  }

  public args() {
    return [ this._context.value ];
  }

  public async validate(): Promise<ValidationResult> {
    var ok = await this.custom(this._context.value);
    if (!ok)
      return this.failure();

    return this.success();
  }
}