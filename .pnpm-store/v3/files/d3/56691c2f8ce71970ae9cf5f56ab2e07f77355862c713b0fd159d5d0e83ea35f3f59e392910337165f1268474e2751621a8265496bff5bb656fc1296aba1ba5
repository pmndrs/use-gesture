import { renderHook, act } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";
import { useCheckboxState } from "../CheckboxState";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render(...args: Parameters<typeof useCheckboxState>) {
  return renderHook(() => useCheckboxState(...args)).result;
}

test("initial state", () => {
  const result = render();
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "state": false,
    }
  `);
});

test("initial state", () => {
  const result = render({ state: true });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "state": true,
    }
  `);
});

test("initial state array", () => {
  const result = render({ state: ["a", "b"] });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "state": Array [
        "a",
        "b",
      ],
    }
  `);
});

test("setState", () => {
  const result = render();
  act(() => result.current.setState(true));
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "state": true,
    }
  `);
});
