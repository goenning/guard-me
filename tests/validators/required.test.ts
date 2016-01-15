import {ValidationContext} from '../../lib'
import {RequiredValidator} from '../../lib/validators/RequiredValidator'
import {fail, ok} from './testcase'

describe("Required Validator", function() {

  var required = () => {
    return (context: ValidationContext) => {
      return new RequiredValidator(context)
    }
  }

  ok(`Star Wars`, 'Star Wars', required())
  ok(`1`, 1, required());
  ok(`{ bar:'bar' }`, { bar: 'bar' }, required())
  ok(`[1]`, [1], required())

  fail(`[]`, [], required(), [
    { property: 'value', message: 'Value is required' }
  ])
  
  fail(`null`, null, required(), [
    { property: 'value', message: 'Value is required' }
  ])

  fail(`undefined`, undefined, required(), [
    { property: 'value', message: 'Value is required' }
  ])

  fail(`''`, '', required(), [
    { property: 'value', message: 'Value is required' }
  ])

  fail(`0`, 0, required(), [
    { property: 'value', message: 'Value is required' }
  ])
})