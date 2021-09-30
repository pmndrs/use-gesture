import * as React from "react";
import { render } from "reakit-test-utils";
import { Tab, TabProps } from "../Tab";

const props: TabProps = {
  baseId: "base",
  id: "tab",
  items: [],
  panels: [],
  currentId: null,
  selectedId: null,
  registerItem: jest.fn(),
  unregisterItem: jest.fn(),
  setCurrentId: jest.fn(),
  select: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  up: jest.fn(),
  down: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<Tab {...props}>tab</Tab>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-selected="false"
          id="tab"
          role="tab"
          tabindex="0"
        >
          tab
        </button>
      </div>
    </body>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { baseElement } = render(<Tab id="tab">tab</Tab>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-selected="false"
          id="tab"
          role="tab"
          tabindex="0"
        >
          tab
        </button>
      </div>
    </body>
  `);
});

test("render active", () => {
  const { baseElement } = render(
    <Tab {...props} currentId="tab">
      tab
    </Tab>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-selected="false"
          id="tab"
          role="tab"
          tabindex="0"
        >
          tab
        </button>
      </div>
    </body>
  `);
});

test("render selected", () => {
  const { baseElement } = render(
    <Tab {...props} selectedId="tab">
      tab
    </Tab>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-selected="true"
          id="tab"
          role="tab"
          tabindex="0"
        >
          tab
        </button>
      </div>
    </body>
  `);
});

test("render active selected", () => {
  const { baseElement } = render(
    <Tab {...props} currentId="tab" selectedId="tab">
      tab
    </Tab>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-selected="true"
          id="tab"
          role="tab"
          tabindex="0"
        >
          tab
        </button>
      </div>
    </body>
  `);
});
