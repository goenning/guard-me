import {Assertion} from "./Assertion";
import {ExpressionProperty} from "./ExpressionProperty";
import * as _ from "lodash";

export interface Ensurer<T> {
  (check: (value: any, name?: string) => Assertion, object: T): void;
}

export function ensure<T>(fn?: Ensurer<T>): Guard<T> {
  return new Guard<T>(fn)
}

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

export class Guard<T> {
  private _ensureFunc: Ensurer<T>;
  private _assertions: Assertion[];

  constructor(fn: Ensurer<T>) {
    this._ensureFunc = fn;
    this._assertions = [];
  }

  async check(object: T): Promise<CheckResult> {
    let cloned: any = {};
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(object)))
    if (typeof object === "object") {
      for (let propt in object) {
        cloned[propt] = new ExpressionProperty(propt, object[propt])
      }
    } else {
      cloned = object
    }

    if (this._ensureFunc) {
      this._ensureFunc((property: any, name?: string) => {

        if (typeof property !== "object")
          property = new ExpressionProperty("value", property);

        if (name !== undefined)
          property = new ExpressionProperty(property.name, property.value, name);


        let assert = new Assertion(property);
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