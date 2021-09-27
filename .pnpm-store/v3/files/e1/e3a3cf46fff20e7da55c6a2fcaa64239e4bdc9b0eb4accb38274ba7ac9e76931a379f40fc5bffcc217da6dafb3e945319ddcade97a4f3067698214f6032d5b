import * as React from "react";
import { render, screen, press, axe } from "reakit-test-utils";
import ToolbarWithPopover from "..";

test("renders toolbar items with closed popover", () => {
  render(<ToolbarWithPopover />);
  expect(screen.getByText("Beach")).toBeVisible();
  expect(screen.getByText("Mountain")).toBeVisible();
  expect(screen.getByText("Mars")).toBeVisible();
  expect(screen.getByLabelText("Trip to Mars details")).not.toBeVisible();
});

test("allows to navigate toolbar items through keyboard", () => {
  render(<ToolbarWithPopover />);
  press.Tab();
  expect(screen.getByText("Beach")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("Mountain")).toHaveFocus();
  press.ArrowLeft();
  expect(screen.getByText("Beach")).toHaveFocus();
  press.ArrowRight();
  press.ArrowRight();
  expect(screen.getByText("Mars")).toHaveFocus();
  press.ArrowLeft();
  expect(screen.getByText("Mountain")).toHaveFocus();
});

test("allows to open / close the popover through keyboard", () => {
  render(<ToolbarWithPopover />);
  press.Tab();
  expect(screen.getByText("Beach")).toHaveFocus();
  press.ArrowRight();
  press.ArrowRight();
  expect(screen.getByText("Mars")).toHaveFocus();
  press.Enter();
  expect(screen.getByLabelText("Trip to Mars details")).toBeVisible();
  expect(screen.getByLabelText("Trip to Mars details")).toHaveFocus();
  press.Escape();
  expect(screen.getByLabelText("Trip to Mars details")).not.toBeVisible();
  expect(screen.getByText("Mars")).toHaveFocus();
});

test("a11y", async () => {
  const { baseElement } = render(<ToolbarWithPopover />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
