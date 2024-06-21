import { purry } from "remeda";
import type { UnaryFn } from "../func.js";
import type { Result } from "./result.js";
import { err, isErr } from "./result.js";
import { unwrapErr } from "./unwrap-err.js";

export function map<E, T, F>(
  f: UnaryFn<E, F>,
): (r: Result<E, T>) => Result<F, F>;
export function map<E, T, F>(r: Result<E, T>, f: UnaryFn<E, F>): Result<F, T>;

export function map(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapImpl, args);
}

export function mapImpl<E, T, F>(r: Result<E, T>, f: UnaryFn<E, F>) {
  return isErr(r) ? err(f(unwrapErr(r))) : r;
}
