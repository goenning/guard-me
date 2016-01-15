import {
  ValidationRule,
  ValidationContext,
  ExpressionProperty
} from '../../lib';
import {EqualValidator} from '../../lib/validators/EqualValidator';

import {expect} from 'chai';

describe("Equal Validator", function() {

  var data = [
    [`'Star Wars' != 'Star Trek'`, 'Star Wars', 'Star Trek', false, `Value should equal Star Trek`],
    [`'Star Wars' == 'Star Wars'`, 'Star Wars', 'Star Wars', true],
    [`1 == 1`, 1, 1, true],
    [`1 != '1'`, 1, '1', false, `Value should equal 1`],
    [`1.2 == 1.2`, 1.2, 1.2, true],
    [`{ bar:'bar' } == { bar:'bar' }`, { bar: 'bar' }, { bar: 'bar' }, true],
    [`{ bar:'bar' } != { foo:'bar' }`, { bar: 'bar' }, { foo: 'bar' }, false, `Value should equal {"foo":"bar"}`]
  ];

  var testCase = async function(item) {
    var property = new ExpressionProperty('value', item[1])
    var context = new ValidationContext(property);
    var rule = new ValidationRule(context);
    rule.addValidator(new EqualValidator(context, item[2]));
    var result = await rule.validate();
    expect(result.success).to.be.equal(item[3]);

    if (item[3] === false) {
      expect(result.failures.length).to.be.equal(1);
      expect(result.failures[0].message).to.be.equal(item[4]);
    }
  };

  data.forEach(function(item: any[]) {
    it(item[0], async () => {
      await testCase(item)
    });
  });

})