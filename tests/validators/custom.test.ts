import {
  ValidationRule,
  ValidationContext,
  ExpressionProperty
} from '../../lib';

import {CustomValidator} from '../../lib/validators/CustomValidator';

import {expect} from 'chai';

describe("Custom Validator", function() {

  var isGreeting = function(text: any): boolean {
    return text === 'Hi' || text === 'Hello';
  }

  var throwError = function(text: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        if (text === "Boom")
          reject(new Error());
        else
          resolve(true);
      }, 50)
    })
  }

  var data = [
    [`Star Wars is not a greeting`, 'Star Wars', false, isGreeting, ],
    [`Hi is a greeting`, 'Hi', true, isGreeting, ], ,
    [`Boom will throw an error`, 'Boom', false, throwError, ],
    [`Hello will not throw an error`, 'Boom', false, throwError, ],
  ];

  var testCase = async function(item) {
    var property = new ExpressionProperty('value', item[1])
    var context = new ValidationContext(property);
    var rule = new ValidationRule(context);
    rule.addValidator(new CustomValidator(context, item[3]));
    var result = await rule.validate();
    expect(result.success).to.be.equal(item[2]);
  };

  data.forEach(function(item: any[]) {
    it(item[0], async () => {
      await testCase(item)
    });
  });

})