import {Assertion} from '../../lib'
import {expect} from 'chai'

describe("Equal Assertion:", function () {

  it("1 == 1", async function() {
    var assert = new Assertion(1)
    var result = await assert.equal(1).resolve();
    expect(result.valid).to.be.true
  })

  it("1 != 2", async function() {
    var assert = new Assertion(1)
    var result = await assert.equal(2).resolve();
    expect(result.valid).to.be.false
  })

  it("1 != '1'", async function() {
    var assert = new Assertion(1)
    var result = await assert.equal('1').resolve();
    expect(result.valid).to.be.false
  })

})