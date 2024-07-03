import { describe, expect, it } from "bun:test"
import { unwrapErr } from "../result/unwrap-err.js"
import { unwrap } from "../result/unwrap.js"
import { tryCatch } from "./try-catch.js"

describe("AsyncResult.tryCatch", () => {
  const onReject = (e: unknown) => `error: ${e}`

  it("returns Ok<T> if a promise resolves", async () => {
    const unsafe = () => Promise.resolve(1)

    const res = tryCatch(onReject)(unsafe)
    expect(unwrap(await res)).toBe(1)

    const res2 = tryCatch(unsafe, onReject)
    expect(unwrap(await res2)).toBe(1)
  })

  it("returns Err<E> if a promise rejects", async () => {
    const unsafe = () => Promise.reject("oops")

    const res = tryCatch(onReject)(unsafe)
    expect(unwrapErr(await res)).toBe("error: oops")

    const res2 = tryCatch(unsafe, onReject)
    expect(unwrapErr(await res2)).toBe("error: oops")
  })
})
