import { purry } from "remeda"
import type { Thunk, UnaryFn } from "../func.js"
import { isSome, type Option } from "./option.js"
import { unwrap } from "./unwrap.js"

export function match<T, U>(
  onNone: Thunk<U>,
  onSome: UnaryFn<T, U>,
): (opt: Option<T>) => U
export function match<T, U>(
  opt: Option<T>,
  onNone: Thunk<U>,
  onSome: UnaryFn<T, U>,
): U

export function match(...args: ReadonlyArray<unknown>): unknown {
  return purry(matchImpl, args)
}

function matchImpl<T, U>(
  opt: Option<T>,
  onNone: Thunk<U>,
  onSome: UnaryFn<T, U>,
) {
  return isSome(opt) ? onSome(unwrap(opt)) : onNone()
}
