import * as React from "react";
import { render } from "reakit-test-utils";
import { Input } from "../Input";

test("render", () => {
  const { getByPlaceholderText } = render(<Input placeholder="input" />);
  expect(getByPlaceholderText("input")).toMatchInlineSnapshot(`
    <input
      placeholder="input"
    />
  `);
});
