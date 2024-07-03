type Err<E> = Readonly<{
  tag: "Err"
  err: E
}>

type Ok<T> = Readonly<{
  tag: "Ok"
  value: T
}>

export type Result<E, T> = Err<E> | Ok<T>

export function err<E>(err: E): Result<E, never> {
  return {
    tag: "Err",
    err,
  }
}

export function isErr<E, T>(r: Result<E, T>): r is Err<E> {
  return r.tag === "Err"
}

export function ok<T>(val: T): Result<never, T> {
  return {
    tag: "Ok",
    value: val,
  }
}

export function isOk<E, T>(r: Result<E, T>): r is Ok<T> {
  return r.tag === "Ok"
}
