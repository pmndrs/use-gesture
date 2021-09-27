import * as React from "react";
import { render, screen, press, axe } from "reakit-test-utils";
import VirtualNestedCompositeItems from "..";

test("navigate through nested composite items", () => {
  render(<VirtualNestedCompositeItems />);
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
});

test("a11y", async () => {
  const { baseElement } = render(<VirtualNestedCompositeItems />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
