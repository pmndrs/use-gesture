import * as React from "react";
import { render, screen, axe } from "reakit-test-utils";
import ButtonAsDiv from "..";

test("a11y", async () => {
  const { baseElement } = render(<ButtonAsDiv />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

test("markup", () => {
  render(<ButtonAsDiv />);
  expect(screen.getByRole("button")).toMatchInlineSnapshot(`
    <div
      role="button"
      tabindex="0"
    >
      Div
    </div>
  `);
});
