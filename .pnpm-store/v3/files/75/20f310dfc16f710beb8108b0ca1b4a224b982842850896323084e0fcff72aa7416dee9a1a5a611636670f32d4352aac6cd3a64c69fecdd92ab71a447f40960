import * as React from "react";
import { useToken } from "./useToken";

/**
 * React custom hook that returns the props returned by a given
 * `use${name}Props` in the SystemContext.
 *
 * @example
 * import { SystemProvider, useProps } from "reakit-system";
 *
 * const system = {
 *   useAProps(options, htmlProps) {
 *     return {
 *       ...htmlProps,
 *       href: options.url,
 *     };
 *   },
 * };
 *
 * function A({ url, ...htmlProps }) {
 *   const props = useProps("A", { url }, htmlProps);
 *   return <a {...props} />;
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <A url="url">It will convert url into href in useAProps</A>
 *     </SystemProvider>
 *   );
 * }
 */
export function useProps(
  name: string,
  options: Record<string, any> = {},
  htmlProps: React.HTMLAttributes<any> & React.RefAttributes<any> = {}
): React.HTMLAttributes<any> & React.RefAttributes<any> {
  const hookName = `use${name}Props`;
  React.useDebugValue(hookName);
  const useHook = useToken(hookName);
  if (useHook) {
    return useHook(options, htmlProps);
  }
  return htmlProps;
}
