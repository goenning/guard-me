import {Assertion} from '../../lib'
import {expect} from 'chai'

describe("Length Assertion:", function () {
  var starWars:Assertion;

  beforeEach(() => {
    starWars = new Assertion("Star Wars")
  })

  it("valid range", async function() {
    var result = await starWars.length(1, 10).resolve();
    expect(result.valid).to.be.true
    expect(result.messages).to.deep.equal([ ])
  })

  it("only min", async function() {
    var result = await starWars.length(20).resolve();
    expect(result.valid).to.be.false
    expect(result.messages).to.deep.equal([ "'Star Wars' should have more than 20 characters." ])
  })

  it("min and max", async function() {
    var assert = new Assertion("Star Wars")
    var result = await starWars.length(1, 5).resolve();
    expect(result.valid).to.be.false
    expect(result.messages).to.deep.equal([ "'Star Wars' should have between 1 and 5 characters." ])
  })

  it("with custom message", async function() {
    var assert = new Assertion("Star Wars")
    var result = await starWars.length(1, 5).message("'{0}'.length >= {1} && <= {2}").resolve();
    expect(result.valid).to.be.false
    expect(result.messages).to.deep.equal([ "'Star Wars'.length >= 1 && <= 5" ])
  })

})