import * as React from "react";
import { render, screen, press, click, hover, wait } from "reakit-test-utils";
import SimpleMenuVirtual from "..";

test("open menu with click", async () => {
  render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  click(screen.getByText("Preferences"));
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  expect(screen.getByLabelText("Preferences")).toHaveFocus();
});

test("open menu with enter", async () => {
  render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  press.Tab();
  press.Enter();
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  await wait(expect(screen.getByText("Settings")).toHaveFocus);
});

test("open menu with space", async () => {
  render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  press.Tab();
  press.Space();
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  await wait(expect(screen.getByText("Settings")).toHaveFocus);
});

test("open menu with arrow down", async () => {
  render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  press.Tab();
  press.ArrowDown();
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  await wait(expect(screen.getByText("Settings")).toHaveFocus);
});

test("open menu with arrow up", async () => {
  render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  press.Tab();
  press.ArrowUp();
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  await wait(expect(screen.getByText("Keyboard shortcuts")).toHaveFocus);
});

test("navigate through menu items using arrow keys", async () => {
  render(<SimpleMenuVirtual />);
  click(screen.getByText("Preferences"));
  press.ArrowDown();
  expect(screen.getByText("Settings")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Extensions")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("Extensions")).toHaveFocus();
  press.ArrowLeft();
  expect(screen.getByText("Extensions")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Keyboard shortcuts")).toHaveFocus();
  press.PageUp();
  expect(screen.getByText("Settings")).toHaveFocus();
  press.PageDown();
  expect(screen.getByText("Keyboard shortcuts")).toHaveFocus();
  press.Home();
  expect(screen.getByText("Settings")).toHaveFocus();
  press.End();
  expect(screen.getByText("Keyboard shortcuts")).toHaveFocus();
});

test("hovering menu item moves focus into it", async () => {
  render(<SimpleMenuVirtual />);
  click(screen.getByText("Preferences"));
  hover(screen.getByText("Extensions"));
  expect(screen.getByText("Extensions")).toHaveFocus();
  hover(screen.getByLabelText("Preferences"));
  expect(screen.getByText("Extensions")).not.toHaveFocus();
  expect(screen.getByLabelText("Preferences")).toHaveFocus();
});

test("close menu by pressing esc on menu", async () => {
  render(<SimpleMenuVirtual />);
  click(screen.getByText("Preferences"));
  expect(screen.getByLabelText("Preferences")).toHaveFocus();
  press.Escape();
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  expect(screen.getByText("Preferences")).toHaveFocus();
});

test("close menu by pressing esc on menu button", async () => {
  render(<SimpleMenuVirtual />);
  click(screen.getByText("Preferences"));
  expect(screen.getByLabelText("Preferences")).toHaveFocus();
  press.ShiftTab();
  expect(screen.getByText("Preferences")).toHaveFocus();
  press.Escape();
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  expect(screen.getByText("Preferences")).toHaveFocus();
});

test("close menu by pressing esc on menu item", async () => {
  render(<SimpleMenuVirtual />);
  press.Tab();
  press.Enter();
  await wait(expect(screen.getByText("Settings")).toHaveFocus);
  press.Escape();
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  expect(screen.getByText("Preferences")).toHaveFocus();
});

test("close menu by clicking on menu button", async () => {
  render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  click(screen.getByText("Preferences"));
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  expect(screen.getByLabelText("Preferences")).toHaveFocus();
  click(screen.getByText("Preferences"));
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  expect(screen.getByText("Preferences")).toHaveFocus();
});

test("close menu by clicking outside menu", async () => {
  const { baseElement } = render(<SimpleMenuVirtual />);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  click(screen.getByText("Preferences"));
  expect(screen.getByLabelText("Preferences")).toBeVisible();
  expect(screen.getByLabelText("Preferences")).toHaveFocus();
  click(baseElement);
  expect(screen.getByLabelText("Preferences")).not.toBeVisible();
  expect(screen.getByText("Preferences")).toHaveFocus();
});
