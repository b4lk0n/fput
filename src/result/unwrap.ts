import type { Result } from "./result.js";
import { isOk } from "./result.js";

export function unwrap<E, T>(r: Result<E, T>): T {
  if (isOk(r)) {
    return r.value;
  }

  throw new Error("Cannot unwrap an Err value");
}
