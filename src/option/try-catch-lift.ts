import { tryCatch } from "./try-catch.js"

export function tryCatchLift<A extends ReadonlyArray<unknown>, T>(
  f: (...a: A) => T,
) {
  return (...a: A) => tryCatch(() => f(...a))
}
