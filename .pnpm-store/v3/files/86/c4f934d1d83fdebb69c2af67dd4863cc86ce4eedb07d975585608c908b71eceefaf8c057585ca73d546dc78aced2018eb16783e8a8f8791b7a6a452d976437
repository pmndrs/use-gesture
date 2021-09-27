import * as React from "react";
import { render, screen, axe } from "reakit-test-utils";
import AccessibleButton from "..";

test("a11y", async () => {
  const { baseElement } = render(<AccessibleButton />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

test("markup", () => {
  render(<AccessibleButton />);
  expect(screen.getByRole("button")).toMatchInlineSnapshot(`
    <button
      type="button"
    >
      Button
    </button>
  `);
});
