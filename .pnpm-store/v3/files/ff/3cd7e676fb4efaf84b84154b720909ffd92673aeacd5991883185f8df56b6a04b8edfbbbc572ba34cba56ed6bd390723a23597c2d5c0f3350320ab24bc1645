import * as React from "react";
import { render } from "reakit-test-utils";
import { Menu } from "../Menu";

function createRef(id: string) {
  const ref = React.createRef() as React.MutableRefObject<HTMLElement>;
  ref.current = document.createElement("div");
  ref.current.id = id;
  return ref;
}

const props: Parameters<typeof Menu>[0] = {
  baseId: "base",
  items: [
    { id: "a", ref: createRef("a") },
    { id: "b", ref: createRef("b") },
  ],
  setCurrentId: jest.fn(),
  move: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  placement: "bottom-start",
  "aria-label": "menu",
};

test("render", () => {
  const { baseElement } = render(<Menu {...props} />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="menu"
          data-dialog="true"
          hidden=""
          id="base"
          role="menu"
          style="display: none;"
          tabindex="-1"
        />
      </div>
    </body>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { baseElement } = render(<Menu id="base" aria-label="menu" />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="menu"
          data-dialog="true"
          hidden=""
          id="base"
          role="menu"
          style="display: none;"
          tabindex="-1"
        />
      </div>
    </body>
  `);
});
