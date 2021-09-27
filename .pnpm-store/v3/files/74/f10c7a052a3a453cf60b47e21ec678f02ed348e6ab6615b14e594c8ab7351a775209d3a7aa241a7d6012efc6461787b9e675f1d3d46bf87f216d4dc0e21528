import * as React from "react";
import { SystemContextType, SystemContext } from "./SystemContext";

export type SystemProviderProps = {
  children: React.ReactNode;
  unstable_system: SystemContextType;
};

/**
 * Provider component that is used by `reakit`'s `Provider` underneath.
 *
 * @example
 * // instead of using
 * import { Provider } from "reakit";
 * // you can use this
 * import { SystemProvider } from "reakit-system";
 * // reakit's Provider has more features, such as ID generation
 * import * as system from "reakit-system-bootstrap";
 *
 * function App() {
 *   return (
 *     <SystemProvider unstable_system={system}>
 *       <div>App</div>
 *     </SystemProvider>
 *   );
 * }
 *
 * @param props
 */
export function SystemProvider({
  children,
  unstable_system: system,
}: SystemProviderProps) {
  return (
    <SystemContext.Provider value={system}>{children}</SystemContext.Provider>
  );
}
