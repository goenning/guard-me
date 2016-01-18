import {ensure} from "../lib"
import {expect} from "chai"

class DeleteProductRequest {
  private _id: number

  public get id() {
    return this._id
  }

  public set id(id: number) {
    this._id = id
  }
}

let request = new DeleteProductRequest()
request.id = 2

describe("ES6 class validation", function() {
  it("should work with es6 class", async function() {
    let guard = ensure<DeleteProductRequest>((check, object) => {
      check(object.id).greaterThan(0)
    })

    let result = await guard.check(request)
    expect(result.valid).to.be.true
  })

})