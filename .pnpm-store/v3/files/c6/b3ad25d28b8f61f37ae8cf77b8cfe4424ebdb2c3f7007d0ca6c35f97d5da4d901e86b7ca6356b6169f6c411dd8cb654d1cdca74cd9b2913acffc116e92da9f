import * as React from "react";
import { generateRandomString, defaultPrefix } from "./__utils";

export type unstable_IdProviderProps = {
  children: React.ReactNode;
  prefix?: string;
};

export const unstable_IdContext = React.createContext(generateRandomString);

export function unstable_IdProvider({
  children,
  prefix = defaultPrefix,
}: unstable_IdProviderProps) {
  const count = React.useRef(0);

  const generateId = React.useCallback(
    (localPrefix: string = prefix) =>
      `${localPrefix ? `${localPrefix}-` : ""}${++count.current}`,
    [prefix]
  );
  return (
    <unstable_IdContext.Provider value={generateId}>
      {children}
    </unstable_IdContext.Provider>
  );
}
