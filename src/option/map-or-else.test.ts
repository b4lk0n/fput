import { describe, expect, it } from "vitest"
import { mapOrElse } from "./map-or-else.js"
import { none, some } from "./option.js"

describe("Option.mapOrElse", () => {
  it("transforms a some value", () => {
    const def = () => 5
    const mapper = (x: number) => x * 3

    const opt = mapOrElse(def, mapper)(some(10))
    expect(opt).toHaveProperty("value", 30)

    const opt2 = mapOrElse(some(5), def, mapper)
    expect(opt2).toHaveProperty("value", 15)
  })

  it("returns a result of a default function for a none", () => {
    const def = () => 5
    const mapper = (x: number) => x * 2

    const opt = mapOrElse(def, mapper)(none())
    expect(opt).toHaveProperty("value", 5)

    const opt2 = mapOrElse(none(), def, mapper)
    expect(opt2).toHaveProperty("value", 5)
  })
})
