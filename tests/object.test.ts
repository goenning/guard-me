import {ensure} from '../lib'
import {expect} from 'chai'

interface SaveProductRequest {
  id:number,
  title:string,
  slug:string
}

describe("General object validation", function () {
  var request:SaveProductRequest = {
    id: 1,
    title: 'Garmin Swim',
    slug: 'garmin-swim'
  }

  it("should return valid and empty messages when check has succeed", async function() {
    var guard = ensure<SaveProductRequest>((check, object) => {
      check(object.title).length(1, 5)
    })

    var result = await guard.check(request)

    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("title")
    expect(result.errors[0].messages[0]).to.be.equal("Title should have between 1 and 5 characters")
  })

  it("should not change object values after validation", async function() {
    var guard = ensure<SaveProductRequest>((check, object) => {
      check(object.title).length(1, 5)
    })

    await guard.check(request)

    expect(request).to.deep.equal({
      id: 1,
      title: 'Garmin Swim',
      slug: 'garmin-swim'
    })
  })

  it("should be able to name the property for better message text", async function() {
    var guard = ensure<SaveProductRequest>((check, object) => {
      check(object.title, "Name").length(1, 5)
    })

    var result = await guard.check(request)

    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("title")
    expect(result.errors[0].messages[0]).to.be.equal("Name should have between 1 and 5 characters")
  })

  it("should validate when using multiple custom validation", async function() {
    var guard = ensure<SaveProductRequest>((check, object) => {
      check(object.title).custom(async (o) => {
        return o == 'Garmin Swim';
      })

      check(object.slug).custom(async (o) => {
        return o == 'garmin-swim';
      })
    })

    var result = await guard.check(request)
    expect(result.valid).to.be.true
    expect(result.errors.length).to.be.equal(0)
  })

})