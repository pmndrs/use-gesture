import * as React from "react";
import { render, screen, press, hover, axe } from "reakit-test-utils";
import VirtualCompositeWithTooltip from "..";

test("show tooltip", () => {
  render(<VirtualCompositeWithTooltip />);
  expect(screen.getByText("item1tooltip")).not.toBeVisible();
  press.Tab();
  expect(screen.getByLabelText("composite")).toHaveFocus();
  expect(screen.getByText("item1")).toHaveFocus();
  expect(screen.getByText("item1tooltip")).toBeVisible();
  press.ArrowDown();
  expect(screen.getByText("item1tooltip")).not.toBeVisible();
  expect(screen.getByLabelText("composite")).toHaveFocus();
  expect(screen.getByText("item2")).toHaveFocus();
  expect(screen.getByText("item2tooltip")).toBeVisible();
  hover(screen.getByText("item3"));
  expect(screen.getByText("item2tooltip")).not.toBeVisible();
  expect(screen.getByLabelText("composite")).toHaveFocus();
  expect(screen.getByText("item2")).toHaveFocus();
  expect(screen.getByText("item3tooltip")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<VirtualCompositeWithTooltip />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
