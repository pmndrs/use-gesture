import { toArray } from "reakit-utils/toArray";
import { isInteger } from "reakit-utils/isInteger";
import { DeepPath, DeepPathArray } from "../__utils/types";

export function unstable_setIn<
  T extends Record<any, any> | Array<any>,
  P extends DeepPath<T, P>
>(object: T, path: P, value: any): T {
  const pathArray = toArray(path) as DeepPathArray<T, P>;
  const [key, ...keys] = pathArray;

  if (key == null) return object;

  const obj = isInteger(key) ? object || [] : object || {};
  const result = keys.length ? unstable_setIn(obj[key], keys, value) : value;

  if (isInteger(key)) {
    if (object) {
      return [
        ...object.slice(0, Number(key)),
        result,
        ...object.slice(Number(key) + 1),
      ] as T;
    }
    return [result] as T;
  }

  return {
    ...object,
    [key]: result,
  };
}
