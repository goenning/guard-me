import {ensure} from '../lib'
import {expect} from 'chai'

interface SaveProductRequest {
  id:number,
  title:string,
  slug:string
}

describe("Object Validation:", function () {
  var request:SaveProductRequest = {
    id: 1,
    title: 'Garmin Swim',
    slug: 'garmin-swim'
  }

  it("object property validation", async function() {
    var guard = ensure<SaveProductRequest>((check, object) => {
      check(object.title).length(1, 20)
    })

    var result = await guard.check(request)
    expect(result.valid).to.be.true
  })

  it("object property with custom validation", async function() {
    var guard = ensure<SaveProductRequest>((check, object) => {
      check(object).custom(async (o) => {
        return o.title == 'Garmin Swim';
      }).custom(async (o) => {
        return o.slug == 'garmin-swim';
      })
    })

    var result = await guard.check(request)
    expect(result.valid).to.be.true
  })

})