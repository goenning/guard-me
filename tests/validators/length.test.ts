import {ValidationRule, LengthValidator, ValidationContext} from '../../lib';
import {expect} from 'chai';

describe("Length Validator", function () {

  var data = [
    [ 'Star Wars', 0, 20, true, `'Star Wars' >= 0 && <= 20` ],
    [ 'Hi', 1, undefined, false, `'Hi' <= 1` ],
    [ 'Hello World', 50, undefined, true, `'Hello World' <= 50` ]
  ];

  var testWithData = function (item) {
      return async function() {
        var context = new ValidationContext(item[0]);
        var rule = new ValidationRule(context);
        rule.addValidator(new LengthValidator(item[1], item[2]));
        var result = await rule.validate();
        expect(result.success).to.be.equal(item[3]);
      };
  };

  var print = function(value) {
    if (typeof(value) === 'string') {
      return `'${value}'`;
    }
    return value;
  }

  data.forEach(function (item:any[]) {
    it(item[4], testWithData(item));
  });

})