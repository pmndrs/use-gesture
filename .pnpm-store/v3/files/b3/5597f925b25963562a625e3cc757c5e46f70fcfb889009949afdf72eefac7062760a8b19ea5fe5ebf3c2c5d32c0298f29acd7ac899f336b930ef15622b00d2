import * as React from "react";
import { click, screen, render, axe } from "reakit-test-utils";
import DialogSidebar from "..";

test("open dialog", () => {
  render(<DialogSidebar />);
  click(screen.getByText("toggle"));
  expect(screen.getByText("sidebar")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<DialogSidebar />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
