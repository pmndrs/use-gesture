/** Action is an interface that has a sys.status to be checked against */
interface Action extends Record<string, any> {
    sys: {
        status: string;
        type: string;
    };
}
export declare class AsyncActionProcessingError extends Error {
    action?: Action;
    constructor(message: string, action?: Action);
}
export declare class AsyncActionFailedError extends AsyncActionProcessingError {
}
export declare type AsyncActionProcessingOptions = {
    /** The amount of times to retry.
     * @default 30
     * */
    retryCount?: number;
    /** The interval between retries, in milliseconds (ms).
     * @default 2000 (2s)
     * */
    retryIntervalMs?: number;
    /**
     * Initial delay in milliseconds when performing the first check.
     * This is used to prevent short running bulkActions of waiting too long for a result.
     * @default 1000 (1s)
     * */
    initialDelayMs?: number;
    /**
     * Throws an error if the Action does not complete with a successful (succeeded) status.
     * @default true
     */
    throwOnFailedExecution?: boolean;
};
/**
 * @description Waits for an Action to be completed and to be in one of the final states (failed or succeeded)
 * @param {Function} actionFunction - GET function that will be called every interval to fetch an Action status
 * @throws {ActionFailedError} throws an error if `throwOnFailedExecution = true` with the Action that failed.
 * @throws {AsyncActionProcessingError} throws an error with a Action when processing takes too long.
 */
export declare function pollAsyncActionStatus<T extends Action = any>(actionFunction: () => Promise<T>, options?: AsyncActionProcessingOptions): Promise<T>;
export {};
