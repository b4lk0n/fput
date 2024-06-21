import { purry } from "remeda";
import type { UnaryFn } from "../func.js";
import type { Result } from "./result.js";
import { isOk, ok } from "./result.js";
import { unwrap } from "./unwrap.js";

export function map<E, T, U>(
  f: UnaryFn<T, U>,
): (r: Result<E, T>) => Result<E, U>;
export function map<E, T, U>(r: Result<E, T>, f: UnaryFn<T, U>): Result<E, U>;

export function map(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapImpl, args);
}

export function mapImpl<E, T, U>(r: Result<E, T>, f: UnaryFn<T, U>) {
  return isOk(r) ? ok(f(unwrap(r))) : r;
}
