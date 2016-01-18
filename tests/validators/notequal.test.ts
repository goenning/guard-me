import {ValidationContext} from "../../lib"
import {NotEqualValidator} from "../../lib/validators/NotEqualValidator"
import {fail, ok} from "./testcase"

describe("NotEqual Validator", function() {

  let notEqual = (value: any) => {
    return (context: ValidationContext) => {
      return new NotEqualValidator(context, value)
    }
  }

  ok(`1 != "1"`, 1, notEqual("1"))
  ok(`"Star Wars" != "Star Trek"`, "Star Wars", notEqual("Star Trek"))
  ok(`{ bar:"bar" } != { foo:"bar" }`, { bar: "bar" }, notEqual({ foo: "bar" }))

  fail(`"Star Wars" == "Star Wars"`, "Star Wars", notEqual("Star Wars"), [
    { property: "value", message: `Value must not be equal to Star Wars` }
  ])

  fail(`1 == 1`, 1, notEqual(1), [
    { property: "value", message: `Value must not be equal to 1` }
  ])

  fail(`1.2 == 1.2`, 1.2, notEqual(1.2), [
    { property: "value", message: `Value must not be equal to 1.2` }
  ])

  fail(`{ bar:"bar" } == { bar:"bar" }`, { bar: "bar" }, notEqual({ bar: "bar" }), [
    { property: "value", message: `Value must not be equal to {"bar":"bar"}` }
  ])

})