import { describe, expect, it } from "bun:test"
import { mapOrElse } from "./map-or-else.js"
import { err, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

describe("Result.mapOrElse", () => {
  const def = () => 3
  const mapper = (x: number) => x * 2

  it("maps Ok<T> to Ok<U>", () => {
    const res = ok(5)

    const res2 = mapOrElse(def, mapper)(res)
    expect(unwrap(res2)).toBe(10)

    const res3 = mapOrElse(res, def, mapper)
    expect(unwrap(res3)).toBe(10)
  })

  it("maps Err<E> to the result of a default function", () => {
    const res = err("oops")

    const res2 = mapOrElse(def, mapper)(res)
    expect(unwrap(res2)).toBe(3)

    const res3 = mapOrElse(res, def, mapper)
    expect(unwrap(res3)).toBe(3)
  })
})
