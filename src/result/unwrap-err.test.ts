import { describe, expect, it } from "bun:test"
import { err, ok } from "./result.js"
import { unwrapErr } from "./unwrap-err.js"

describe("Result.unwrapErr", () => {
  it("unwraps Err<E>", () => {
    expect(unwrapErr(err("oops"))).toBe("oops")
  })

  it("throws unwrapping OkT>", () => {
    expect(() => unwrapErr(ok(2))).toThrow()
  })
})
