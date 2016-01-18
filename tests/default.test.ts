import {ensure} from "../lib"
import {expect} from "chai"

describe("Basic validation", function() {

  it("should init without validation", async function() {
    let guard = ensure<number>()
    let result = await guard.check(5)
    expect(result.valid).to.be.true
  })

  it("should validate all validators", async function() {
    let guard = ensure<any>((check, object) => {
      check(object.title).required()
        .equal("Star Wars")
        .notEqual("Star Trek")
        .isIn(["Star Wars", "Star Trek"])
      check(object.slug).required().notEqual("star-trek")
      check(object.stars).greaterThan(1).lessThan(5).matches(/[0-9]/)
      check(object.contact).isEmail()
    })

    let result = await guard.check({
      title: "Star Wars",
      slug: "star-wars",
      stars: 3,
      contact: "contact-me@sw.com"
    })

    expect(result.valid).to.be.true
  })

  it("should validate multiple assertions", async function() {
    let guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").length(1, 5).required()
    })

    let object = "Star Wars"
    let result = await guard.check(object)
    expect(object).to.be.equal("Star Wars")
    expect(result.valid).to.be.false
  })
})