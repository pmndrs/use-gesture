import * as React from "react";
import { click, screen, render, axe } from "reakit-test-utils";
import DialogWithCompositeWithTooltip from "..";

test("open dialog with composite with tooltip", () => {
  render(<DialogWithCompositeWithTooltip />);
  click(screen.getByText("Disclosure"));
  expect(screen.getByLabelText("Dialog")).toBeVisible();
  expect(screen.getByText("item1")).toHaveFocus();
  expect(screen.getByText("item1tooltip")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<DialogWithCompositeWithTooltip />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
