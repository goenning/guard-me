import {ValidationResult, ValidationFailure} from "../ValidationResult"
import {ValidationContext} from "../ValidationContext"
import * as _ from "lodash";

export abstract class Validator {
  private _messageFormat: string;
  protected _context: ValidationContext;

  constructor(context: ValidationContext) {
    this._context = context;
  }

  public get messageFormat(): string {
    if (this._messageFormat === undefined)
      return this.defaultMessageFormat();
    return this._messageFormat;
  }

  public setMessageFormat(format: string): Validator {
    this._messageFormat = format;
    return this;
  }

  public abstract defaultMessageFormat(): string;
  public abstract args(): any[];
  public abstract validate(context: ValidationContext): Promise<ValidationResult> | ValidationResult;

  protected success() {
    return new ValidationResult();
  }

  protected failure() {
    let message: string = this.messageFormat;
    message = message.replace(`{PropertyName}`, _.capitalize(this._context.property.displayName));

    let args = this.args();
    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {

        let arg = args[i];
        if (_.isObject(arg))
          arg = JSON.stringify(arg);

        message = message.replace(`{${i}}`, arg);
      }
    }

    let result = new ValidationResult();
    result.addFailure(new ValidationFailure(this._context.property.name, message));
    return result;
  }
}