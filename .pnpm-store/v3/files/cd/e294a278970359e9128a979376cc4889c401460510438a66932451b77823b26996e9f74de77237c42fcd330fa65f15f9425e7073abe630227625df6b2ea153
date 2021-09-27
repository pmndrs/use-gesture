/**
 * Picks specific keys from an object.
 *
 * @example
 * import { pick } from "reakit-utils";
 *
 * pick({ a: "a", b: "b" }, ["a"]); // { a: "a" }
 */
export declare function pick<T extends Record<string, any>, K extends keyof T>(object: T, paths: ReadonlyArray<K> | K[]): { [P in K]: T[P]; };
