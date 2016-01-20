import {ValidationContext} from "../../lib"
import {MatchesValidator} from "../../lib/validators/MatchesValidator";
import {fail, ok} from "./testcase"

describe("Matches Validator", function() {

  let matches = (regexp: RegExp) => {
    return (context: ValidationContext) => {
      return new MatchesValidator(context, regexp)
    }
  }

  ok(`1 matches [0-9]`, "1", matches(/[0-9]/))
  ok(`123 matches [0-9]`, "123", matches(/[0-9]/))
  fail(`ABC does not match [0-9]`, "ABC", matches(/[0-9]/), [
    { property: "value", message: "Value must match /[0-9]/" }
  ])

})