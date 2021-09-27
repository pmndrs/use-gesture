import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuSeparator } from "../MenuSeparator";

test("render", () => {
  const { baseElement } = render(<MenuSeparator />);
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
