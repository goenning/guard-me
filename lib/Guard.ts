import {Assertion} from './Assertion';

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
    if (this._ensureFunc) {
      this._ensureFunc((value:any) => {
        var assert = new Assertion(value);
        this._assertions.push(assert);
        return assert;
      }, object)
    }

    var checkResult = new CheckResult()
    for(var assertion of this._assertions) {
      var assertResult = await assertion.resolve()
      if (!assertResult.valid)
        checkResult.addMessages(assertResult.messages)
    }

    return checkResult
  }
}