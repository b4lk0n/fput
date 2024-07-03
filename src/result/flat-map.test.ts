import { describe, expect, it } from "bun:test"
import { flatMap } from "./flat-map.js"
import { err, ok } from "./result.js"
import { unwrapErr } from "./unwrap-err.js"
import { unwrap } from "./unwrap.js"

describe("Result.flatMap", () => {
  const mapper = (x: number) => ok(`value: ${x}`)

  it("maps Ok<T> to Ok<F>", () => {
    const res = ok(5)

    const res2 = flatMap(mapper)(res)
    expect(unwrap(res2)).toBe("value: 5")

    const res3 = flatMap(res, mapper)
    expect(unwrap(res3)).toBe("value: 5")
  })

  it("ignores Err<E>", () => {
    const res = err("oops")

    const res2 = flatMap(mapper)(res)
    expect(unwrapErr(res2)).toBe("oops")

    const res3 = flatMap(res, mapper)
    expect(unwrapErr(res3)).toBe("oops")
  })
})
