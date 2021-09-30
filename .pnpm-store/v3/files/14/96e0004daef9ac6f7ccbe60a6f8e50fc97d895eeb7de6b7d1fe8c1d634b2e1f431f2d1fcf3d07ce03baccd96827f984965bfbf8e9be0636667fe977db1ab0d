import * as React from "react";
import { render } from "reakit-test-utils";
import { TabList, TabListProps } from "../TabList";

const props: TabListProps = {
  "aria-label": "tablist",
  id: "base",
  items: [],
  currentId: null,
  move: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  setCurrentId: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<TabList {...props}>tablist</TabList>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="tablist"
          id="base"
          role="tablist"
          tabindex="0"
        >
          tablist
        </div>
      </div>
    </body>
  `);
});

test("render without state props", () => {
  const { baseElement } = render(
    // @ts-ignore
    <TabList id="base" aria-label="tablist">
      tablist
    </TabList>
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      aria-label="tablist"
      id="base"
      role="tablist"
    >
      tablist
    </div>
  </div>
</body>
`);
});

test("render orientation", () => {
  const { baseElement } = render(
    <TabList {...props} orientation="horizontal">
      tablist
    </TabList>
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      aria-label="tablist"
      aria-orientation="horizontal"
      id="base"
      role="tablist"
      tabindex="0"
    >
      tablist
    </div>
  </div>
</body>
`);
});
