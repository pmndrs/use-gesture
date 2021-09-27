import * as React from "react";
import { render, screen, axe } from "reakit-test-utils";
import ButtonAsLink from "..";

test("a11y", async () => {
  const { baseElement } = render(<ButtonAsLink />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

test("markup", () => {
  render(<ButtonAsLink />);
  expect(screen.getByRole("link")).toMatchInlineSnapshot(`
    <a
      href="#"
    >
      Link
    </a>
  `);
});
