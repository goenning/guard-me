export class AssertionResult {
  public valid:boolean;
  public messages:string[]

  constructor() {
    this.valid = true;
    this.messages = [];
  }

  addMessage(message:string) {
    this.valid = false;
    this.messages.push(message);
  }
}

export class Assertion {
  private _actual: any;
  private _messages: string[];
  private _assertions: { (): Promise<boolean> }[];
  private _lastArgs:any[];

  constructor(actual:any) {
      this._actual = actual;
      this._messages = [ ];
      this._assertions = [ ];
  }

  message(text:string) {
    var index = this._assertions.length - 1;
    if (this._lastArgs) {
      for(var i=0;i<this._lastArgs.length;i++) {
        text = text.replace(`{${i}}`, this._lastArgs[i])
      }
    }
    this._messages[index] = text;
    return this;
  }

  custom(fn:(actual:any) => Promise<boolean>): Assertion {
    this._assertions.push(async () => {
      return await fn(this._actual);
    })
    return this;
  }

  equal(expected:any): Assertion {
    this._lastArgs = [this._actual, expected];
    this._assertions.push(async () => {
      return this._actual === expected;
    })
    this.message("{0} should be {1}.")
    return this;
  }

  length(min:number, max?:number): Assertion {
    this._lastArgs = [this._actual, min, max];
    this._assertions.push(async () => {
      return this._actual.toString().length >= min &&
             (max === undefined || this._actual.toString().length <= max);
    })
    if (max)
      this.message("'{0}' should have between {1} and {2} characters.")
    else
      this.message("'{0}' should have more than {1} characters.")
    return this;
  }

  async resolve(): Promise<AssertionResult> {
    var assertionResult = new AssertionResult()
    for(var i=0;i<this._assertions.length;i++){
      var assertion = this._assertions[i];
      var result = await assertion()
      if (!result)
        assertionResult.addMessage(this._messages[i])
    }
    return assertionResult;
  }
}