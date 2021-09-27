/**
 * Splits an object (`props`) into a tuple where the first item
 * is the `state` property, and the second item is the rest of the properties.
 *
 * It is also backward compatible with version 1. If `keys` are passed then
 * splits an object (`props`) into a tuple where the first item is an object
 * with the passed `keys`, and the second item is an object with these keys
 * omitted.
 *
 * @example
 * import { splitProps } from "reakit-utils";
 *
 * splitProps({ a: "a", b: "b" }, ["a"]); // [{ a: "a" }, { b: "b" }]
 *
 * @example
 * import { splitProps } from "reakit-utils";
 *
 * splitProps({ state: { a: "a" }, b: "b" }); // [{ a: "a" }, { b: "b" }]
 */
export declare function splitProps<T extends Record<string, any>, K extends keyof T>(props: T, keys?: ReadonlyArray<K> | Array<K>): [{
    [P in K]: T["state"][P];
}, Omit<T, K>];
