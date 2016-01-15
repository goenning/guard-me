import {ExpressionProperty} from "./ExpressionProperty";

export class ValidationContext {
  private _property: ExpressionProperty;
  private _value: any;

  constructor(property: ExpressionProperty) {
    this._value = property.value;
    this._property = property;
  }

  public get value(): any {
    return this._value;
  }

  public get property(): ExpressionProperty {
    return this._property;
  }
}