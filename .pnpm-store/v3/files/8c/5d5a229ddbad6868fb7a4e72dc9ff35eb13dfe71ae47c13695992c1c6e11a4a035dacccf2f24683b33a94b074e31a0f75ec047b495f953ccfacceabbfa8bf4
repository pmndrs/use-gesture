/// <reference types="node" />
import { TypedArray } from 'type-fest';
import { StringPredicate } from './predicates/string';
import { NumberPredicate } from './predicates/number';
import { BooleanPredicate } from './predicates/boolean';
import { Predicate, PredicateOptions } from './predicates/predicate';
import { ArrayPredicate } from './predicates/array';
import { ObjectPredicate, Shape } from './predicates/object';
import { DatePredicate } from './predicates/date';
import { ErrorPredicate } from './predicates/error';
import { MapPredicate } from './predicates/map';
import { WeakMapPredicate } from './predicates/weak-map';
import { SetPredicate } from './predicates/set';
import { WeakSetPredicate } from './predicates/weak-set';
import { TypedArrayPredicate } from './predicates/typed-array';
import { ArrayBufferPredicate } from './predicates/array-buffer';
import { DataViewPredicate } from './predicates/data-view';
import { BasePredicate } from './predicates/base-predicate';
import { AnyPredicate } from './predicates/any';
export interface Predicates {
    /**
    Test the value to be a string.
    */
    readonly string: StringPredicate;
    /**
    Test the value to be a number.
    */
    readonly number: NumberPredicate;
    /**
    Test the value to be a boolean.
    */
    readonly boolean: BooleanPredicate;
    /**
    Test the value to be undefined.
    */
    readonly undefined: Predicate<undefined>;
    /**
    Test the value to be null.
    */
    readonly null: Predicate<null>;
    /**
    Test the value to be null or undefined.
    */
    readonly nullOrUndefined: Predicate<null | undefined>;
    /**
    Test the value to be not a number.
    */
    readonly nan: Predicate<number>;
    /**
    Test the value to be a Symbol.
    */
    readonly symbol: Predicate<symbol>;
    /**
    Test the value to be an array.
    */
    readonly array: ArrayPredicate;
    /**
    Test the value to be an object.
    */
    readonly object: ObjectPredicate;
    /**
    Test the value to be a Date.
    */
    readonly date: DatePredicate;
    /**
    Test the value to be an Error.
    */
    readonly error: ErrorPredicate;
    /**
    Test the value to be a Map.
    */
    readonly map: MapPredicate;
    /**
    Test the value to be a WeakMap.
    */
    readonly weakMap: WeakMapPredicate;
    /**
    Test the value to be a Set.
    */
    readonly set: SetPredicate;
    /**
    Test the value to be a WeakSet.
    */
    readonly weakSet: WeakSetPredicate;
    /**
    Test the value to be a Function.
    */
    readonly function: Predicate<Function>;
    /**
    Test the value to be a Buffer.
    */
    readonly buffer: Predicate<Buffer>;
    /**
    Test the value to be a RegExp.
    */
    readonly regExp: Predicate<RegExp>;
    /**
    Test the value to be a Promise.
    */
    readonly promise: Predicate<Promise<unknown>>;
    /**
    Test the value to be a typed array.
    */
    readonly typedArray: TypedArrayPredicate<TypedArray>;
    /**
    Test the value to be a Int8Array.
    */
    readonly int8Array: TypedArrayPredicate<Int8Array>;
    /**
    Test the value to be a Uint8Array.
    */
    readonly uint8Array: TypedArrayPredicate<Uint8Array>;
    /**
    Test the value to be a Uint8ClampedArray.
    */
    readonly uint8ClampedArray: TypedArrayPredicate<Uint8ClampedArray>;
    /**
    Test the value to be a Int16Array.
    */
    readonly int16Array: TypedArrayPredicate<Int16Array>;
    /**
    Test the value to be a Uint16Array.
    */
    readonly uint16Array: TypedArrayPredicate<Uint16Array>;
    /**
    Test the value to be a Int32Array.
    */
    readonly int32Array: TypedArrayPredicate<Int32Array>;
    /**
    Test the value to be a Uint32Array.
    */
    readonly uint32Array: TypedArrayPredicate<Uint32Array>;
    /**
    Test the value to be a Float32Array.
    */
    readonly float32Array: TypedArrayPredicate<Float32Array>;
    /**
    Test the value to be a Float64Array.
    */
    readonly float64Array: TypedArrayPredicate<Float64Array>;
    /**
    Test the value to be a ArrayBuffer.
    */
    readonly arrayBuffer: ArrayBufferPredicate<ArrayBuffer>;
    /**
    Test the value to be a SharedArrayBuffer.
    */
    readonly sharedArrayBuffer: ArrayBufferPredicate<SharedArrayBuffer>;
    /**
    Test the value to be a DataView.
    */
    readonly dataView: DataViewPredicate;
    /**
    Test the value to be Iterable.
    */
    readonly iterable: Predicate<Iterable<unknown>>;
    /**
    Test that the value matches at least one of the given predicates.
    */
    any<T1>(p1: BasePredicate<T1>): AnyPredicate<T1>;
    any<T1, T2>(p1: BasePredicate<T1>, p2: BasePredicate<T2>): AnyPredicate<T1 | T2>;
    any<T1, T2, T3>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>): AnyPredicate<T1 | T2 | T3>;
    any<T1, T2, T3, T4>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>): AnyPredicate<T1 | T2 | T3 | T4>;
    any<T1, T2, T3, T4, T5>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>): AnyPredicate<T1 | T2 | T3 | T4 | T5>;
    any<T1, T2, T3, T4, T5, T6>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6>;
    any<T1, T2, T3, T4, T5, T6, T7>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
    any<T1, T2, T3, T4, T5, T6, T7, T8>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>, p8: BasePredicate<T8>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
    any<T1, T2, T3, T4, T5, T6, T7, T8, T9>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>, p8: BasePredicate<T8>, p9: BasePredicate<T9>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
    any<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>, p8: BasePredicate<T8>, p9: BasePredicate<T9>, p10: BasePredicate<T10>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
    any(...predicate: BasePredicate[]): AnyPredicate;
}
declare const _default: <T>(object: T, options?: PredicateOptions | undefined) => T & Predicates;
export default _default;
export { StringPredicate, NumberPredicate, BooleanPredicate, ArrayPredicate, ObjectPredicate, DatePredicate, ErrorPredicate, MapPredicate, WeakMapPredicate, SetPredicate, WeakSetPredicate, TypedArrayPredicate, ArrayBufferPredicate, DataViewPredicate, AnyPredicate, Shape };
