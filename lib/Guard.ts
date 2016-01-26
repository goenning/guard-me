import {Assertion} from "./Assertion"
import {PropertyWrapper} from "./PropertyWrapper"
import {Ensurer} from "./index"
import * as _ from "lodash"

export class CheckResult {
  public valid: boolean
  public errors: { property: string, messages: string[] }[]

  constructor() {
    this.valid = true
    this.errors = []
  }

  addMessage(property: string, message: string) {
    this.valid = false
    this.errors.push({
      property,
      messages: [message]
    })
  }
}

export class Guard {
  private _ensureFunc: Ensurer;
  private _assertions: Assertion[];
  private _messages: {};

  constructor(fn: Ensurer, messages: {}) {
    this._ensureFunc = fn;
    this._assertions = [];
    this._messages = messages;
  }

  private isClassInstance(object) {
    let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
    return properties.indexOf("__proto__") === -1
  }

  private shadowCopy(obj) {
    let copy = {}
    if (typeof obj === "object") {
      if (this.isClassInstance(obj)) {
        for (let prop of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
          copy[prop] = obj[prop]
        }
      } else {
        for (let prop in obj) {
          copy[prop] = obj[prop]
        }
      }
      for (let prop in obj) {
        copy[prop] = new PropertyWrapper(prop, obj[prop])
      }
    }
    else {
      copy = obj
    }
    return copy
  }

  async check(object: any): Promise<CheckResult> {
    let cloned: any = this.shadowCopy(object)

    if (this._ensureFunc) {
      this._ensureFunc((property: any, name?: string) => {

        if (typeof property !== "object")
          property = new PropertyWrapper("value", property);

        if (name !== undefined)
          property = new PropertyWrapper(property.name, property.value, name);

        let assert = new Assertion(property, this._messages);
        this._assertions.push(assert);
        return assert;

      }, cloned)
    }

    let checkResult = new CheckResult()
    for (let assertion of this._assertions) {
      let assertResult = await assertion.resolve()
      if (!assertResult.success) {
        for (let failure of assertResult.failures) {
          checkResult.addMessage(failure.property, failure.message);
        }
      }
    }

    return checkResult
  }
}