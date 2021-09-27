import * as React from "react";
import { useToken } from "./useToken";

/**
 * React custom hook that returns the options returned by a given
 * `use${name}Options` in the SystemContext.
 *
 * @example
 * import React from "react";
 * import { SystemProvider, useOptions } from "reakit-system";
 *
 * const system = {
 *   useAOptions(options, htmlProps) {
 *     return {
 *       ...options,
 *       url: htmlProps.href,
 *     };
 *   },
 * };
 *
 * function A({ url, ...htmlProps }) {
 *   const options = useOptions("A", { url }, htmlProps);
 *   return <a href={options.url} {...htmlProps} />;
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <A href="url">
 *         It will convert href into url in useAOptions and then url into href in A
 *       </A>
 *     </SystemProvider>
 *   );
 * }
 */
export function useOptions<T = {}>(
  name: string,
  options: T = {} as T,
  htmlProps: React.HTMLAttributes<any> & React.RefAttributes<any> = {}
): T {
  const hookName = `use${name}Options`;
  React.useDebugValue(hookName);
  const useHook = useToken(hookName);
  if (useHook) {
    return { ...options, ...useHook(options, htmlProps) };
  }
  return options;
}
