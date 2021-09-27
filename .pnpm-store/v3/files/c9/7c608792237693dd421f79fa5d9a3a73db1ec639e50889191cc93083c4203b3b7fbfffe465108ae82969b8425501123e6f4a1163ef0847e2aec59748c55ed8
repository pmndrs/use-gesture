import * as React from "react";
import { renderHook } from "reakit-test-utils/hooks";
import { useToken } from "../useToken";
import { SystemProvider, SystemProviderProps } from "../SystemProvider";
import { SystemContextType } from "../SystemContext";

function render(
  system: SystemContextType,
  ...args: Parameters<typeof useToken>
) {
  return renderHook(() => useToken(...args), {
    wrapper: (props: SystemProviderProps) => (
      <SystemProvider
        {...props}
        unstable_system={props.unstable_system || system}
      />
    ),
  }).result;
}

test("useToken", () => {
  const result = render({ a: "a" }, "a");
  expect(result.current).toBe("a");
});

test("default value", () => {
  const result = render({ a: "a" }, "b", "b");
  expect(result.current).toBe("b");
});
