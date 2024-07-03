import { describe, expect, it } from "bun:test"
import { err, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

describe("Result.unwrap", () => {
  it("unwraps Ok<T> values", () => {
    expect(unwrap(ok(5))).toBe(5)
  })

  it("throws when unwrapping Err<E> values", () => {
    expect(() => unwrap(err("oops"))).toThrow()
  })
})
