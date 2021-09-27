import * as React from "react";
import { render, press, screen, act } from "reakit-test-utils";
import NestedCompositeItems from "..";

function cell(name: string) {
  return screen.getByRole("gridcell", { name });
}

function button(name: string) {
  return screen.getByRole("button", { name });
}

test("navigate through grid cells", () => {
  render(<NestedCompositeItems />);
  press.Tab();
  expect(cell("item1")).toHaveFocus();
  press.ArrowDown();
  expect(cell("item2")).toHaveFocus();
  press.ArrowRight();
  expect(button("Move item2 up")).toHaveFocus();
  press.ArrowRight();
  expect(button("Move item2 down")).toHaveFocus();
  press.ArrowRight();
  expect(button("Remove item2")).toHaveFocus();
  press.ArrowDown();
  expect(button("Remove item3")).toHaveFocus();
});

test("change order of grid rows", () => {
  render(<NestedCompositeItems />);
  press.Tab();
  expect(cell("item1")).toHaveFocus();
  press.ArrowDown();
  expect(cell("item2")).toHaveFocus();
  press.ArrowRight();
  expect(button("Move item2 up")).toHaveFocus();
  jest.useFakeTimers();
  press.Enter();
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
  press.ArrowRight();
  expect(button("Move item2 down")).toHaveFocus();
  press.ArrowRight();
  expect(button("Remove item2")).toHaveFocus();
  press.ArrowDown();
  expect(button("Remove item1")).toHaveFocus();
});
