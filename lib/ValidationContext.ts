import {PropertyWrapper} from "./PropertyWrapper";

export class ValidationContext {
  private _property: PropertyWrapper;
  private _value: any;

  constructor(property: PropertyWrapper) {
    this._value = property.value;
    this._property = property;
  }

  public get value(): any {
    return this._value;
  }

  public get property(): PropertyWrapper {
    return this._property;
  }
}