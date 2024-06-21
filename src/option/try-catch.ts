import type { Thunk } from "../func.js"
import { none, some } from "./option.js"
import type { Option } from "./option.js"

export function tryCatch<T>(f: Thunk<T>): Option<T> {
  try {
    return some(f())
  } catch {
    return none()
  }
}
