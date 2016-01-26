import {Assertion} from "./Assertion"
import {Guard} from "./Guard"
import {ValidationRule} from "./ValidationRule"
import {ValidationResult, ValidationFailure} from "./ValidationResult"
import {Validator} from "./validators/Validator"
import {ValidationContext} from "./ValidationContext"
import {PropertyWrapper} from "./PropertyWrapper"
import * as validators from "./validators/"

/* istanbul ignore next */
global["__awaiter"] = function(thisArg, _arguments, Promise, generator) {
  return new Promise(function(resolve, reject) {
    generator = generator.call(thisArg, _arguments)
    function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function(resolve) { resolve(value) }) }
    function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
    function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
    function step(verb, value) {
      let result = generator[verb](value)
      result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject)
    }
    step("next", void 0);
  })
}

export interface Ensurer {
  (check: (value: any, name?: string) => Assertion, object: any): void
}

export var ensure = {
  _currentLocale: "en-US",
  _messages: undefined,

  that: (fn?: Ensurer) => {
    let messages = { validators: {} }

    try {
      messages = JSON.parse(JSON.stringify(require(`./locale/${ensure._currentLocale}.json`)))
    } catch (e) {
      messages = JSON.parse(JSON.stringify(require(`./locale/en-US.json`)))
    }

    if (ensure._messages !== undefined) {
      for (let attr in ensure._messages) {
        messages.validators[attr] = ensure._messages[attr]
      }
    }
    return new Guard(fn, messages)
  },

  setLocale: (locale: string) => {
    ensure._messages = undefined
    ensure._currentLocale = locale
  },

  setMessages: (messages: {}) => {
    ensure._messages = messages
  }
}

export {
Assertion,
Guard,
ValidationRule,
ValidationResult,
ValidationFailure,
ValidationContext,
PropertyWrapper,
validators
}