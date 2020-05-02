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

export function LifeTimeNotify<T>() {
  const ctx: any = {}

  ctx.promise = new Promise(resolve => {
    ctx.resolve = resolve
  })

  function emit(data: T) {
    if (ctx.resolve) return ctx.resolve(data)
    setTimeout(ctx.resolve, 1, data)
  }

  function once(handler: any) {
    ctx.promise.then(handler)
  }

  return [emit, once]
}
