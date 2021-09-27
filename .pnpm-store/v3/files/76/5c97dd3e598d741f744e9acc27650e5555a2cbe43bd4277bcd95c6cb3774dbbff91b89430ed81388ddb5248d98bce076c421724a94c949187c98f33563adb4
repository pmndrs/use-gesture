import { Shape } from '../utils/match-shape';
import { Predicate, PredicateOptions } from './predicate';
export { Shape };
export declare class ObjectPredicate extends Predicate<object> {
    /**
    @hidden
    */
    constructor(options?: PredicateOptions);
    /**
    Test if an Object is a plain object.
    */
    get plain(): this;
    /**
    Test an object to be empty.
    */
    get empty(): this;
    /**
    Test an object to be not empty.
    */
    get nonEmpty(): this;
    /**
    Test all the values in the object to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    valuesOfType<T>(predicate: Predicate<T>): this;
    /**
    Test all the values in the object deeply to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    deepValuesOfType<T>(predicate: Predicate<T>): this;
    /**
    Test an object to be deeply equal to the provided object.

    @param expected - Expected object to match.
    */
    deepEqual(expected: object): this;
    /**
    Test an object to be of a specific instance type.

    @param instance - The expected instance type of the object.
    */
    instanceOf(instance: Function): this;
    /**
    Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that should be present in the object.
    */
    hasKeys(...keys: readonly string[]): this;
    /**
    Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that could be a key in the object.
    */
    hasAnyKeys(...keys: readonly string[]): this;
    /**
    Test an object to match the `shape` partially. This means that it ignores unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    const object = {
        unicorn: '🦄',
        rainbow: '🌈'
    };

    ow(object, ow.object.partialShape({
        unicorn: ow.string
    }));
    ```
    */
    partialShape(shape: Shape): this;
    /**
    Test an object to match the `shape` exactly. This means that will fail if it comes across unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    ow({unicorn: '🦄'}, ow.object.exactShape({
        unicorn: ow.string
    }));
    ```
    */
    exactShape(shape: Shape): this;
}
