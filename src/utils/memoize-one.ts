/**
 * Inlined from https://github.com/alexreardon/memoize-one
 */

export type EqualityFn = (newArgs: any[], lastArgs: any[]) => boolean;

export default function memoizeOne<
  ResultFn extends (this: any, ...newArgs: any[]) => ReturnType<ResultFn>
>(resultFn: ResultFn, isEqual: EqualityFn): ResultFn {
  let lastThis: unknown;
  let lastArgs: unknown[] = [];
  let lastResult: ReturnType<ResultFn>;
  let calledOnce: boolean = false;

  function memoized(this: unknown, ...newArgs: unknown[]): ReturnType<ResultFn> {
    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized as ResultFn;
}