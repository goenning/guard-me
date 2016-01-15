import {ValidationContext} from '../../lib'
import {LengthValidator} from '../../lib/validators/LengthValidator'
import {fail, ok} from './testcase'

describe("Length Validator", function() {

  var length = (min: number, max: number) => {
    return (context: ValidationContext) => {
      return new LengthValidator(context, min, max)
    }
  }

  ok(`'Star Wars' >= 0 && <= 20`, 'Star Wars', length(0, 20))
  ok(`['A', 'B', 'C'] == 3`, ['A', 'B', 'C'], length(3, 3))

  fail(`'Hello World' <= 5`, 'Hello World', length(0, 5), [
    { property: 'value', message: 'Value should have no more than 5 characters' }
  ])

  fail(`'Hello World' >= 40 && <= 50`, 'Hello World', length(40, 50), [
    { property: 'value', message: 'Value should have between 40 and 50 characters' }
  ])

  fail(`[1, 2, 3] >= 0 && <= 2`, [1, 2, 3], length(0, 2), [
    { property: 'value', message: 'Value should have no more than 2 elements' }
  ])

  fail(`[1, 2, 3] >= 0 && <= 2`, [1, 2, 3], length(undefined, 2), [
    { property: 'value', message: 'Value should have no more than 2 elements' }
  ])

  fail(`[1, 2, 3] >= 1 && <= 2`, [1, 2, 3], length(1, 2), [
    { property: 'value', message: 'Value should have between 1 and 2 elements' }
  ])

})