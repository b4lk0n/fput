import { describe, expect, it } from "vitest"
import { fromNullish } from "./from-nullish.js"
import { isNone } from "./option.js"
import { fromUndefined } from "./from-undefined.js"
import { unwrap } from "./unwrap.js"

describe("Option.fromUndefined", () => {
  it("creates a `None` from an undefined value", () => {
    const opt = fromNullish(undefined)
    expect(isNone(opt)).toBe(true)
  })

  const nonUndef = [0, -1, 5, false, Number.NaN, "", "hello"]
  it.each(nonUndef)("creates a `Some` for %s", (val) => {
    const opt = fromUndefined(val)
    expect(unwrap(opt)).toBe(val)
  })
})
