import * as React from "react";
import { click, screen, press, render, axe } from "reakit-test-utils";
import DialogWithMultipleDisclosures from "..";

test("open and close dialog with multiple disclosures", () => {
  render(<DialogWithMultipleDisclosures />);
  const dialog = screen.getByLabelText("Dialog with multiple disclosures");
  expect(dialog).not.toBeVisible();
  click(screen.getByText("Disclosure 1"));
  expect(dialog).toBeVisible();
  expect(screen.getByText("Close")).toHaveFocus();
  click(screen.getByText("Disclosure 2"));
  expect(dialog).toBeVisible();
  expect(screen.getByText("Close")).toHaveFocus();
  press.Escape();
  expect(dialog).not.toBeVisible();
  expect(screen.getByText("Disclosure 2")).toHaveFocus();
  click(screen.getByText("Button"));
  expect(dialog).toBeVisible();
  expect(screen.getByText("Close")).toHaveFocus();
  click(screen.getByText("Close"));
  expect(dialog).not.toBeVisible();
  expect(screen.getByText("Button")).toHaveFocus();
});

test("a11y", async () => {
  const { baseElement } = render(<DialogWithMultipleDisclosures />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
