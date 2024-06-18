import { isSome } from "./option.js"
import type { Option } from "./option.js"

export function unwrap<T>(opt: Option<T>): T {
  if (isSome(opt)) {
    return opt.value
  }

  throw new Error("Cannot unwrap a `None` value")
}
