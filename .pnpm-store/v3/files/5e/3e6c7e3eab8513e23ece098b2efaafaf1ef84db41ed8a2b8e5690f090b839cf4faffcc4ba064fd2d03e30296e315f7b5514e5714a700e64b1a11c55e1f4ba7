import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuItem } from "../MenuItem";

const props: Parameters<typeof MenuItem>[0] = {
  id: "item",
  items: [],
  currentId: null,
  registerItem: jest.fn(),
  unregisterItem: jest.fn(),
  setCurrentId: jest.fn(),
  move: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  up: jest.fn(),
  down: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<MenuItem {...props}>item</MenuItem>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          id="item"
          role="menuitem"
          tabindex="0"
        >
          item
        </button>
      </div>
    </body>
  `);
});
