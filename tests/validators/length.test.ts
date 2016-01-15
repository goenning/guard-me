import {ValidationRule, LengthValidator, ValidationContext} from '../../lib';
import {expect} from 'chai';

describe("Length Validator", function () {

  var data = [
    [ `'Star Wars' >= 0 && <= 20`, 'Star Wars', 0, 20, true ],
    [ `'Hello World' >= 40 && <= 50`, 'Hello World', 40, 50, false, 'Value should have between 40 and 50 characters' ],
    [ `[1,2,3] >= 0 && <= 10 `, [1,2,3], 0, 2, false, 'Value should have no more than 2 elements' ]
  ];

  var testCase = async function (item) {
    var context = new ValidationContext(item[1]);
    var rule = new ValidationRule(context);
    rule.addValidator(new LengthValidator(context, item[2], item[3]));
    var result = await rule.validate();
    expect(result.success).to.be.equal(item[4]);

    if (item[4] === false) {
      expect(result.failures.length).to.be.equal(1);
      expect(result.failures[0].message).to.be.equal(item[5]);
    }
  };

  data.forEach(function (item:any[]) {
    it(item[0], async () => {
      await testCase(item)
    });
  });

})