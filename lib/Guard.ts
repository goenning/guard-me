import {Assertion} from './Assertion';
import {ExpressionProperty} from './ExpressionProperty';

export interface Ensurer<T> {
  (check: (value:any) => Assertion, object:T): void;
}

export class CheckResult {
  public valid:boolean;
  public messages:string[]

  constructor() {
    this.valid = true
    this.messages = []
  }

  addMessage(message:string) {
    this.valid = false
    this.messages.push(message)
  }

  addMessages(messages:string[]) {
    this.valid = false
    for(var message of messages)
      this.addMessage(message)
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
    for(var propt in object){
      object[propt] = new ExpressionProperty(propt, object[propt]);
    }

    if (this._ensureFunc) {
      this._ensureFunc((property:any) => {
        var assert = new Assertion(property);
        this._assertions.push(assert);
        return assert;
      }, object)
    }

    var checkResult = new CheckResult()
    for(var assertion of this._assertions) {
      var assertResult = await assertion.resolve()
      if (!assertResult.success) {
        for(var failure of assertResult.failures) {
          checkResult.addMessage(failure.message);
        }
      }
    }

    for(var propt in object){
      object[propt] = object[propt].value;
    }

    return checkResult
  }
}