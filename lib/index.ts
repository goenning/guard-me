import {Assertion} from "./Assertion";
import {ensure, Guard} from "./Guard";
import {ValidationRule} from "./ValidationRule";
import {ValidationResult, ValidationFailure} from "./ValidationResult";
import {Validator} from "./validators/Validator";
import {ValidationContext} from "./ValidationContext";
import {ExpressionProperty} from "./ExpressionProperty";
import * as validators from "./validators/";

/* istanbul ignore next */
global["__awaiter"] = function(thisArg, _arguments, Promise, generator) {
  return new Promise(function(resolve, reject) {
    generator = generator.call(thisArg, _arguments);
    function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function(resolve) { resolve(value); }); }
    function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
    function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
    function step(verb, value) {
      let result = generator[verb](value);
      result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
    }
    step("next", void 0);
  });
};

export {
Assertion,
ensure,
Guard,
ValidationRule,
ValidationResult,
ValidationFailure,
ValidationContext,
ExpressionProperty,
validators
}