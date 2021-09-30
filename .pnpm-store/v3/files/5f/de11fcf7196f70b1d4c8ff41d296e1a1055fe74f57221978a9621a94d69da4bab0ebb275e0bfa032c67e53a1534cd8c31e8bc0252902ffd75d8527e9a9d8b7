import { Predicate, PredicateOptions } from './predicate';
export declare class ErrorPredicate extends Predicate<Error> {
    /**
    @hidden
    */
    constructor(options?: PredicateOptions);
    /**
    Test an error to have a specific name.

    @param expected - Expected name of the Error.
    */
    name(expected: string): this;
    /**
    Test an error to have a specific message.

    @param expected - Expected message of the Error.
    */
    message(expected: string): this;
    /**
    Test the error message to include a specific message.

    @param message - Message that should be included in the error.
    */
    messageIncludes(message: string): this;
    /**
    Test the error object to have specific keys.

    @param keys - One or more keys which should be part of the error object.
    */
    hasKeys(...keys: readonly string[]): this;
    /**
    Test an error to be of a specific instance type.

    @param instance - The expected instance type of the error.
    */
    instanceOf(instance: Function): this;
    /**
    Test an Error to be a TypeError.
    */
    get typeError(): this;
    /**
    Test an Error to be an EvalError.
    */
    get evalError(): this;
    /**
    Test an Error to be a RangeError.
    */
    get rangeError(): this;
    /**
    Test an Error to be a ReferenceError.
    */
    get referenceError(): this;
    /**
    Test an Error to be a SyntaxError.
    */
    get syntaxError(): this;
    /**
    Test an Error to be a URIError.
    */
    get uriError(): this;
}
