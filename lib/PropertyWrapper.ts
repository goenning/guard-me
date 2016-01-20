import * as _ from "lodash"

export class PropertyWrapper {
  public __isPropertyWrapper: boolean = true
  private _name: string
  private _displayName: string
  private _value: any

  constructor(name: string, value: any, displayName?: string) {
    this._value = value
    this._name = name
    this._displayName = displayName
  }

  public get name() {
    return this._name
  }

  public get displayName() {
    if (this._displayName === undefined)
      return _.capitalize(this._name)
    return this._displayName
  }

  public get value() {
    return this._value
  }
}