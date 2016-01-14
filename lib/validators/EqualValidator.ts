import {Validator} from './Validator';
import {ValidationResult} from '../ValidationResult';
import {ValidationContext} from '../ValidationContext'
import * as _ from 'lodash';

export class EqualValidator extends Validator {
  private expected:any;

  constructor(context:ValidationContext, expected:any) {
    super(context);
    this.expected = expected;
  }

  public defaultMessageFormat():string {
    return "{0} should equal {1}";
  }

  public args() {
    return [ this._context.name, this.expected ];
  }

  public async validate(): Promise<ValidationResult> {
    var equal = _.isEqual(this._context.value, this.expected);
    if (!equal)
      return this.failure();

    return this.success();
  }
}