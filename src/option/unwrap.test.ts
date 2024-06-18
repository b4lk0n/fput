import { describe, expect, it } from "vitest"
import { none, some } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.unwrap", () => {
  it("unwraps a `Some` value", () => {
    expect(unwrap(some(5))).toBe(5)
  })

  it("throws an Error when unwrapping a `None` value", () => {
    expect(() => unwrap(none())).toThrow()
  })
})
