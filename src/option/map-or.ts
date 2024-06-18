import { purry } from "remeda"
import type { UnaryFn } from "../func.js"
import { isSome, some, type Option } from "./option.js"
import { unwrap } from "./unwrap.js"

export function mapOr<T, U>(
  def: U,
  f: UnaryFn<T, U>,
): (opt: Option<T>) => Option<U>
export function mapOr<T, U>(opt: Option<T>, def: U, f: UnaryFn<T, U>): Option<U>

export function mapOr(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapOrImpl, args)
}

function mapOrImpl<T, U>(opt: Option<T>, def: U, f: UnaryFn<T, U>) {
  return some(isSome(opt) ? f(unwrap(opt)) : def)
}
