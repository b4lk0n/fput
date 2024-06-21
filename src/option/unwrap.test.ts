import { describe, expect, it } from "bun:test"
import { none, some } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.unwrap", () => {
  it("unwraps Some<T> values", () => {
    expect(unwrap(some(5))).toBe(5)
  })

  it("throws when unwrapping None values", () => {
    expect(() => unwrap(none())).toThrow()
  })
})
