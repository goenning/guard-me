import {
  ValidationRule,
  ValidationContext,
  ExpressionProperty
} from '../../lib';

import {Validator} from '../../lib/validators/Validator';
import {expect} from 'chai';

export interface TestCaseItem {
  value: any,
  success: boolean,
  errors?: {
    property: string,
    message: string
  }[]
  createValidator(context: ValidationContext): Validator,
}

export function ok(
  testName: string,
  value: any,
  createValidator: (context: ValidationContext) => Validator) {

  it(testName, async () => {
    let item: TestCaseItem = {
      value: value,
      success: true,
      errors: [],
      createValidator: createValidator,
    }
    await testCase(item)
  });

}

export function fail(
  testName: string,
  value: any,
  createValidator: (context: ValidationContext) => Validator,
  errors: {
    property: string,
    message: string
  }[]) {

  it(testName, async () => {
    let item: TestCaseItem = {
      value: value,
      success: false,
      errors: errors,
      createValidator: createValidator,
    }
    await testCase(item)
  });

}

export async function testCase(item: TestCaseItem) {
  var property = new ExpressionProperty('value', item.value)
  var context = new ValidationContext(property);
  var rule = new ValidationRule(context);
  rule.addValidator(item.createValidator(context));
  var result = await rule.validate();

  expect(result.success).to.be.equal(item.success);

  if (item.success === false && item.errors.length > 0) {
    expect(result.failures.length).to.be.equal(item.errors.length);
    for (let error of item.errors) {
      expect(result.failures[0].property).to.be.equal(error.property);
      expect(result.failures[0].message).to.be.equal(error.message);
    }
  }
};