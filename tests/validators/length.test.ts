import {ValidationRule, LengthValidator, ValidationContext} from '../../lib';
import {expect} from 'chai';

describe("Length Validator", function () {

  var data = [
    [ 'Star Wars', 0, 20, true, `'Star Wars' >= 0 && <= 20` ],
    [ 'Hi', 1, undefined, false, `'Hi' <= 1` , `Hi should have more than 1 characters` ],
    [ 'Hello World', 50, undefined, true, `'Hello World' <= 50` ]
  ];

  var testWithData = function (item) {
    return async function() {
      var context = new ValidationContext(item[0]);
      var rule = new ValidationRule(context);
      rule.addValidator(new LengthValidator(context, item[1], item[2]));
      var result = await rule.validate();
      expect(result.success).to.be.equal(item[3]);

      if (item[3] === false) {
        expect(result.failures.length).to.be.equal(1);
        expect(result.failures[0].message).to.be.equal(item[5]);
      }
    };
  };

  data.forEach(function (item:any[]) {
    it(item[4], testWithData(item));
  });

})