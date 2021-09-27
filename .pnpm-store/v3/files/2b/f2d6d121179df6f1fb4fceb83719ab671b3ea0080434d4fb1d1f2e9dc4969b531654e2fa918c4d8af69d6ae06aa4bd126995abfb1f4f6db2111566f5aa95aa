import * as React from "react";
import { render } from "reakit-test-utils";
import { Radio, RadioProps } from "../Radio";

const props: RadioProps = {
  value: "radio",
  id: "radio",
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
  const { baseElement } = render(<Radio {...props} />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <input
          aria-checked="false"
          id="radio"
          tabindex="0"
          type="radio"
          value="radio"
        />
      </div>
    </body>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { baseElement } = render(<Radio id="radio" value="radio" />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <input
          aria-checked="false"
          id="radio"
          tabindex="0"
          type="radio"
          value="radio"
        />
      </div>
    </body>
  `);
});
