import * as React from "react";
import { render } from "reakit-test-utils";
import { ToolbarSeparator } from "../ToolbarSeparator";

test("render", () => {
  const { baseElement } = render(<ToolbarSeparator />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <hr
          aria-orientation="horizontal"
          role="separator"
        />
      </div>
    </body>
  `);
});

test("render orientation", () => {
  const { baseElement } = render(<ToolbarSeparator orientation="horizontal" />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <hr
          aria-orientation="vertical"
          role="separator"
        />
      </div>
    </body>
  `);
});
