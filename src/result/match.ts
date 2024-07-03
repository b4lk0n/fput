import { purry } from "remeda"
import type { UnaryFn } from "../func.js"
import type { Result } from "./result.js"
import { isOk } from "./result.js"
import { unwrapErr } from "./unwrap-err.js"
import { unwrap } from "./unwrap.js"

export function match<E, T, U>(
  onErr: UnaryFn<E, U>,
  onOk: UnaryFn<T, U>,
): (r: Result<E, T>) => U
export function match<E, T, U>(
  r: Result<E, T>,
  onErr: UnaryFn<E, U>,
  onOk: UnaryFn<T, U>,
): U

export function match(...args: ReadonlyArray<unknown>): unknown {
  return purry(matchImpl, args)
}

function matchImpl<E, T, U>(
  r: Result<E, T>,
  onErr: UnaryFn<E, U>,
  onOk: UnaryFn<T, U>,
) {
  return isOk(r) ? onOk(unwrap(r)) : onErr(unwrapErr(r))
}
