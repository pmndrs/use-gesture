import * as React from "react";
import { render } from "reakit-test-utils";
import { TooltipReference } from "../TooltipReference";

const props: Parameters<typeof TooltipReference>[0] = {
  baseId: "base",
  show: jest.fn(),
  hide: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(
    <TooltipReference {...props}>reference</TooltipReference>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-describedby="base"
          tabindex="0"
        >
          reference
        </div>
      </div>
    </body>
  `);
});
