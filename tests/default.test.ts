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

  it("should not do anything when setting custom message without validator", async function() {
    let guard = ensure<number>((check, object) => {
      check(object).message("never used")
    })
    let result = await guard.check(5)
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

  it("should return custom messages multiple assertions", async function() {
    let guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").message("{PropertyName} is not {0}")
        .length(1, 5).message("{PropertyName} length should be between {0} and {1}")
    })

    let result = await guard.check("Star Wars")
    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("value")
    expect(result.errors[0].messages[0]).to.be.equal("Value is not T-Shirt")
    expect(result.errors[1].property).to.be.equal("value")
    expect(result.errors[1].messages[0]).to.be.equal("Value length should be between 1 and 5")
  })

  it("should return custom messages resolved at runtime", async function() {
    let guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").message(() => "{PropertyName} is not {0}")
    })

    let result = await guard.check("Shirt")
    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("value")
    expect(result.errors[0].messages[0]).to.be.equal("Value is not T-Shirt")
  })

  it("should return custom messages resolved async at runtime", async function() {
    let guard = ensure<string>((check, object) => {
      check(object).equal("T-Shirt").message(async () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve("{PropertyName} does not equal {0}"), 100)
        })
      })
    })

    let result = await guard.check("Shirt")
    expect(result.valid).to.be.false
    expect(result.errors[0].property).to.be.equal("value")
    expect(result.errors[0].messages[0]).to.be.equal("Value does not equal T-Shirt")
  })

})