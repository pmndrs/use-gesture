import { renderHook } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";
import { useTabState, TabInitialState } from "../TabState";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render({ baseId = "base", ...initialState }: TabInitialState = {}) {
  return renderHook(() => useTabState({ baseId, ...initialState })).result;
}

test("initial state", () => {
  const result = render();
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "baseId": "base",
      "currentId": undefined,
      "groups": Array [],
      "items": Array [],
      "loop": true,
      "manual": false,
      "orientation": undefined,
      "panels": Array [],
      "rtl": false,
      "selectedId": undefined,
      "shift": false,
      "unstable_hasActiveWidget": false,
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "unstable_includesBaseElement": false,
      "unstable_moves": 0,
      "unstable_virtual": false,
      "wrap": false,
    }
  `);
});
