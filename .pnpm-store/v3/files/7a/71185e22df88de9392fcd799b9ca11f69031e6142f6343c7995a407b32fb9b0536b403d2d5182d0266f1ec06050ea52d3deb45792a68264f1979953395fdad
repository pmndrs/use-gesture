import * as React from "react";
import { render } from "reakit-test-utils";
import {
  unstable_Grid as Grid,
  unstable_GridProps as GridProps,
} from "../Grid";

const props: GridProps = {
  id: "composite",
  items: [
    { id: "1", ref: { current: null } },
    { id: "2", ref: { current: null } },
    { id: "3", ref: { current: null } },
  ],
  currentId: "2",
  setCurrentId: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  move: jest.fn(),
};

test("render", () => {
  const { container } = render(<Grid {...props} />);
  expect(console).toHaveWarned();
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="composite"
        role="grid"
      />
    </div>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { container } = render(<Grid id="composite" />);
  expect(console).toHaveWarned();
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="composite"
        role="grid"
      />
    </div>
  `);
});
