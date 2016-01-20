import {ValidationContext} from "../../lib"
import {LessThanValidator} from "../../lib/validators/LessThanValidator"
import {fail, ok} from "./testcase"

describe("LessThan Validator", function() {

  let lessThan = (value: number, inclusive?: boolean) => {
    return (context: ValidationContext) => {
      return new LessThanValidator(context, value, inclusive)
    }
  }

  ok(`3 is less than 5`, 3, lessThan(5))
  ok(`4 is less than or equal to 4`, 4, lessThan(4, true))

  fail(`3 is not less than 2`, 3, lessThan(2), [
    { property: "value", message: "Value must be less than 2" }
  ])

  fail(`3 is not less than 2`, 3, lessThan(2, true), [
    { property: "value", message: "Value must be less than or equal to 2" }
  ])
})