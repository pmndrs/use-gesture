type Handler<T> = (data: T) => void

export default function EE<T>() {
  let S = new Set<Handler<T>>()

  return {
    listen: (fn: Handler<T>) => {
      S.add(fn)
    },
    unlisten: (fn: Handler<T>) => {
      S.delete(fn)
    },
    emit: (data: T) => {
      for (let h of S) h(data)
    },
  }
}
