import { describe, expect, it } from "bun:test"
import { flatMap } from "./flat-map.js"
import { none, some } from "./option.js"
import { unwrapOr } from "./unwrap-or.js"
import { unwrap } from "./unwrap.js"

describe("Option.flatMap", () => {
  const mapper = (x: number) => some(`number: ${x}`)

  it("maps Some<T> to Some<F>", () => {
    const opt = flatMap(mapper)(some(5))
    expect(unwrap(opt)).toBe("number: 5")

    const opt2 = flatMap(some(5), mapper)
    expect(unwrap(opt2)).toBe("number: 5")
  })

  it("ignores None", () => {
    const opt = flatMap(mapper)(none())
    expect(unwrapOr(opt, "none")).toBe("none")

    const opt2 = flatMap(none(), mapper)
    expect(unwrapOr(opt2, "none")).toBe("none")
  })
})
