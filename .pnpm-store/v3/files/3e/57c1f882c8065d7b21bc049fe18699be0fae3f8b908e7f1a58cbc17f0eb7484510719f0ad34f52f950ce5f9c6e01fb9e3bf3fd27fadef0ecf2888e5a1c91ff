import * as React from "react";
import {
  render,
  screen,
  press,
  hover,
  click,
  wait,
  axe,
} from "reakit-test-utils";
import MenuBarWithDisabledItems from "..";

test("open menus with hover except the disabled one", async () => {
  render(<MenuBarWithDisabledItems />);
  expect(screen.getByLabelText("File")).not.toBeVisible();
  click(screen.getByText("File"));
  await wait(expect(screen.getByLabelText("File")).toBeVisible);
  expect(screen.getByText("File")).toHaveFocus();
  hover(screen.getByText("View"));
  expect(screen.getByLabelText("File")).toBeVisible();
  expect(screen.getByText("File")).toHaveFocus();
  hover(screen.getByText("Edit"));
  await wait(expect(screen.getByLabelText("Edit")).toBeVisible);
  expect(screen.getByText("Edit")).toHaveFocus();
});

test("open menus with click except the disabled one", async () => {
  const { baseElement } = render(<MenuBarWithDisabledItems />);
  click(screen.getByText("File"));
  await wait(expect(screen.getByLabelText("File")).toBeVisible);
  expect(screen.getByText("File")).toHaveFocus();
  click(screen.getByText("View"));
  expect(baseElement).toHaveFocus();
  click(screen.getByText("Edit"));
  await wait(expect(screen.getByLabelText("Edit")).toBeVisible);
  expect(screen.getByText("Edit")).toHaveFocus();
});

test("open menus with keyboard except the disabled one", async () => {
  render(<MenuBarWithDisabledItems />);
  press.Tab();
  expect(screen.getByText("File")).toHaveFocus();
  await wait(expect(screen.getByLabelText("File")).toBeVisible);
  press.ArrowRight();
  expect(screen.getByText("View")).toHaveFocus();
  await wait(expect(screen.getByLabelText("File")).not.toBeVisible);
  await wait(expect(screen.getByLabelText("View")).not.toBeVisible);
  press.ArrowDown();
  await wait(expect(screen.getByLabelText("File")).not.toBeVisible);
  await wait(expect(screen.getByLabelText("View")).not.toBeVisible);
  press.ArrowUp();
  await wait(expect(screen.getByLabelText("File")).not.toBeVisible);
  await wait(expect(screen.getByLabelText("View")).not.toBeVisible);
  press.Enter();
  await wait(expect(screen.getByLabelText("File")).not.toBeVisible);
  await wait(expect(screen.getByLabelText("View")).not.toBeVisible);
  press.Space();
  await wait(expect(screen.getByLabelText("File")).not.toBeVisible);
  await wait(expect(screen.getByLabelText("View")).not.toBeVisible);
  press.ArrowRight();
  expect(screen.getByText("Edit")).toHaveFocus();
  await wait(expect(screen.getByLabelText("Edit")).toBeVisible);
  press.ArrowRight();
  expect(screen.getByText("File")).toHaveFocus();
  await wait(expect(screen.getByLabelText("File")).toBeVisible);
});

test("open submenus with click except the disabled one", async () => {
  render(<MenuBarWithDisabledItems />);
  click(screen.getByText("Edit"));
  click(screen.getByText("Find"));
  expect(screen.getByText("Find")).toHaveFocus();
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  expect(screen.getByText("Find")).toHaveFocus();
  click(screen.getByText("Spelling and Grammar"));
  await wait(expect(screen.getByLabelText("Find")).not.toBeVisible);
  expect(screen.getByLabelText("Edit")).toHaveFocus();
});

test("open submenus with hover except the disabled one", async () => {
  render(<MenuBarWithDisabledItems />);
  click(screen.getByText("Edit"));
  hover(screen.getByText("Find"));
  expect(screen.getByText("Find")).toHaveFocus();
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  expect(screen.getByText("Find")).toHaveFocus();
  hover(screen.getByText("Spelling and Grammar"));
  await wait(expect(screen.getByLabelText("Find")).not.toBeVisible);
  expect(screen.getByLabelText("Edit")).toHaveFocus();
});

test("a11y", async () => {
  const { baseElement } = render(<MenuBarWithDisabledItems />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
