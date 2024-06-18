import { describe, it, expect } from "vitest"
import { mapOr } from "./map-or.js"
import { none, some } from "./option.js"

describe("Option.mapOr", () => {
  it("transforms a some value", () => {
    const res = mapOr(5, (x: number) => x * 2)(some(1))
    expect(res).toHaveProperty("value", 2)

    const res2 = mapOr(some(2), 5, (x: number) => x + 10)
    expect(res2).toHaveProperty("value", 12)
  })

  it("returns default value for a none", () => {
    const mapper = (x: number) => x * 2
    const res = mapOr(5, mapper)(none())
    expect(res).toHaveProperty("value", 5)

    const res2 = mapOr(none(), 5, mapper)
    expect(res2).toHaveProperty("value", 5)
  })
})
