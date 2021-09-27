import * as React from "react";
import { render, axe } from "reakit-test-utils";
import Checkbox from "..";

test("a11y", async () => {
  const { baseElement } = render(<Checkbox />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
