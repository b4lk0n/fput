import { describe, it, expect, expectTypeOf } from "vitest"
import { none, some } from "./option.js"
import { match, matchElse } from "./match.js"

describe("match", () => {
  it("matches a none value", () => {
    const res = match(
      () => 1,
      () => 2,
    )(none())
    expect(res).toBe(1)

    const res2 = match(none(), {
      onNone: () => 1,
      onSome: () => 2,
    })
    expect(res2).toBe(1)
  })

  it("matches a some value", () => {
    const res = match(
      () => 1,
      (v: number) => v * 2,
    )(some(2))
    expect(res).toBe(4)

    const res2 = match(some(2), {
      onNone: () => 1,
      onSome: (v) => v * 2,
    })
    expect(res2).toBe(4)
  })
})

describe("matchElse", () => {
  it("matches a none value", () => {
    const res = matchElse(
      () => "nope",
      () => 1,
    )(none())
    expect(res).toBe("nope")

    const res2 = matchElse(none(), {
      onNone: () => "nope",
      onSome: () => 1,
    })
    expect(res2).toBe("nope")
  })

  it("matches a some value", () => {
    const res = matchElse(
      () => "nope",
      (v: string) => v + 1,
    )(some("yep"))
    expect(res).toBe("yep1")

    const res2 = matchElse(some("yep"), {
      onNone: () => 1,
      onSome: (v) => v + 1,
    })
    expect(res2).toBe("yep1")
  })
})
