export class ExpressionProperty {
  private _propertyName:string;
  private _value:any;

  constructor(propertyName:string, value:any) {
    this._propertyName = propertyName;
    this._value = value;
  }

  public get propertyName() {
    return this._propertyName;
  }

  public get value() {
    return this._value;
  }
}