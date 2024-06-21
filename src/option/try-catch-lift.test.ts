import { describe, expect, it } from "bun:test"
import { isNone } from "./option.js"
import { tryCatchLift } from "./try-catch-lift.js"
import { unwrap } from "./unwrap.js"

describe("Option.tryCatchLift", () => {
  it("returns Some<T> if a function does not throw", () => {
    const safeFn = tryCatchLift(() => 1)
    expect(unwrap(safeFn())).toBe(1)
  })

  it("returns None if a function throws", () => {
    const safeFn = tryCatchLift(() => {
      throw new Error()
    })
    expect(isNone(safeFn())).toBeTrue()
  })
})
