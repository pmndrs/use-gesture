import { Remap, Any } from '@react-spring/types';
import { FluidValue } from '@react-spring/shared';
/** Replace the type of each `T` property with `never` (unless compatible with `U`) */
export declare type Valid<T, U> = NeverProps<T, InvalidKeys<T, U>>;
/** Replace the type of each `P` property with `never` */
declare type NeverProps<T, P extends keyof T> = Remap<Pick<T, Exclude<keyof T, P>> & {
    [K in P]: never;
}>;
/** Return a union type of every key whose `T` value is incompatible with its `U` value */
declare type InvalidKeys<T, U> = {
    [P in keyof T & keyof U]: T[P] extends U[P] ? never : P;
}[keyof T & keyof U];
/** Unwrap any `FluidValue` object types */
export declare type RawValues<T extends object> = {
    [P in keyof T]: T[P] extends FluidValue<infer U> ? U : T[P];
};
/**
 * For testing whether a type is an object but not an array.
 *
 *     T extends IsPlainObject<T> ? true : false
 *
 * When `any` is passed, the resolved type is `true | false`.
 */
export declare type IsPlainObject<T> = T extends ReadonlyArray<any> ? Any : T extends object ? object : Any;
export declare type StringKeys<T> = T extends IsPlainObject<T> ? string & keyof T : string;
export {};
