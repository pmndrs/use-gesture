import * as React from "react";
import { render } from "reakit-test-utils";
import { DialogBackdrop } from "../DialogBackdrop";

test("render", () => {
  const { baseElement } = render(<DialogBackdrop baseId="dialog" />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        <div
          data-dialog-ref="dialog"
          hidden=""
          style="display: none;"
        />
      </div>
    </body>
  `);
});

test("render visible", () => {
  const { baseElement } = render(<DialogBackdrop baseId="dialog" visible />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
      <div
        class="__reakit-portal"
      >
        <div
          data-dialog-ref="dialog"
        />
      </div>
    </body>
  `);
});

test("render no modal", () => {
  const { container } = render(
    <DialogBackdrop baseId="dialog" modal={false} />
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        data-dialog-ref="dialog"
        hidden=""
        style="display: none;"
      />
    </div>
  `);
});
