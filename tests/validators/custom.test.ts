import {ValidationContext} from "../../lib"
import {CustomValidator, CustomValidationFunction} from "../../lib/validators/CustomValidator"
import {fail, ok} from "./testcase"

describe("Custom Validator", function() {

  let isGreeting = function(text: any): boolean {
    return text === "Hi" || text === "Hello";
  }

  let throwError = function(text: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        if (text === "Boom")
          reject(new Error());
        else
          resolve(true);
      }, 50)
    })
  }

  let custom = (fn: CustomValidationFunction) => {
    return (context: ValidationContext) => {
      return new CustomValidator(context, fn)
    }
  }

  ok(`Hi is a greeting`, "Hi", custom(isGreeting))
  ok(`Hello will not throw an error`, "Hello", custom(throwError))
  fail(`Star Wars is not a greeting`, "Star Wars", custom(isGreeting))
  fail(`Boom will throw an error`, "Boom", custom(throwError))

})