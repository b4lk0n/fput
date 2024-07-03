import type { Result } from "../result/result.js"
import type { AsyncResult } from "./async-result.js"

export function fromResult<E, T>(r: Result<E, T>): AsyncResult<E, T> {
  return Promise.resolve(r)
}
