import * as React from "react";
import { click, screen, focus, render, wait, axe } from "reakit-test-utils";
import DialogWithFocusLoss from "..";

test("open dialog", () => {
  render(<DialogWithFocusLoss />);
  click(screen.getByText("Open dialog"));
  expect(screen.getByLabelText("Focus loss")).toBeVisible();
  expect(screen.getByText("Blur on click")).toHaveFocus();
});

test("blur on click", () => {
  render(<DialogWithFocusLoss />);
  click(screen.getByText("Open dialog"));
  click(screen.getByText("Blur on click"));
  expect(screen.getByLabelText("Focus loss")).toBeVisible();
  expect(screen.getByLabelText("Focus loss")).toHaveFocus();
});

test("unmount on focus", async () => {
  render(<DialogWithFocusLoss />);
  click(screen.getByText("Open dialog"));
  focus(screen.getByText("Unmount on focus"));
  expect(screen.getByLabelText("Focus loss")).toBeVisible();
  await wait(expect(screen.getByLabelText("Focus loss")).toHaveFocus);
});

test("nested blur on click", () => {
  render(<DialogWithFocusLoss />);
  click(screen.getByText("Open dialog"));
  click(screen.getByText("Open nested dialog"));
  click(screen.getByText("Nested blur on click"));
  expect(screen.getByLabelText("Nested")).toBeVisible();
  expect(screen.getByLabelText("Nested")).toHaveFocus();
});

test("nested unmount on focus", async () => {
  render(<DialogWithFocusLoss />);
  click(screen.getByText("Open dialog"));
  click(screen.getByText("Open nested dialog"));
  focus(screen.getByText("Nested unmount on focus"));
  expect(screen.getByLabelText("Nested")).toBeVisible();
  await wait(expect(screen.getByLabelText("Nested")).toHaveFocus);
});

test("a11y", async () => {
  const { baseElement } = render(<DialogWithFocusLoss />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
