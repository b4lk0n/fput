import type { Result } from "./result.js";
import { isErr } from "./result.js";

export function unwrapErr<E, T>(r: Result<E, T>): E {
  if (isErr(r)) {
    return r.err;
  }

  throw new Error("Cannot unwrap error from an Ok value");
}
