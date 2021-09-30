import * as React from "react";
import { render } from "reakit-test-utils";
import { ToolbarItem, ToolbarItemProps } from "../ToolbarItem";

const props: ToolbarItemProps = {
  id: "item",
  items: [],
  currentId: null,
  registerItem: jest.fn(),
  unregisterItem: jest.fn(),
  setCurrentId: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  up: jest.fn(),
  down: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<ToolbarItem {...props}>button</ToolbarItem>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          id="item"
          tabindex="0"
        >
          button
        </button>
      </div>
    </body>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { baseElement } = render(<ToolbarItem id="item">button</ToolbarItem>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          id="item"
          tabindex="0"
        >
          button
        </button>
      </div>
    </body>
  `);
});
