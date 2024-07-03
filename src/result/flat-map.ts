import { purry } from "remeda"
import type { UnaryFn } from "../func.js"
import type { Result } from "./result.js"
import { isErr } from "./result.js"
import { unwrap } from "./unwrap.js"

export function flatMap<E, T, F, U>(
  f: UnaryFn<T, Result<F, U>>,
): (r: Result<E, T>) => Result<E | F, U>
export function flatMap<E, T, F, U>(
  r: Result<E, T>,
  f: UnaryFn<T, Result<F, U>>,
): Result<E | F, U>

export function flatMap(...args: ReadonlyArray<unknown>) {
  return purry(flatMapImpl, args)
}

function flatMapImpl<E, T, F, U>(r: Result<E, T>, f: UnaryFn<T, Result<F, U>>) {
  return isErr(r) ? r : f(unwrap(r))
}
