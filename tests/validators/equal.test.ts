import {ValidationRule, EqualValidator, ValidationContext} from '../../lib';
import {expect} from 'chai';

describe("Equal Validator", function () {

  var data = [
    [ 'Star Wars', 'Star Trek', false ],
    [ 'Star Wars', 'Star Wars', true ],
    [ 1, 1, true ],
    [ 1, '1', false ],
    [ 1.2, 1.2, true ],
    [ { bar:'bar' }, { bar:'bar' }, true ],
    [ { bar:'bar' }, { foo:'bar' }, false ]
  ];

  var testCase = function (item) {
      return async function() {
        var context = new ValidationContext(item[0]);
        var rule = new ValidationRule(context);
        rule.addValidator(new EqualValidator(item[1]));
        var result = await rule.validate();
        expect(result.success).to.be.equal(item[2]);
      };
  };

  var print = function(value) {
    if (typeof(value) === 'string') {
      return `'${value}'`;
    }
    return value;
  }

  data.forEach(function (item) {
    var testName = `${print(item[0])} ${(item[2]) ? '==' : '!='} ${print(item[1])}`;
    it(testName, testCase(item));
  });

})