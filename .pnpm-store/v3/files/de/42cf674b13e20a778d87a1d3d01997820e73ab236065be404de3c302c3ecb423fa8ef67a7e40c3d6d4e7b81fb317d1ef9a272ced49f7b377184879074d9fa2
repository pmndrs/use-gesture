/**
 * Transforms [{ a: "a" }, { a: "b" }] into { a: ["a", "b"] }
 */
export declare function reduceObjects<T extends Record<string, any>>(objects: T[], filter?: (value: T[keyof T], key: keyof T) => boolean): { [K in keyof T]?: T[K][] | undefined; };
