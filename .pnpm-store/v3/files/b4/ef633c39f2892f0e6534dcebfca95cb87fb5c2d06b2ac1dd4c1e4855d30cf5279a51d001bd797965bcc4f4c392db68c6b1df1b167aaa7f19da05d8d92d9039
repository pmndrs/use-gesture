import * as React from "react";
import { render } from "reakit-test-utils";
import {
  unstable_GridRow as GridRow,
  unstable_GridRowProps as GridRowProps,
} from "../GridRow";

const props: GridRowProps = {
  id: "row",
  registerGroup: jest.fn(),
  unregisterGroup: jest.fn(),
};

test("render", () => {
  const { container } = render(<GridRow {...props} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="row"
        role="row"
      />
    </div>
  `);
});

test("render without state props", () => {
  // @ts-ignore
  const { container } = render(<GridRow id="row" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="row"
        role="row"
      />
    </div>
  `);
});
