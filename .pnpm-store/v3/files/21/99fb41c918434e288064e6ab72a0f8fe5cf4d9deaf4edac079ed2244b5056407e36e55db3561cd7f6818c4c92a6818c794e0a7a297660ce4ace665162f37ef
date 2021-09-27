import * as React from "react";
import {
  SystemProviderProps,
  SystemProvider,
} from "reakit-system/SystemProvider";
import { unstable_IdProvider as IdProvider } from "./Id/IdProvider";

export type ProviderProps = Partial<SystemProviderProps> & {
  unstable_prefix?: string;
};

const defaultSystem = {};

export function Provider({
  unstable_prefix: prefix,
  unstable_system: system = defaultSystem,
  children,
}: ProviderProps) {
  return (
    <IdProvider prefix={prefix}>
      <SystemProvider unstable_system={system}>{children}</SystemProvider>
    </IdProvider>
  );
}
