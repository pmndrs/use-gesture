declare type PromiseFn<Response, Args extends any[]> = (...args: Args) => Promise<Response>;
declare function createAsset<Response, Args extends any[]>(fn: PromiseFn<Response, Args>, lifespan?: number): {
    /**
     * @throws Suspense Promise if asset is not yet ready
     * @throws Error if the promise rejected for some reason
     */
    read: (...args: Args) => Response;
    preload: (...args: Args) => void;
    clear: (...args: Args) => void;
    peek: (...args: Args) => void | Response;
};
declare function useAsset<Response, Args extends any[]>(fn: PromiseFn<Response, Args>, ...args: Args): Response;
declare namespace useAsset {
    var lifespan: number;
    var clear: <Args extends any[]>(...args: Args) => void;
    var preload: <Response_1, Args extends any[]>(fn: PromiseFn<Response_1, Args>, ...args: Args) => undefined;
    var peek: <Response_1, Args extends any[]>(...args: Args) => Response_1;
}
export { createAsset, useAsset };
