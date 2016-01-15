export class ValidationFailure {
  private _message: string;
  private _property: string;

  public get message(): string {
    return this._message;
  }

  public get property(): string {
    return this._property;
  }

  constructor(property: string, message: string) {
    this._message = message;
    this._property = property;
  }
}

export class ValidationResult {
  private _success: boolean;
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
    for (var failure of failures) {
      this.addFailure(failure);
    }
  }
}