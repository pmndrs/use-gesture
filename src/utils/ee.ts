type Handler<T> = (data: T) => void

export const TinyEmitter = <T>(S = new Set<Handler<T>>()) => ({
  listen: (fn: Handler<T>) => {
    S.add(fn)
  },
  unlisten: (fn: Handler<T>) => {
    S.delete(fn)
  },
  emit: (data: T) => {
    for (let h of S) h(data)
  },
})
