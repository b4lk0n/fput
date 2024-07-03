import { purry } from "remeda"
import type { UnaryFn } from "../func.js"
import { isSome } from "./option.js"
import type { Option } from "./option.js"
import { unwrap } from "./unwrap.js"

export function flatMap<T, U>(
  f: UnaryFn<T, Option<U>>,
): (opt: Option<T>) => Option<U>

export function flatMap<T, U>(
  opt: Option<T>,
  f: UnaryFn<T, Option<U>>,
): Option<U>

export function flatMap(...args: ReadonlyArray<unknown>): unknown {
  return purry(flatMapImpl, args)
}

function flatMapImpl<T, U>(opt: Option<T>, f: UnaryFn<T, Option<U>>) {
  return isSome(opt) ? f(unwrap(opt)) : opt
}
