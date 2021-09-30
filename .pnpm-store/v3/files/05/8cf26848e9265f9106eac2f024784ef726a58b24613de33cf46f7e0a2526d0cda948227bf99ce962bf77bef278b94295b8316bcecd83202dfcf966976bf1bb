import * as React from "react";
import { render } from "reakit-test-utils";
import { TabPanel, TabPanelProps } from "../TabPanel";

const props: TabPanelProps = {
  id: "panel",
  registerPanel: jest.fn(),
  unregisterPanel: jest.fn(),
  panels: [],
  items: [],
};

test("render", () => {
  const { baseElement } = render(<TabPanel {...props}>tabpanel</TabPanel>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          hidden=""
          id="panel"
          role="tabpanel"
          style="display: none;"
          tabindex="0"
        >
          tabpanel
        </div>
      </div>
    </body>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { baseElement } = render(<TabPanel id="panel">tabpanel</TabPanel>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          hidden=""
          id="panel"
          role="tabpanel"
          style="display: none;"
          tabindex="0"
        >
          tabpanel
        </div>
      </div>
    </body>
  `);
});

test("render visible", () => {
  const { baseElement } = render(
    <TabPanel {...props} visible>
      tabpanel
    </TabPanel>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          id="panel"
          role="tabpanel"
          tabindex="0"
        >
          tabpanel
        </div>
      </div>
    </body>
  `);
});
