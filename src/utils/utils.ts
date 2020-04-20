export function noop() {}


/**
 * TODO Beware that only optimized cases are covered in tests =)
 * TODO Need to cover general case as well
 * 
 * @param fns 
 */
export function chainFns(...fns: Function[]): Function {
  if (fns.length === 0) return noop;
  if (fns.length === 1) return fns[0];

  return function (this: any) {
    var result;
    for (let fn of fns) {
      result = fn.apply(this, arguments) || result;
    }
    return result;
  }
}


export function ensureVector<T>(value: T | [ T, T ]): [ T, T ] {
  if (!Array.isArray(value)) {
    return [ value, value ]
  } else {
    return value
  }
}

export function withDefault<T>(value:T|undefined, fallback: T): T {
  if (value === undefined) {
    return fallback
  } else {
    return value
  } 
}

export function matchKeysFromObject<T extends object, K extends object>(obj: T, matchingObject: K): Partial<T> {
  const o: Partial<T> = {}
  Object.entries(obj).forEach(
    ([key, value]) => (value !== void 0 || key in matchingObject) && (o[key as keyof T] = value)
  )
  return o
}



export function valueFn<T>(v: T | (() => T)): T {
  if (typeof v === "function") {
    // @ts-ignore
    return v()
  } else {
    return v
  }
}
