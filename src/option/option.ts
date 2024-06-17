type None = Readonly<{
  tag: "None"
}>

type Some<T> = Readonly<{
  tag: "Some"
  value: T
}>

export type Option<T> = None | Some<T>

export const none = (): Option<never> => ({ tag: "None" })
export const isNone = (o: Option<unknown>): o is None => o.tag === "None"

export const some = <T>(v: T): Option<T> => ({ tag: "Some", value: v })
export const isSome = <T>(o: Option<T>): o is Some<T> => o.tag === "Some"
