import * as React from "react";
import { renderHook } from "reakit-test-utils/hooks";
import { useProps } from "../useProps";
import { SystemProvider, SystemProviderProps } from "../SystemProvider";
import { SystemContextType } from "../SystemContext";

function render(
  system: SystemContextType,
  ...args: Parameters<typeof useProps>
) {
  return renderHook(() => useProps(...args), {
    wrapper: (props: SystemProviderProps) => (
      <SystemProvider
        {...props}
        unstable_system={props.unstable_system || system}
      />
    ),
  }).result;
}

test("useProps", () => {
  const result = render(
    {
      useAProps: (options: { a: string }) => options.a,
    },
    "A",
    { a: "a" }
  );
  expect(result.current).toBe("a");
});

test("default return", () => {
  const result = render({}, "A", undefined, { id: "id" });
  expect(result.current).toEqual({ id: "id" });
});
