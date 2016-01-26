import {
  ValidationRule,
  ValidationContext,
  PropertyWrapper
} from "../../lib";

import {Validator} from "../../lib/validators/Validator";
import {expect} from "chai";

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
  errors?: {
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
  let property = new PropertyWrapper("value", item.value)
  let context = new ValidationContext(property, require("../../lib/locale/en-US.json"));
  let rule = new ValidationRule(context);
  rule.addValidator(item.createValidator(context));
  let result = await rule.validate();

  expect(result.success).to.be.equal(item.success);

  if (item.success === false && item.errors !== undefined) {
    expect(result.failures.length).to.be.equal(item.errors.length);
    for (let error of item.errors) {
      expect(result.failures[0].property).to.be.equal(error.property);
      expect(result.failures[0].message).to.be.equal(error.message);
    }
  }
};