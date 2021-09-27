import * as React from "react";
import { render } from "reakit-test-utils";
import { VisuallyHidden } from "../VisuallyHidden";

test("render", () => {
  const { baseElement } = render(<VisuallyHidden />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <span
          style="border: 0px; height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; white-space: nowrap; width: 1px;"
        />
      </div>
    </body>
  `);
});
