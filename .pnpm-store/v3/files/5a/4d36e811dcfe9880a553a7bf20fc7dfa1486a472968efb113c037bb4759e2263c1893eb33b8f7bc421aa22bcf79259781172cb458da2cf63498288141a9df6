import * as React from "react";
import {
  click,
  screen,
  focus,
  press,
  render,
  wait,
  axe,
} from "reakit-test-utils";
import TabWithDialog from "..";

test("should open modal content tab", async () => {
  render(<TabWithDialog />);
  expect(screen.getByText("Open modal...")).toBeVisible();
  expect(screen.getByText("Tab 1")).not.toBeVisible();
  click(screen.getByText("Open modal..."));
  expect(screen.getByText("Tab 1")).toBeVisible();
  expect(screen.getByText("Content Tab 1")).toBeVisible();
  click(screen.getByText("Tab 2"));
  expect(screen.getByText("Tab 2")).toHaveFocus();
  expect(screen.getByText("Content Tab 2")).toBeVisible();
  focus(screen.getByText("Close"));
  expect(screen.getByText("Close")).toHaveFocus();
  press.Enter();
  await wait(expect(screen.getByText("Tab 1")).not.toBeVisible);
  expect(screen.getByText("Open modal...")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<TabWithDialog />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
