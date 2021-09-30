import * as React from "react";
import { render, screen, press, click, wait, axe } from "reakit-test-utils";
import ToolbarWithMenu from "..";

test("renders toolbar items with closed menu", () => {
  render(<ToolbarWithMenu />);
  expect(screen.getByText("Apples")).toBeVisible();
  expect(screen.getByText("Oranges")).toBeVisible();
  expect(screen.getByText("Other Fruits")).toBeVisible();
  expect(screen.getByText("Pears")).not.toBeVisible();
  expect(screen.getByText("Kiwis")).not.toBeVisible();
  expect(screen.getByText("Lemons")).not.toBeVisible();
});

test("can navigate toolbar items through keyboard", async () => {
  render(<ToolbarWithMenu />);
  press.Tab();
  expect(screen.getByText("Apples")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("Oranges")).toHaveFocus();
  press.ArrowLeft();
  expect(screen.getByText("Apples")).toHaveFocus();
  press.ArrowRight();
  press.ArrowRight();
  expect(screen.getByText("Other Fruits")).toHaveFocus();
  press.Enter();
  expect(screen.getByText("Pears")).toBeVisible();
  await wait(expect(screen.getByText("Pears")).toHaveFocus);
});

test("can open and close the menu through mouse", () => {
  render(<ToolbarWithMenu />);
  click(screen.getByText("Other Fruits"));
  expect(screen.getByText("Pears")).toBeVisible();
  click(screen.getByText("Oranges"));
  expect(screen.getByText("Pears")).not.toBeVisible();
});

test("can open menu, navigate it and close it through keyboard", async () => {
  render(<ToolbarWithMenu />);
  press.Tab();
  expect(screen.getByText("Apples")).toHaveFocus();
  press.ArrowRight();
  press.ArrowRight();
  expect(screen.getByText("Other Fruits")).toHaveFocus();
  press.Enter();
  await wait(expect(screen.getByText("Pears")).toHaveFocus);
  expect(screen.getByText("Pears")).toBeVisible();
  expect(screen.getByText("Kiwis")).toBeVisible();
  expect(screen.getByText("Lemons")).toBeVisible();
  press.ArrowDown();
  expect(screen.getByText("Kiwis")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Lemons")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("Kiwis")).toHaveFocus();
  press.Escape();
  expect(screen.getByText("Pears")).not.toBeVisible();
  expect(screen.getByText("Kiwis")).not.toBeVisible();
  expect(screen.getByText("Lemons")).not.toBeVisible();
  expect(screen.getByText("Other Fruits")).toHaveFocus();
});

test("opens menu pressing arrow down focusing first item", async () => {
  render(<ToolbarWithMenu />);
  press.Tab();
  expect(screen.getByText("Apples")).toHaveFocus();
  press.ArrowRight();
  press.ArrowRight();
  expect(screen.getByText("Other Fruits")).toHaveFocus();
  press.ArrowDown();
  const firstMenuItem = await screen.findByText("Pears");
  expect(firstMenuItem).toHaveFocus();
  expect(firstMenuItem).toBeVisible();
});

test("opens menu pressing arrow up focusing last item", async () => {
  render(<ToolbarWithMenu />);
  press.Tab();
  expect(screen.getByText("Apples")).toHaveFocus();
  press.ArrowRight();
  press.ArrowRight();
  expect(screen.getByText("Other Fruits")).toHaveFocus();
  press.ArrowUp();
  const firstMenuItem = await screen.findByText("Lemons");
  expect(firstMenuItem).toHaveFocus();
  expect(firstMenuItem).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<ToolbarWithMenu />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
