import {ValidationContext} from "../../lib"
import {GreaterThanValidator} from "../../lib/validators/GreaterThanValidator"
import {fail, ok} from "./testcase"

describe("GreaterThan Validator", function() {

  let greaterThan = (value: number, inclusive?: boolean) => {
    return (context: ValidationContext) => {
      return new GreaterThanValidator(context, value, inclusive)
    }
  }

  ok(`5 is greater than 3`, 5, greaterThan(3))
  ok(`4 is greater than or equal to 4`, 4, greaterThan(4, true))

  fail(`2 is not greater than 3`, 2, greaterThan(3), [
    { property: "value", message: "Value must be greater than 3" }
  ])

  fail(`2 is not greater than 3`, 2, greaterThan(3, true), [
    { property: "value", message: "Value must be greater than or equal to 3" }
  ])
})