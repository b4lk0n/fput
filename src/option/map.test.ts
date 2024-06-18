import { describe, it, expect } from "vitest"
import { map } from "./map.js"
import { none, some } from "./option.js"

describe("map", () => {
  it("maps a some value", () => {
    const mapper = (x: number) => x * 2
    const opt = map(mapper)(some(5))
    expect(opt).toHaveProperty("value", 10)

    const opt2 = map(some(5), (v) => v * 3)
    expect(opt2).toHaveProperty("value", 15)
  })

  it("does not map a none value", () => {
    const opt = map(() => 1)(none())
    expect(opt).not.toHaveProperty("value")

    const opt2 = map(none(), () => 1)
    expect(opt2).not.toHaveProperty("value")
  })
})
