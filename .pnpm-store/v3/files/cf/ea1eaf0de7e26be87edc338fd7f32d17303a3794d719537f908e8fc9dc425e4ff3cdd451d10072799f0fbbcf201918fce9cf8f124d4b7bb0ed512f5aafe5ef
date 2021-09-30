import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuItemCheckbox } from "../MenuItemCheckbox";

const props: Parameters<typeof MenuItemCheckbox>[0] = {
  name: "checkbox",
  id: "item",
  items: [],
  currentId: null,
  registerItem: jest.fn(),
  unregisterItem: jest.fn(),
  setCurrentId: jest.fn(),
  move: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  up: jest.fn(),
  down: jest.fn(),
  unstable_values: {},
  unstable_setValue: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<MenuItemCheckbox {...props} />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-checked="false"
          id="item"
          name="checkbox"
          role="menuitemcheckbox"
          tabindex="0"
        />
      </div>
    </body>
  `);
});
