import * as React from "react";
import {
  render,
  screen,
  hover,
  click,
  wait,
  press,
  axe,
} from "reakit-test-utils";
import ChromeMenuBar from "..";

test("open and hover menus", async () => {
  render(<ChromeMenuBar />);
  expect(screen.getByLabelText("File")).not.toBeVisible();
  click(screen.getByText("File"));
  await wait(expect(screen.getByLabelText("File")).toBeVisible);
  expect(screen.getByText("File")).toHaveFocus();
  hover(screen.getByText("Edit"));
  await wait(expect(screen.getByLabelText("Edit")).toBeVisible);
  expect(screen.getByText("Edit")).toHaveFocus();
});

test("navigate through the menu bar using keyboard", async () => {
  render(<ChromeMenuBar />);
  expect(screen.getByText("Chrome")).not.toHaveFocus();
  expect(screen.getByLabelText("Chrome")).not.toBeVisible();
  press.Tab();
  expect(screen.getByText("Chrome")).toHaveFocus();
  expect(screen.getByLabelText("Chrome")).toBeVisible();
  press.ArrowRight();
  expect(screen.getByText("Chrome")).not.toHaveFocus();
  expect(screen.getByLabelText("Chrome")).not.toBeVisible();
  expect(screen.getByText("File")).toHaveFocus();
  expect(screen.getByLabelText("File")).toBeVisible();
  press.End();
  expect(screen.getByText("Help")).toHaveFocus();
  expect(screen.getByLabelText("Help")).toBeVisible();
  press.ArrowRight();
  expect(screen.getByText("Chrome")).toHaveFocus();
  await wait(expect(screen.getByLabelText("Chrome")).toBeVisible);
  press.ArrowDown();
  await wait(expect(screen.getByText("About Google Chrome")).toHaveFocus);
  press.ArrowDown();
  press.ArrowDown();
  press.ArrowDown();
  press.ArrowDown();
  expect(screen.getByText("Services")).toHaveFocus();
  press.ArrowRight();
  await wait(expect(screen.getByText("Activity Monitor")).toHaveFocus);
  press.ArrowRight();
  expect(screen.getByText("File")).toHaveFocus();
  expect(screen.getByLabelText("File")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<ChromeMenuBar />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
