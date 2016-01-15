import {Validator} from "./Validator";
import {ValidationResult} from "../ValidationResult";
import {ValidationContext} from "../ValidationContext"

export interface CustomValidationFunction {
  (value: any): Promise<boolean> | boolean;
}

export class CustomValidator extends Validator {
  private custom: CustomValidationFunction;

  constructor(context: ValidationContext, custom: CustomValidationFunction) {
    super(context);
    this.custom = custom;
  }

  public defaultMessageFormat(): string {
    return "Custom validation failed.";
  }

  public args() {
    return [];
  }

  public async validate(): Promise<ValidationResult> {
    try {
      let ok = await this.custom(this._context.value);
      if (!ok)
        return this.failure();
    } catch (e) {
      return this.failure();
    }

    return this.success();
  }
}