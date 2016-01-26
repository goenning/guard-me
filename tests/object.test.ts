import {ensure} from "../lib"
import {expect} from "chai"

interface SaveProductRequest {
  id: number,
  title: string,
  slug: string
}

describe("General object validation", function() {
  let request: SaveProductRequest = {
    id: 1,
    title: "Garmin Swim",
    slug: "garmin-swim"
  }

  it("should return invalid and messages when check has succeed", async function() {
    let guard = ensure.that((check, object) => {
      check(object.title).length(1, 5)
    })

    let result = await guard.check(request)

    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("title")
    expect(result.errors[0].messages[0]).to.be.equal("Title must have between 1 and 5 characters")
  })

  it("should not change object values after validation", async function() {
    let guard = ensure.that((check, object) => {
      check(object.title).length(1, 5)
    })

    await guard.check(request)

    expect(request).to.deep.equal({
      id: 1,
      title: "Garmin Swim",
      slug: "garmin-swim"
    })
  })

  it("should be able to name the property for better message text", async function() {
    let guard = ensure.that((check, object) => {
      check(object.title, "Name").length(1, 5)
    })

    let result = await guard.check(request)

    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("title")
    expect(result.errors[0].messages[0]).to.be.equal("Name must have between 1 and 5 characters")
  })

  it("should validate when using multiple custom validation", async function() {
    let guard = ensure.that((check, object) => {
      check(object.title).must(async (o) => {
        return o === "Garmin Swim";
      })

      check(object.slug).must(async (o) => {
        return o === "garmin-swim";
      })
    })

    let result = await guard.check(request)
    expect(result.valid).to.be.true
    expect(result.errors.length).to.be.equal(0)
  })

})