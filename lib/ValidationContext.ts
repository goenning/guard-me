export class ValidationContext {
  private _value: any;
  constructor(value: any){
    this._value = value;
  }

  public get value(): any {
    return this._value;
  }
}