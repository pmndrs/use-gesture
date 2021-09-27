import * as React from "react";
import { render } from "reakit-test-utils";
import { Portal } from "../Portal";

test("render", () => {
  const { baseElement } = render(<Portal>portal</Portal>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        portal
      </div>
    </body>
  `);
});

test("render nested", () => {
  const { baseElement } = render(
    <Portal>
      portal1
      <Portal>portal2</Portal>
    </Portal>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        portal1
        <div
          class="__reakit-portal"
        >
          portal2
        </div>
      </div>
    </body>
  `);
});

test("render nested and sibling", () => {
  const { baseElement } = render(
    <>
      <Portal>
        portal1
        <Portal>portal2</Portal>
      </Portal>
      <Portal>portal3</Portal>
    </>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        portal1
        <div
          class="__reakit-portal"
        >
          portal2
        </div>
      </div>
      <div
        class="__reakit-portal"
      >
        portal3
      </div>
    </body>
  `);
});
