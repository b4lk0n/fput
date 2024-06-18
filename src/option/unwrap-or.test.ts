import { describe, expect, it } from "vitest"
import { unwrapOr } from "./unwrap-or.js"
import { none, some } from "./option.js"

describe("Option.unwrapOr", () => {
  const def = 2

  it("unwraps a `Some` value", () => {
    const val = unwrapOr(def)(some(5))
    expect(val).toBe(5)

    const val2 = unwrapOr(some(5), def)
    expect(val2).toBe(5)
  })

  it("returns a default value for a `None` value", () => {
    const val = unwrapOr(def)(none())
    expect(val).toBe(def)

    const val2 = unwrapOr(none(), def)
    expect(val2).toBe(def)
  })
})
