import {PropertyWrapper} from "./PropertyWrapper"

export class ValidationContext {
  private _property: PropertyWrapper
  private _value: any
  private _messages: {}

  constructor(property: PropertyWrapper, messages: {}) {
    this._value = property.value
    this._property = property
    this._messages = messages
  }

  public get value(): any {
    return this._value
  }

  public get property(): PropertyWrapper {
    return this._property
  }

  public getMessage(path: string): string {
    let parts = path.split(".")
    let message = this._messages
    parts.forEach(part => {
      message = message[part]
    })
    return message.toString()
  }
}