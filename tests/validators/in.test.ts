import {ValidationContext} from "../../lib"
import {InValidator} from "../../lib/validators/InValidator"
import {fail, ok} from "./testcase"

describe("In Validator", function() {

  let isIn = (values: any) => {
    return (context: ValidationContext) => {
      return new InValidator(context, values)
    }
  }

  ok(`"Star Wars" is in ("Star Wars", "Star Trek")`, "Star Wars", isIn(["Star Wars", "Star Trek"]))
  ok(`1 is in (1, 2, 3)`, 1, isIn([1, 2, 3]))

  fail(`1 is not in ()`, 1, isIn([]), [
    { property: "value", message: "Value must be inside []" }
  ])

  fail(`1 is not in (2, 3)`, 1, isIn([2, 3]), [
    { property: "value", message: "Value must be inside [2,3]" }
  ])

  fail(`1 is not in {}`, 1, isIn({}), [
    { property: "value", message: "Value must be inside []" }
  ])

  fail(`1 is not in undefined`, 1, isIn(undefined), [
    { property: "value", message: "Value must be inside []" }
  ])
})