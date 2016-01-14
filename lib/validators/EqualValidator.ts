import {Validator} from './Validator';
import {ValidationResult} from '../ValidationResult';
import {ValidationContext} from '../ValidationContext'
import * as _ from 'lodash';

export class EqualValidator extends Validator {
  private expected:any;

  constructor(expected:any) {
    super();
    this.expected = expected;
  }

  public async validate(context:ValidationContext): Promise<ValidationResult> {
    var equal = _.isEqual(context.value, this.expected);
    if (!equal)
      return this.failure("Error");

    return this.success();
  }
}