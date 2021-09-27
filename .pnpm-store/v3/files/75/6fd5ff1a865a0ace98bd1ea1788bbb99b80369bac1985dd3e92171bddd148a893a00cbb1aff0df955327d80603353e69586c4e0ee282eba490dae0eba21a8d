import * as React from "react";
import { SystemContext } from "./SystemContext";

/**
 * React custom hook that returns the value of any token defined in the
 * SystemContext. It's mainly used internally in [`useOptions`](#useoptions)
 * and [`useProps`](#useprops).
 *
 * @example
 * import { SystemProvider, useToken } from "reakit-system";
 *
 * const system = {
 *   token: "value",
 * };
 *
 * function Component(props) {
 *   const token = useToken("token", "default value");
 *   return <div {...props}>{token}</div>;
 * }
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <Component />
 *     </SystemProvider>
 *   );
 * }
 */
export function useToken<T = any>(token: string, defaultValue?: T): T {
  React.useDebugValue(token);
  const context = React.useContext(SystemContext);
  return context[token] != null ? context[token] : defaultValue;
}
