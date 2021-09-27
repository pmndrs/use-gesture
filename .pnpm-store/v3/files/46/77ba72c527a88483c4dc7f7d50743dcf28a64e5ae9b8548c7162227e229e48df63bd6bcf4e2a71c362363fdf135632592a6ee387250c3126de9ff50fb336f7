import * as React from "react";
import { render } from "reakit-test-utils";
import { Toolbar, ToolbarProps } from "../Toolbar";

const props: ToolbarProps = {
  "aria-label": "toolbar",
  baseId: "toolbar",
  currentId: null,
  items: [],
  setCurrentId: jest.fn(),
  move: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<Toolbar {...props}>toolbar</Toolbar>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="toolbar"
          id="toolbar"
          role="toolbar"
          tabindex="0"
        >
          toolbar
        </div>
      </div>
    </body>
  `);
});

test("render orientation", () => {
  const { baseElement } = render(
    <Toolbar {...props} orientation="horizontal">
      toolbar
    </Toolbar>
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      aria-label="toolbar"
      aria-orientation="horizontal"
      id="toolbar"
      role="toolbar"
      tabindex="0"
    >
      toolbar
    </div>
  </div>
</body>
`);
});

test("render without state props", () => {
  const { baseElement } = render(
    // @ts-ignore
    <Toolbar id="toolbar" aria-label="toolbar">
      toolbar
    </Toolbar>
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      aria-label="toolbar"
      id="toolbar"
      role="toolbar"
    >
      toolbar
    </div>
  </div>
</body>
`);
});
