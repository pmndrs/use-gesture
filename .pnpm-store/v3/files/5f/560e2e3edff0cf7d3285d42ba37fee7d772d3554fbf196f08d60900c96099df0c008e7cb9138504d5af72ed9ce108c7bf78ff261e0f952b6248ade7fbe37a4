/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when passed
 * as a dependency.
 */
export declare function useStableCallback<T extends (...args: any[]) => any>(callback: T | null | undefined): T;
/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when passed
 * as a dependency.
 *
 * Use this over `useStableCallback` when you want the callback to be cached in
 * `useLayoutEffect` instead of `useEffect` to deal with timing issues only when
 * needed.
 */
export declare function useStableLayoutCallback<T extends (...args: any[]) => any>(callback: T | null | undefined): T;
