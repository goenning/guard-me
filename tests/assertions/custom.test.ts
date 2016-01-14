import {Assertion} from '../../lib'
import {expect} from 'chai'

describe("Custom Assertion:", function () {

  var slowCompare = function(v1, v2) {
    return new Promise<Boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(v1 == v2)
      }, 200)
    })
  }

  it("1 == 1", async function() {
    var assert = new Assertion(1)
    var result = await assert.custom(async (v) => v == 1).resolve()
    expect(result.success).to.be.true
  })

  it("1 != 2 (with timeout)", async function() {
    var assert = new Assertion(1)
    var result = await assert.custom(v => {
      return slowCompare(v, 2)
    }).resolve()
    expect(result.success).to.be.false
  })

})