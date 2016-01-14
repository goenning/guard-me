export class ValidationFailure {
  private _message: string;

  public get message(): string {
    return this._message;
  }

  constructor(message: string) {
    this._message = message;
  }
}

export class ValidationResult {
  private _success:boolean;
  private _failures: ValidationFailure[];

  constructor() {
    this._success = true;
    this._failures = [];
  }

  public get success(): boolean {
    return this._success;
  }

  public get failures(): ValidationFailure[] {
    return this._failures;
  }

  public addFailure(failure: ValidationFailure) {
    this._success = false;
    this._failures.push(failure);
  }

  public addFailures(failures: ValidationFailure[]) {
    for(var failure of failures) {
      this.addFailure(failure);
    }
  }
}