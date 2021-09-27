import * as React from "react";
import { render } from "reakit-test-utils";
import { Popover } from "../Popover";

const props: Parameters<typeof Popover>[0] = {
  baseId: "base",
  "aria-label": "popover",
};

test("render", () => {
  const { baseElement } = render(<Popover {...props}>popover</Popover>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="popover"
          data-dialog="true"
          hidden=""
          id="base"
          role="dialog"
          style="display: none;"
          tabindex="-1"
        >
          popover
        </div>
      </div>
    </body>
  `);
});

test("render visible", () => {
  const { baseElement } = render(
    <Popover {...props} visible>
      popover
    </Popover>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="popover"
          data-dialog="true"
          id="base"
          role="dialog"
          tabindex="-1"
        >
          popover
        </div>
      </div>
    </body>
  `);
});

test("render modal", () => {
  const { baseElement } = render(
    <Popover {...props} modal>
      test
    </Popover>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        <div
          aria-label="popover"
          aria-modal="true"
          data-dialog="true"
          hidden=""
          id="base"
          role="dialog"
          style="display: none;"
          tabindex="-1"
        >
          test
        </div>
      </div>
    </body>
  `);
});
