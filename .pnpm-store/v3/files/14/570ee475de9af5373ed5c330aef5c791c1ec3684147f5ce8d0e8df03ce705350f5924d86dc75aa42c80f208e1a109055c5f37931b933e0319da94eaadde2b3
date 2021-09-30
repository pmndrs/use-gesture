export function pick<K extends string, T extends { [k in K]: unknown }>(object: T, keys: K[]) {
  return keys.reduce((obj, key) => {
    if (!!object && object.hasOwnProperty(key)) {
      obj[key] = object[key]
    }
    return obj
  }, {} as { [k in K]: T[k] })
}

export function omit<K extends string, T extends { [k in K]: unknown }>(object: T, keys: K[]) {
  const obj = { ...object }
  keys.forEach((k) => k in object && delete obj[k])
  return obj
}
export function mapArrayToKeys<U extends any, K extends string>(value: U[], keys: K[]): Record<K, U> {
  return value.reduce((acc, v, i) => Object.assign(acc, { [keys[i]]: v }), {} as any)
}

export function isObject(variable: any) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}
