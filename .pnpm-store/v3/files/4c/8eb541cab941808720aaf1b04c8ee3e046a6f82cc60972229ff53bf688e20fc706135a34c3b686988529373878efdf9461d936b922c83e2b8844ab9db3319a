import { renderHook, act } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";
import { useDisclosureState } from "../DisclosureState";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

function render(...args: Parameters<typeof useDisclosureState>) {
  return renderHook(() => useDisclosureState(...args)).result;
}

test("initial state", () => {
  const result = render({ baseId: "base" });
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": false,
    }
  `);
});

test("initial state visible", () => {
  const result = render({ baseId: "base", visible: true });
  expect(result.current).toMatchInlineSnapshot(
    {
      visible: true,
    },
    `
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": true,
    }
  `
  );
});

test("initial state lazy", () => {
  const result = render(() => ({ baseId: "base", visible: true }));
  expect(result.current).toMatchInlineSnapshot(
    {
      visible: true,
    },
    `
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": true,
    }
  `
  );
});

test("show", () => {
  const result = render({ baseId: "base" });
  act(result.current.show);
  expect(result.current).toMatchInlineSnapshot(
    { visible: true },
    `
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": true,
    }
  `
  );
});

test("hide", () => {
  const result = render({ baseId: "base", visible: true });
  act(result.current.hide);
  expect(result.current).toMatchInlineSnapshot(
    { visible: false },
    `
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": false,
    }
  `
  );
});

test("toggle", () => {
  const result = render({ baseId: "base" });
  act(result.current.toggle);
  expect(result.current).toMatchInlineSnapshot(
    { visible: true },
    `
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": true,
    }
  `
  );
});

test("setVisible", () => {
  const result = render({ baseId: "base" });
  act(() => {
    result.current.setVisible(true);
  });
  expect(result.current).toMatchInlineSnapshot(
    { visible: true },
    `
    Object {
      "animated": false,
      "animating": false,
      "baseId": "base",
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "visible": true,
    }
  `
  );
});
