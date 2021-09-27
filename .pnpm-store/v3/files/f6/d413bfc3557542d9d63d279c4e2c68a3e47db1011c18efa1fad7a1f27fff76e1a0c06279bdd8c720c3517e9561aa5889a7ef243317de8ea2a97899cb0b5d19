import { isPlainObject } from "reakit-utils/isPlainObject";

export function filterAllEmpty<T extends Record<any, any> | Array<any>>(
  object: T
): T {
  if (Array.isArray(object)) {
    return object.filter((value) => {
      if (isPlainObject(value) || Array.isArray(value)) {
        return filterAllEmpty(value);
      }
      return true;
    }) as T;
  }

  const result = {} as T;
  const keys = Object.keys(object);

  for (const key of keys) {
    const k = key as keyof T;
    const value = object[k];
    result[k] =
      isPlainObject(value) || Array.isArray(value)
        ? filterAllEmpty(value)
        : object[k];
  }

  return result;
}
