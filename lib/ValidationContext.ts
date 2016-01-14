export class ValidationContext {
  private _name: string;
  private _value: any;

  constructor(value: any, name?:string){
    this._value = value;
    this._name = name;
  }

  public get value(): any {
    return this._value;
  }

  public get name(): any {
    return this._name;
  }
}