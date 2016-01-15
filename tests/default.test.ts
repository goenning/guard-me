import {ensure} from '../lib'
import {expect} from 'chai'

describe("Basic validation", function() {

  it("should init without validation", async function() {
    var guard = ensure<number>()
    var result = await guard.check(5)
    expect(result.valid).to.be.true
  })

  it("should not do anything when setting custom message without validator", async function() {
    var guard = ensure<number>((check, object) => {
      check(object).message("never used")
    })
    var result = await guard.check(5)
    expect(result.valid).to.be.true
  })

  it("should validate multiple assertions", async function() {
    var guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").length(1, 5)
    })

    var object = "Star Wars"
    var result = await guard.check(object)
    expect(object).to.be.equal("Star Wars")
    expect(result.valid).to.be.false
  })

  it("should return custom messages multiple assertions", async function() {
    var guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").message("{PropertyName} is not {0}")
        .length(1, 5).message("{PropertyName} length should be between {0} and {1}")
    })

    var result = await guard.check("Star Wars")
    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("value")
    expect(result.errors[0].messages[0]).to.be.equal('Value is not T-Shirt')
    expect(result.errors[1].property).to.be.equal("value")
    expect(result.errors[1].messages[0]).to.be.equal('Value length should be between 1 and 5')
  })

})