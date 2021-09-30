/**
 * Creates an array like object with specified length
 * @template N Length
 */
export declare type ArrayWithLength<N extends number> = {
    [K in N]: any;
};
/**
 * ["foo", "bar", 0, "baz"]
 * @template T Object with keys { foo: { bar: [{ baz }] } }
 * @template P Path ["foo", "bar", 0, "baz"]
 */
export interface DeepPathArray<T, P> extends ReadonlyArray<string | number> {
    ["0"]?: keyof T;
    ["1"]?: P extends {
        ["0"]: infer K0;
    } ? K0 extends keyof T ? keyof T[K0] : never : never;
    ["2"]?: P extends {
        ["0"]: infer K0;
        ["1"]: infer K1;
    } ? K0 extends keyof T ? K1 extends keyof T[K0] ? keyof T[K0][K1] : never : never : never;
    ["3"]?: P extends {
        ["0"]: infer K0;
        ["1"]: infer K1;
        ["2"]: infer K2;
    } ? K0 extends keyof T ? K1 extends keyof T[K0] ? K2 extends keyof T[K0][K1] ? keyof T[K0][K1][K2] : never : never : never : never;
    ["4"]?: P extends {
        ["0"]: infer K0;
        ["1"]: infer K1;
        ["2"]: infer K2;
        ["3"]: infer K3;
    } ? K0 extends keyof T ? K1 extends keyof T[K0] ? K2 extends keyof T[K0][K1] ? K3 extends keyof T[K0][K1][K2] ? keyof T[K0][K1][K2][K3] : never : never : never : never : never;
    ["5"]?: P extends {
        ["0"]: infer K0;
        ["1"]: infer K1;
        ["2"]: infer K2;
        ["3"]: infer K3;
        ["4"]: infer K4;
    } ? K0 extends keyof T ? K1 extends keyof T[K0] ? K2 extends keyof T[K0][K1] ? K3 extends keyof T[K0][K1][K2] ? K4 extends keyof T[K0][K1][K2][K3] ? keyof T[K0][K1][K2][K3][K4] : never : never : never : never : never : never;
}
/**
 * Returns the value within T object based on given array path
 * @template T Object with keys { foo: { bar: [{ baz }] } }
 * @template P Path ["foo", "bar", 0, "baz"]
 */
export declare type DeepPathArrayValue<T, P extends DeepPathArray<T, P>> = P extends ArrayWithLength<0 | 1 | 2 | 3 | 4 | 5 | 6> ? any : P extends ArrayWithLength<0 | 1 | 2 | 3 | 4 | 5> ? T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]] : P extends ArrayWithLength<0 | 1 | 2 | 3 | 4> ? T[P[0]][P[1]][P[2]][P[3]][P[4]] : P extends ArrayWithLength<0 | 1 | 2 | 3> ? T[P[0]][P[1]][P[2]][P[3]] : P extends ArrayWithLength<0 | 1 | 2> ? T[P[0]][P[1]][P[2]] : P extends ArrayWithLength<0 | 1> ? T[P[0]][P[1]] : P extends ArrayWithLength<0> ? T[P[0]] : never;
/**
 * DeepPath argument
 * @template T Object with keys { foo: { bar: [{ baz }] } }
 * @template P ["foo", "bar", 0, "baz"] or "foo"
 */
export declare type DeepPath<T, P> = DeepPathArray<T, P> | keyof T;
/**
 * DeepPath return
 * @template T Object with keys { foo: { bar: [{ baz }] } }
 * @template P ["foo", "bar", 0, "baz"] or "foo"
 */
export declare type DeepPathValue<T, P extends DeepPath<T, P>> = P extends DeepPathArray<T, P> ? DeepPathArrayValue<T, P> : P extends keyof T ? T[P] : any;
/**
 * @template T Object
 * @template V Value
 */
export declare type DeepMap<T, V> = {
    [K in keyof T]: T[K] extends Array<infer U> | undefined ? U extends object ? Array<DeepMap<U, V>> : object extends U ? Array<DeepMap<U, V>> : Array<V> : T[K] extends object ? DeepMap<T[K], V> : object extends T[K] ? DeepMap<T[K], V> : V;
};
/**
 * @template T Object
 */
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
