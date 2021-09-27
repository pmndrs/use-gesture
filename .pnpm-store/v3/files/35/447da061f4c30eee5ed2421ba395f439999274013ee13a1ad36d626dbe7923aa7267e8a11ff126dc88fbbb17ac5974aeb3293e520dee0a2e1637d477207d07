export declare class FatalError extends Error {
    scope: string;
    constructor(message: string, scope: string);
}
export declare class BatchError extends Error {
    errors: FatalError[];
    constructor(errors: FatalError[]);
}
export declare class ScopelessError extends Error {
}
export declare class UnexpectedBuildError extends FatalError {
    constructor(error: Error, pkgName: string);
}
export declare class FixableError extends FatalError {
}
