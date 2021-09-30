import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuBar } from "../MenuBar";

const props: Parameters<typeof MenuBar>[0] = {
  baseId: "base",
  items: [],
  setCurrentId: jest.fn(),
  move: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  "aria-label": "menu",
};

test("render", () => {
  const { baseElement } = render(<MenuBar {...props} />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="menu"
          id="base"
          role="menubar"
        />
      </div>
    </body>
  `);
});
