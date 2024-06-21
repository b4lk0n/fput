import { describe, expect, it } from "bun:test"
import { isNone } from "./option.js"
import { tryCatch } from "./try-catch.js"
import { unwrap } from "./unwrap.js"

describe("Option.tryCatch", () => {
  it("returns a `Some` if a function does not throw", () => {
    const opt = tryCatch(() => 5)
    expect(unwrap(opt)).toBe(5)
  })

  it("returns None if a function throws", () => {
    const opt = tryCatch(() => {
      throw new Error("oops")
    })

    expect(isNone(opt)).toBeTrue()
  })
})
