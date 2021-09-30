import * as React from "react";
import { render } from "reakit-test-utils";
import {
  unstable_GridCell as GridCell,
  unstable_GridCellProps as GridCellProps,
} from "../GridCell";

const props: GridCellProps = {
  id: "gridcell",
  items: [],
  setCurrentId: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  up: jest.fn(),
  down: jest.fn(),
  registerItem: jest.fn(),
  unregisterItem: jest.fn(),
};

test("render", () => {
  const { container } = render(<GridCell {...props} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <span
        id="gridcell"
        role="gridcell"
        tabindex="0"
      />
    </div>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { container } = render(<GridCell id="gridcell" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <span
        id="gridcell"
        role="gridcell"
        tabindex="0"
      />
    </div>
  `);
});
