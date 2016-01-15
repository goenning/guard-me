import {ValidationContext} from '../../lib'
import {EqualValidator} from '../../lib/validators/EqualValidator'
import {fail, ok} from './testcase'

describe("Equal Validator", function() {

  var equal = (value: any) => {
    return (context: ValidationContext) => {
      return new EqualValidator(context, value)
    }
  }

  ok(`'Star Wars' == 'Star Wars'`, 'Star Wars', equal('Star Wars'))
  ok(`1 == 1`, 1, equal(1));
  ok(`1.2 == 1.2`, 1.2, equal(1.2))
  ok(`{ bar:'bar' } == { bar:'bar' }`, { bar: 'bar' }, equal({ bar: 'bar' }))

  fail(`1 != '1'`, 1, equal('1'), [
    { property: 'value', message: `Value should equal 1` }
  ])

  fail(`'Star Wars' != 'Star Trek'`, 'Star Wars', equal('Star Trek'), [
    { property: 'value', message: `Value should equal Star Trek` }
  ])

  fail(`{ bar:'bar' } != { foo:'bar' }`, { bar: 'bar' }, equal({ foo: 'bar' }), [
    { property: 'value', message: `Value should equal {"foo":"bar"}` }
  ])

})