import {PropertyWrapper} from "./PropertyWrapper";

export class ValidationContext {
  private _property: PropertyWrapper;
  private _value: any;
  private _messages: any;

  constructor(property: PropertyWrapper, messages: any) {
    this._value = property.value;
    this._property = property;
    this._messages = messages;
  }

  public get value(): any {
    return this._value;
  }

  public get property(): PropertyWrapper {
    return this._property;
  }

  public getMessage(path: string): string {
    var parts = path.split(".")
    var message = this._messages
    parts.forEach(part => {
      message = message[part]
    })
    return message;
  }
}