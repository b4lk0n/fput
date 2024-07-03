import { purry } from "remeda"
import type { Thunk } from "../func.js"
import type { Result } from "./result.js"
import { unwrap } from "./unwrap.js"

export function unwrapOrElse<E, T>(def: Thunk<T>): (r: Result<E, T>) => T
export function unwrapOrElse<E, T>(r: Result<E, T>, def: Thunk<T>): T

export function unwrapOrElse(...args: ReadonlyArray<unknown>): unknown {
  return purry(unwrapOrElseImpl, args)
}

function unwrapOrElseImpl<E, T>(r: Result<E, T>, def: Thunk<T>) {
  try {
    return unwrap(r)
  } catch {
    return def()
  }
}
