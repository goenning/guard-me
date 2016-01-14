export class ValidationContext {
  private _propertyName: string;
  private _value: any;

  constructor(value: any, propertyName?:string){
    this._value = value;
    this._propertyName = (propertyName === undefined) ? 'Value' : propertyName;
  }

  public get value(): any {
    return this._value;
  }

  public get propertyName(): any {
    return this._propertyName;
  }
}