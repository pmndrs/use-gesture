import * as React from "react";
import { render } from "reakit-test-utils";
import { Tooltip } from "../Tooltip";

test("render", () => {
  const { baseElement } = render(<Tooltip id="base">tooltip</Tooltip>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        <div
          hidden=""
          id="base"
          role="tooltip"
          style="display: none; pointer-events: none;"
        >
          tooltip
        </div>
      </div>
    </body>
  `);
});

test("render visible", () => {
  const { baseElement } = render(
    <Tooltip id="base" visible>
      tooltip
    </Tooltip>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        <div
          id="base"
          role="tooltip"
          style="pointer-events: none;"
        >
          tooltip
        </div>
      </div>
    </body>
  `);
});

test("render without portal", () => {
  const { baseElement } = render(
    <Tooltip unstable_portal={false} id="base">
      tooltip
    </Tooltip>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          hidden=""
          id="base"
          role="tooltip"
          style="display: none; pointer-events: none;"
        >
          tooltip
        </div>
      </div>
    </body>
  `);
});
