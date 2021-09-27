import * as React from "react";
import { render, screen, press, axe } from "reakit-test-utils";
import CompositeShift from "..";

test("keyboard navigation", () => {
  render(<CompositeShift />);
  press.Tab();
  expect(screen.getByText("item-1-1")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("item-1-2")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("item-1-3")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("item-2-2")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("item-1-2")).toHaveFocus();
  press.End(null, { ctrlKey: true });
  expect(screen.getByText("item-4-3")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("item-3-2")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("item-3-4")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("item-4-3")).toHaveFocus();
  press.PageUp();
  expect(screen.getByText("item-1-3")).toHaveFocus();
  press.ArrowDown();
  press.ArrowDown();
  press.End();
  expect(screen.getByText("item-3-4")).toHaveFocus();
  press.PageDown();
  expect(screen.getByText("item-3-4")).toHaveFocus();
  press.PageUp();
  expect(screen.getByText("item-3-4")).toHaveFocus();
});

test("a11y", async () => {
  const { baseElement } = render(<CompositeShift />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
