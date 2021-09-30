/**
 * Lightweight thenable implementation that is entirely self-contained within a single
 * function with no external dependencies so it can be easily shipped across to a WorkerModule.
 *
 * This implementation conforms fully to the Promises/A+ spec so it can safely interoperate
 * with other thenable implementations. https://github.com/promises-aplus/promises-spec
 *
 * *However*, it is _not_ a full implementation of ES2015 Promises, e.g. it does not
 * have the same constructor signature and does not expose a `catch` method or the static
 * `resolve`/`reject`/`all`/`race` initializer methods. If you need to hand a Thenable
 * instance off to consuming code that may expect a true Promise, you'll want to wrap it
 * in a native-or-polyfilled Promise first.
 *
 * (Why yet another Promises/A+ implementation? Great question. We needed a polyfill-like
 * thing that was (a) wrapped in a single function for easy serialization across to a Worker,
 * and (b) was as small as possible -- at ~900B minified (~500B gzipped) this is the smallest
 * implementation I've found. And also, exercises like this are challenging and fun.)
 */
export function BespokeThenable() {
  let state = 0 // 0=pending, 1=fulfilled, -1=rejected
  let queue = []
  let value
  let scheduled = 0
  let completeCalled = 0

  function then(onResolve, onReject) {
    const nextThenable = BespokeThenable()

    function handleNext() {
      const cb = state > 0 ? onResolve : onReject
      if (isFn(cb)) {
        try {
          const result = cb(value)
          if (result === nextThenable) {
            recursiveError()
          }
          const resultThen = getThenableThen(result)
          if (resultThen) {
            resultThen.call(result, nextThenable.resolve, nextThenable.reject)
          } else {
            nextThenable.resolve(result)
          }
        } catch (err) {
          nextThenable.reject(err)
        }
      } else {
        nextThenable[state > 0 ? 'resolve' : 'reject'](value)
      }
    }

    queue.push(handleNext)
    if (state) {
      scheduleQueueFlush()
    }
    return nextThenable
  }

  const resolve = oneTime(val => {
    if (!completeCalled) {
      complete(1, val)
    }
  })

  const reject = oneTime(reason => {
    if (!completeCalled) {
      complete(-1, reason)
    }
  })

  function complete(st, val) {
    completeCalled++
    let ignoreThrow = 0
    try {
      if (val === thenableObj) {
        recursiveError()
      }
      const valThen = st > 0 && getThenableThen(val)
      if (valThen) {
        valThen.call(val, oneTime(v => {
          ignoreThrow++
          complete(1, v)
        }), oneTime(v => {
          ignoreThrow++
          complete(-1, v)
        }))
      } else {
        state = st
        value = val
        scheduleQueueFlush()
      }
    } catch(e) {
      if (!state && !ignoreThrow) {
        complete(-1, e)
      }
    }
  }

  function scheduleQueueFlush() {
    if (!scheduled) {
      setTimeout(flushQueue, 0) //TODO setImmediate or postMessage approach if available?
      scheduled = 1
    }
  }

  function flushQueue() {
    const q = queue
    scheduled = 0
    queue = []
    q.forEach(callIt)
  }

  function callIt(fn) {
    fn()
  }

  function getThenableThen(val) {
    const valThen = val && (isFn(val) || typeof val === 'object') && val.then
    return isFn(valThen) && valThen
  }

  function oneTime(fn) {
    let called = 0
    return function(...args) {
      if (!called++) {
        fn.apply(this, args)
      }
    }
  }

  function recursiveError() {
    throw new TypeError('Chaining cycle detected')
  }

  const isFn = v => typeof v === 'function'

  const thenableObj = {
    then,
    resolve,
    reject
  }
  return thenableObj
}


/**
 * Thenable implementation that uses a native Promise under the covers. This implementation
 * is preferred if Promise is available, for better performance and dev tools integration.
 * @constructor
 */
export function NativePromiseThenable() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {
    then: promise.then.bind(promise),
    resolve,
    reject
  }
}

/**
 * Promise.all() impl:
 */
BespokeThenable.all = NativePromiseThenable.all = function(items) {
  let resultCount = 0
  let results = []
  let out = DefaultThenable()
  if (items.length === 0) {
    out.resolve([])
  } else {
    items.forEach((item, i) => {
      let itemThenable = DefaultThenable()
      itemThenable.resolve(item)
      itemThenable.then(res => {
        resultCount++
        results[i] = res
        if (resultCount === items.length) {
          out.resolve(results)
        }
      }, out.reject)
    })
  }
  return out
}


/**
 * Choose the best Thenable implementation and export it as the default.
 */
const DefaultThenable = typeof Promise === 'function' ? NativePromiseThenable : BespokeThenable
export default DefaultThenable

