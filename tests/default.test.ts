import {ensure} from '../lib'
import {expect} from 'chai'

describe("Basic validation", function () {

  it("should init without validation", async function() {
    var guard = ensure<number>()
    var result = await guard.check(5)
    expect(result.valid).to.be.true
  })

  it("should validate multiple assertions", async function() {
    var guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").message("{0} should equal {1}")
                   .length(1, 5).message("{0} should have between {1} and {2} characters")
    })

    var object = "Star Wars"
    var result = await guard.check(object)
    expect(object).to.be.equal("Star Wars")
    expect(result.valid).to.be.false
    expect(result.messages[0]).to.be.equal('Value should equal T-Shirt')
    expect(result.messages[1]).to.be.equal('Value should have between 1 and 5 characters')
  })

})