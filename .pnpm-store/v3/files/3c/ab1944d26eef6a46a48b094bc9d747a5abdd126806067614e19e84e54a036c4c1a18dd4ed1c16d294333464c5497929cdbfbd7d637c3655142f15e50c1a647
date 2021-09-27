export declare class ValueOrPromise<T> {
    private readonly state;
    constructor(executor: () => T | PromiseLike<T> | undefined | null);
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined | null): ValueOrPromise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected: ((reason: unknown) => TResult | PromiseLike<TResult>) | undefined | null): ValueOrPromise<TResult>;
    resolve(): T | PromiseLike<T> | undefined | null;
    static all<T>(valueOrPromises: ReadonlyArray<ValueOrPromise<T>>): ValueOrPromise<Array<T | null | undefined>>;
}
