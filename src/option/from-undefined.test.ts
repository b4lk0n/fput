import { describe, expect, it } from "bun:test"
import { fromNullish } from "./from-nullish.js"
import { fromUndefined } from "./from-undefined.js"
import { isNone } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.fromUndefined", () => {
  it("creates None from undefineds", () => {
    const opt = fromNullish(undefined)
    expect(isNone(opt)).toBe(true)
  })

  const nonUndef = [0, -1, 5, false, Number.NaN, "", "hello"]
  it.each(nonUndef)("creates Some<T> from %p", (val) => {
    const opt = fromUndefined(val)
    expect(unwrap(opt)).toBe(val)
  })
})
