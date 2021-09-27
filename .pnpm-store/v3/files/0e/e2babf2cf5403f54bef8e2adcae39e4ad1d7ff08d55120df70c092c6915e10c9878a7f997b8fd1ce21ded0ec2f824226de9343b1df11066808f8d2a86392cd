import * as React from "react";
import { render, screen, press, click, axe } from "reakit-test-utils";
import NestedCompositeItems from "..";

test("navigate through nested composite items", () => {
  render(<NestedCompositeItems />);
  press.Tab();
  expect(screen.getByLabelText("item0")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("item1")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("item2")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("item3")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByLabelText("item0")).toHaveFocus();
  press.ArrowLeft();
  expect(screen.getByText("item3")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("item2")).toHaveFocus();
  press.Home();
  expect(screen.getByLabelText("item0")).toHaveFocus();
  click(screen.getByText("item1"));
  expect(screen.getByText("item2")).toHaveFocus();
});

test("a11y", async () => {
  const { baseElement } = render(<NestedCompositeItems />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
