/**
 * Taken from https://github.com/FormidableLabs/react-fast-compare
 *
 * Dropped comments and ArrayBuffer handling
 */

function equal(a: any, b: any): boolean {
  if (a === b) return true

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false

    let length, i, keys
    if (Array.isArray(a)) {
      length = a.length
      if (length !== b.length) return false
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false
      return true
    }

    let it
    if (typeof Map === 'function' && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false
      it = a.entries()
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false
      it = a.entries()
      while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false
      return true
    }

    if (typeof Set === 'function' && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false
      it = a.entries()
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false
      return true
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf()
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString()

    keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false

    for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false

    if (typeof Element !== 'undefined' && a instanceof Element) return false

    for (i = length; i-- !== 0; ) {
      if (keys[i] === '_owner' && a.$$typeof) continue
      if (!equal(a[keys[i]], b[keys[i]])) return false
    }
    return true
  }

  // true if both NaN, false otherwise — NaN !== NaN → true
  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b
}

export default function isEqual(a: any, b: any) {
  try {
    return equal(a, b)
  } catch (error) {
    if ((error.message || '').match(/stack|recursion/i)) {
      // eslint-disable-next-line no-console
      console.warn('react-fast-compare cannot handle circular refs')
      return false
    }
    throw error
  }
}
