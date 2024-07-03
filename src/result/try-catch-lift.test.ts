import { describe, expect, it } from "bun:test"
import { tryCatchLift } from "./try-catch-lift.js"
import { unwrapErr } from "./unwrap-err.js"
import { unwrap } from "./unwrap.js"

describe("Result.tryCatchLift", () => {
  const onThrow = (e: unknown) => `error: ${e}`

  it("returns Ok<T> if a function does not throw", () => {
    const unsafe = () => 1

    const safe = tryCatchLift(onThrow)(unsafe)
    expect(unwrap(safe())).toBe(1)

    const safe2 = tryCatchLift(unsafe, onThrow)
    expect(unwrap(safe2())).toBe(1)
  })

  it("returns Err<E> if a function throws", () => {
    const unsafe = () => {
      throw "oops"
    }

    const safe = tryCatchLift(onThrow)(unsafe)
    expect(unwrapErr(safe())).toBe("error: oops")

    const safe2 = tryCatchLift(unsafe, onThrow)
    expect(unwrapErr(safe2())).toBe("error: oops")
  })
})
