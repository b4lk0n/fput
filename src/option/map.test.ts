import { describe, it, expect } from "vitest"
import { map } from "./map.js"
import { isNone, none, some } from "./option.js"

describe("map", () => {
  it("maps a some value", () => {
    const res = map((v: number) => v * 2)(some(5))
    expect(res).toHaveProperty("value", 10)

    const res2 = map(some(5), (v) => v * 3)
    expect(res2).toHaveProperty("value", 15)
  })

  it("does not map a none value", () => {
    const res = map(() => 1)(none())
    expect(isNone(res)).toBeTruthy()

    const res2 = map(none(), () => 1)
    expect(isNone(res2)).toBeTruthy()
  })
})
