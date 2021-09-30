import { DeepPath, DeepPathValue } from "../__utils/types";

export function unstable_getIn<
  T extends Record<any, any>,
  P extends DeepPath<T, P>,
  D
>(object: T, path: P, defaultValue: D): D;

export function unstable_getIn<
  T extends Record<any, any>,
  P extends DeepPath<T, P>
>(object: T, path: P, defaultValue?: any): DeepPathValue<T, P> | undefined;

export function unstable_getIn(
  object: Record<any, any>,
  path: string | any[],
  defaultValue?: any
) {
  if (typeof path === "string") {
    return object[path] == null ? defaultValue : object[path];
  }
  let result = object;
  for (const key of path) {
    if (!(key in result)) return defaultValue;
    result = result[key];
  }
  if (result == null) {
    return defaultValue;
  }
  return result;
}
