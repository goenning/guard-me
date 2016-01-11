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
    expect(result.messages).to.deep.equal([ '1 should be 1.' ])
  })

  it("with custom message", async function() {
    var assert = new Assertion("Star Wars")
    var result = await assert.equal('Star Trek').message("they are not the same!").resolve();
    expect(result.valid).to.be.false
    expect(result.messages).to.deep.equal([ "they are not the same!" ])
  })

})