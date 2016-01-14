import {ValidationRule, CustomValidator, ValidationContext} from '../../lib';
import {expect} from 'chai';

describe("Custom Validator", function () {

  var isGreeting = function(text: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(text === 'Hi' || text === 'Hello');
      }, 50)
    })
  }

  var data = [
    [ 'Star Wars', false, isGreeting, `'Star Wars' is not a greeting` ],
    [ 'Hi', true, isGreeting, `'Hi' is a greeting` ],
  ];

  var testCase = async function (item) {
    var context = new ValidationContext(item[0]);
    var rule = new ValidationRule(context);
    rule.addValidator(new CustomValidator(context, item[2]));
    var result = await rule.validate();
    expect(result.success).to.be.equal(item[1]);
  };

  data.forEach(function (item:any[]) {
    it(item[3], async () => {
      await testCase(item)
    });
  });

})