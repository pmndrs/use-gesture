import * as React from "react";
import { render, screen, press, hover, axe } from "reakit-test-utils";
import CompositeWithTooltip from "..";

test("show tooltip", () => {
  render(<CompositeWithTooltip />);
  expect(screen.getByText("item1tooltip")).not.toBeVisible();
  press.Tab();
  expect(screen.getByText("item1")).toHaveFocus();
  expect(screen.getByText("item1tooltip")).toBeVisible();
  press.ArrowDown();
  expect(screen.getByText("item1tooltip")).not.toBeVisible();
  expect(screen.getByText("item2")).toHaveFocus();
  expect(screen.getByText("item2tooltip")).toBeVisible();
  hover(screen.getByText("item3"));
  expect(screen.getByText("item2tooltip")).not.toBeVisible();
  expect(screen.getByText("item2")).toHaveFocus();
  expect(screen.getByText("item3tooltip")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<CompositeWithTooltip />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
