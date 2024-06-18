import { describe, expect, it } from "vitest"
import { match } from "./match.js"
import { none, some } from "./option.js"

describe("match", () => {
  const onNone = () => 1
  const onSome = (x: number) => x * 2

  it("matches a none value", () => {
    const opt = match(onNone, onSome)(none())
    expect(opt).toBe(1)

    const opt2 = match(none(), onNone, onSome)
    expect(opt2).toBe(1)
  })

  it("matches a some value", () => {
    const opt = match(onNone, onSome)(some(2))
    expect(opt).toBe(4)

    const opt2 = match(some(2), onNone, onSome)
    expect(opt2).toBe(4)
  })
})
