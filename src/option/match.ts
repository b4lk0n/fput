import type { Thunk, UnaryFn } from "../func.js"
import { isNone, type Option } from "./option.js"

type Handlers<T, U> = {
  onNone: Thunk<U>
  onSome: UnaryFn<T, U>
}

function match<T, U>(
  onNone: Thunk<U>,
  onSome: UnaryFn<T, U>,
): (o: Option<T>) => U
function match<T, U>(o: Option<T>, handlers: Handlers<T, U>): U

function match<T, U>(
  onNoneOrOption: Thunk<U> | Option<T>,
  onSomeOrHandlers: UnaryFn<T, U> | Handlers<T, U>,
) {
  if (
    typeof onNoneOrOption === "function" &&
    typeof onSomeOrHandlers === "function"
  ) {
    return (o: Option<T>) =>
      isNone(o) ? onNoneOrOption() : onSomeOrHandlers(o.value)
  }

  if ("tag" in onNoneOrOption && "onSome" in onSomeOrHandlers) {
    const { onNone, onSome } = onSomeOrHandlers

    return isNone(onNoneOrOption) ? onNone() : onSome(onNoneOrOption.value)
  }

  throw new Error("Invalid invocation")
}

export { match }

type ElseHandlers<T, U, F> = {
  onNone: Thunk<U>
  onSome: UnaryFn<T, F>
}

function matchElse<T, U, F>(
  onNone: Thunk<U>,
  onSome: UnaryFn<T, F>,
): (o: Option<T>) => U | F
function matchElse<T, U, F>(
  o: Option<T>,
  handlers: ElseHandlers<T, U, F>,
): U | F

function matchElse<T, U, F>(
  onNoneOrOption: Thunk<U> | Option<T>,
  onSomeOrHandlers: UnaryFn<T, F> | ElseHandlers<T, U, F>,
) {
  if (
    typeof onNoneOrOption === "function" &&
    typeof onSomeOrHandlers === "function"
  ) {
    return (o: Option<T>) =>
      isNone(o) ? onNoneOrOption() : onSomeOrHandlers(o.value)
  }

  if ("tag" in onNoneOrOption && "onSome" in onSomeOrHandlers) {
    const { onNone, onSome } = onSomeOrHandlers

    return isNone(onNoneOrOption) ? onNone() : onSome(onNoneOrOption.value)
  }

  throw new Error("Invalid invocation")
}

export { matchElse }
