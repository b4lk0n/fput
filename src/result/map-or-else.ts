import { purry } from "remeda"
import type { Thunk, UnaryFn } from "../func.js"
import type { Result } from "./result.js"
import { isOk, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

export function mapOrElse<E, T, U>(
  def: Thunk<U>,
  f: UnaryFn<T, U>,
): (r: Result<E, T>) => Result<E, U>
export function mapOrElse<E, T, U>(
  r: Result<E, T>,
  def: Thunk<U>,
  f: UnaryFn<T, U>,
): Result<E, U>

export function mapOrElse(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapOrElseImpl, args)
}

function mapOrElseImpl<E, T, U>(
  r: Result<E, T>,
  def: Thunk<U>,
  f: UnaryFn<T, U>,
) {
  return ok(isOk(r) ? f(unwrap(r)) : def())
}
