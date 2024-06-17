import type { UnaryFn } from "../func.js"
import type { Option } from "./option.js"
import { isNone, some } from "./option.js"

function map<T, U>(f: UnaryFn<T, U>): (o: Option<T>) => Option<U>
function map<T, U>(o: Option<T>, f: UnaryFn<T, U>): Option<U>

function map<T, U>(
  funcOrOption: UnaryFn<T, U> | Option<T>,
  funcOrNothing?: UnaryFn<T, U>,
) {
  if (typeof funcOrOption === "function") {
    return (o: Option<T>) => (isNone(o) ? o : some(funcOrOption(o.value)))
  }

  if (typeof funcOrNothing === "function") {
    return isNone(funcOrOption)
      ? funcOrOption
      : some(funcOrNothing(funcOrOption.value))
  }

  throw new Error("Invalid invocation")
}

export { map }

// mapOr - def value
// mapElse - def function
