import { purry } from "remeda"
import type { Thunk, UnaryFn } from "../func.js"
import { err, ok } from "../result/result.js"
import type { AsyncResult } from "./async-result.js"

export function tryCatch<E, T>(
  onReject: UnaryFn<unknown, E>,
): (f: Thunk<Promise<T>>) => AsyncResult<E, T>
export function tryCatch<E, T>(
  f: Thunk<Promise<T>>,
  onReject: UnaryFn<unknown, E>,
): AsyncResult<E, T>

export function tryCatch(...args: ReadonlyArray<unknown>) {
  return purry(tryCatchImpl, args)
}

async function tryCatchImpl<E, T>(
  f: Thunk<Promise<T>>,
  onReject: UnaryFn<unknown, E>,
) {
  try {
    const val = await f()
    return ok(val)
  } catch (e) {
    return err(onReject(e))
  }
}
