import {ensure} from "../lib"
import {expect} from "chai"

describe("Localized Message validation", function() {

  let requireCheck = async (expected: string) => {
    let guard = ensure.that((check, object) => {
      check(object.name).required()
    })
    let result = await guard.check({ name: "" })
    expect(result.valid).to.be.false
    expect(result.errors[0].messages[0]).to.be.equal(expected)
  }

  it("should get pt-BR validation message", async function() {
    ensure.setLocale("pt-BR")
    await requireCheck("Name é obrigatório")
  })

  it("should get default locale validation message when locale is missing", async function() {
    ensure.setLocale("xx-VV")
    await requireCheck("Name is required")
  })

  it("should be allowed to get use custom validation message", async function() {
    ensure.setMessages({
      "required": "You have to type something on field {PropertyName}"
    })
    await requireCheck("You have to type something on field Name")
  })

  it("should get default locale validation message when translation is missing", async function() {
    ensure.setMessages({
      "equal": "{PropetyName} == {0}"
    })
    await requireCheck("Name is required")
  })
})