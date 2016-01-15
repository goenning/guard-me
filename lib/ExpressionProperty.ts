import * as _ from 'lodash';

export class ExpressionProperty {
  private _propertyName:string;
  private _value:any;

  constructor(value:any, propertyName?:string) {
    this._value = value;
    this._propertyName = propertyName;
  }

  public get propertyName() {
    return this._propertyName;
  }

  public get value() {
    return this._value;
  }
}