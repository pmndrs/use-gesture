import { isObject } from "reakit-utils/isObject";
import { DeepMap } from "../__utils/types";

export function unstable_setAllIn<T, V>(object: T, value: V) {
  const typedObject = object as Record<string, any>;
  const result = {} as Record<any, any>;
  const keys = Object.keys(object);

  for (const key of keys) {
    const val = typedObject[key];

    if (Array.isArray(val)) {
      result[key] = val.map((v) => {
        if (isObject(v)) {
          return unstable_setAllIn(v, value);
        }
        return value;
      });
    } else if (isObject(val)) {
      result[key] = unstable_setAllIn(val, value);
    } else {
      result[key] = value;
    }
  }

  return result as DeepMap<T, V>;
}
