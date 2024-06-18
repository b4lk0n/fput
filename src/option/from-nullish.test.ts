import { describe, expect, it } from "vitest"
import { fromNullish } from "./from-nullish.js"
import { isNone } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.fromNullish", () => {
  it("creates a `None` from a nullish value", () => {
    const opt = fromNullish(null)
    expect(isNone(opt)).toBe(true)

    const opt2 = fromNullish(undefined)
    expect(isNone(opt2)).toBe(true)
  })

  const nonNullish = [0, -1, 5, false, Number.NaN, "", "hello"]
  it.each(nonNullish)("creates a `Some` for %s", (val) => {
    const opt = fromNullish(val)
    expect(unwrap(opt)).toBe(val)
  })
})
