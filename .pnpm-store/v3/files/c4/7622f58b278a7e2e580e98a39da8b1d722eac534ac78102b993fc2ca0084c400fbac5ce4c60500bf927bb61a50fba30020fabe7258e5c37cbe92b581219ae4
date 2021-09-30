import { renderHook } from "reakit-test-utils/hooks";
import { useSealedState } from "../useSealedState";

test("useSealedState", () => {
  const { result } = renderHook(() => useSealedState({ a: "a", b: "b" }));
  expect(result.current).toEqual({ a: "a", b: "b" });
});
