import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuItemRadio } from "../MenuItemRadio";

const props: Parameters<typeof MenuItemRadio>[0] = {
  name: "radio",
  value: "radio",
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
  const { baseElement } = render(<MenuItemRadio {...props} />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-checked="false"
          id="item"
          role="menuitemradio"
          tabindex="0"
        />
      </div>
    </body>
  `);
});
