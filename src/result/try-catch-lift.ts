import { purry } from "remeda"
import type { UnaryFn } from "../func.js"
import type { Result } from "./result.js"
import { tryCatch } from "./try-catch.js"

export function tryCatchLift<E, T, A extends ReadonlyArray<unknown>>(
  onThrow: UnaryFn<unknown, E>,
): (f: (...a: A) => T) => (...a: A) => Result<E, T>
export function tryCatchLift<E, T, A extends ReadonlyArray<unknown>>(
  f: (...a: A) => T,
  onThrow: UnaryFn<unknown, E>,
): (...a: A) => Result<E, T>

export function tryCatchLift(...args: ReadonlyArray<unknown>) {
  return purry(tryCatchLiftImpl, args)
}

function tryCatchLiftImpl<E, T, A extends ReadonlyArray<unknown>>(
  f: (...a: A) => T,
  onThrow: UnaryFn<unknown, E>,
): (...a: A) => Result<E, T> {
  return (...a: A) => tryCatch(() => f(...a), onThrow)
}
