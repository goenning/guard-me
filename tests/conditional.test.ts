import {ensure} from "../lib"
import {expect} from "chai"

describe("Conditional validation", function() {

  let contentIsRequired = ensure((check, object) => {
    check(object.title).required()
    if (!object.draft.value) {
      check(object.content).required()
    }
  })

  let draftPost = {
    title: "Top 10 NPM Libraries",
    draft: true
  }

  let postWithoutContent = {
    title: "Top 10 NPM Libraries",
    draft: false
  }

  it("should not run the validation", async function() {
    let result = await contentIsRequired.check(draftPost)
    expect(result.valid).to.be.true
  })

  it("should run the validation", async function() {
    let result = await contentIsRequired.check(postWithoutContent)
    expect(result.valid).to.be.false
  })
})