import { purry } from "remeda"
import type { Thunk, UnaryFn } from "../func.js"
import type { Result } from "./result.js"
import { err, ok } from "./result.js"

export function tryCatch<E, T>(
  onThrow: UnaryFn<unknown, E>,
): (f: Thunk<T>) => Result<E, T>
export function tryCatch<E, T>(
  f: Thunk<T>,
  onThrow: UnaryFn<unknown, E>,
): Result<E, T>

export function tryCatch(...args: ReadonlyArray<unknown>) {
  return purry(tryCatchImpl, args)
}

function tryCatchImpl<E, T>(f: Thunk<T>, onThrow: UnaryFn<unknown, E>) {
  try {
    return ok(f())
  } catch (e) {
    return err(onThrow(e))
  }
}
