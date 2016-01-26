import {ensure} from "../lib"
import {expect} from "chai"

describe("Basic validation", function() {

  it("should init without validation", async function() {
    let guard = ensure.that()
    let result = await guard.check(5)
    expect(result.valid).to.be.true
  })

  it("should validate all validators", async function() {
    let guard = ensure.that((check, object) => {
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
    let guard = ensure.that((check, object) => {
      check(object).equal("T-Shirt").length(1, 5).required()
    })

    let object = "Star Wars"
    let result = await guard.check(object)
    expect(object).to.be.equal("Star Wars")
    expect(result.valid).to.be.false
  })

  it("should be able to compare fields of object under validation", async function() {
    let guard = ensure.that((check, object) => {
      check(object.password).equal(object.confirmPassword.value)
    })

    let result = await guard.check({
      password: "H3LL0",
      confirmPassword: "H3LL0"
    })
    expect(result.valid).to.be.true
  })
})