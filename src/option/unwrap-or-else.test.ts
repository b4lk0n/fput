import { describe, expect, it } from "vitest"
import { unwrapOrElse } from "./unwrap-or-else.js"
import { none, some } from "./option.js"

describe("Option.unwrapOrElse", () => {
  const def = () => 5

  it("unwraps a `Some` value", () => {
    const val = unwrapOrElse(def)(some(2))
    expect(val).toBe(2)

    const val2 = unwrapOrElse(some(2), def)
    expect(val2).toBe(2)
  })

  it("returns a result of a default function for a `None` value", () => {
    const val = unwrapOrElse(def)(none())
    expect(val).toBe(5)

    const val2 = unwrapOrElse(none(), def)
    expect(val2).toBe(5)
  })
})
