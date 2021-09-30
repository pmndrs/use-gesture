import * as React from "react";
import { render } from "reakit-test-utils";
import { PopoverBackdrop } from "../PopoverBackdrop";

test("render", () => {
  const { baseElement } = render(<PopoverBackdrop baseId="popover" />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          data-dialog-ref="popover"
          hidden=""
          style="display: none;"
        />
      </div>
    </body>
  `);
});

test("render visible", () => {
  const { baseElement } = render(<PopoverBackdrop baseId="popover" visible />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          data-dialog-ref="popover"
        />
      </div>
    </body>
  `);
});
