import {Assertion} from './Assertion';
import {ExpressionProperty} from './ExpressionProperty';
import * as _ from 'lodash';

export interface Ensurer<T> {
  (check: (value:any) => Assertion, object:T): void;
}

export function ensure<T>( fn?: Ensurer<T> ): Guard<T> {
  return new Guard<T>(fn);
}

export class CheckResult {
  public valid:boolean;
  public errors:{ property:string, messages:string[] }[]

  constructor() {
    this.valid = true
    this.errors = []
  }

  addMessage(property:string, message:string) {
    this.valid = false
    this.errors.push({
      property,
      messages: [ message ]
    })
  }

  addMessages(property:string, messages:string[]) {
    this.valid = false
    for(var message of messages) {
      this.errors.push({
        property,
        messages: [ message ]
      })
    }
  }
}

export class Guard<T> {
  private _ensureFunc: Ensurer<T>;
  private _assertions: Assertion[];

  constructor(fn: Ensurer<T>) {
    this._ensureFunc = fn;
    this._assertions = [];
  }

  async check(object:T): Promise<CheckResult> {
    let hijacked = false;
    if (_.isPlainObject(object)) {
      hijacked = true;
      for(var propt in object){
        object[propt] = new ExpressionProperty(object[propt], propt);
      }
    }

    if (this._ensureFunc) {
      this._ensureFunc((value:any) => {
        if (!hijacked)
          value = new ExpressionProperty(value);

        var assert = new Assertion(value);
        this._assertions.push(assert);
        return assert;
      }, object)
    }

    var checkResult = new CheckResult()
    for(var assertion of this._assertions) {
      var assertResult = await assertion.resolve()
      if (!assertResult.success) {
        for(var failure of assertResult.failures) {
          checkResult.addMessage(failure.property, failure.message);
        }
      }
    }

    if (hijacked) {
      for(var propt in object){
        object[propt] = object[propt].value;
      }
    }

    return checkResult
  }
}