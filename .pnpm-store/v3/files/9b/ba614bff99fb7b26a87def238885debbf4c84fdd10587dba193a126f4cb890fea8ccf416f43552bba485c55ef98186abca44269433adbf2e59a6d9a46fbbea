import * as React from "react";
import { render, press, click, type, screen } from "reakit-test-utils";
import AccessibleCombobox from "..";

test("open combobox popover on click", () => {
  render(<AccessibleCombobox />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow down", () => {
  render(<AccessibleCombobox />);
  press.Tab();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow up", () => {
  render(<AccessibleCombobox />);
  press.Tab();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Banana")).not.toHaveFocus();
});

test("open combobox popover by typing on the combobox", () => {
  render(<AccessibleCombobox />);
  press.Tab();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("do not open combobox popover on arrow right/left", () => {
  render(<AccessibleCombobox />);
  press.Tab();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowLeft();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowRight();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
});

test("do not open combobox popover on backspace on empty input", () => {
  render(<AccessibleCombobox />);
  press.Tab();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("\b");
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
});

test("close combobox popover by clicking outside", () => {
  const { baseElement } = render(<AccessibleCombobox />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  click(baseElement);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
});

test("close combobox popover by tabbing out", () => {
  render(
    <>
      <AccessibleCombobox />
      <button>button</button>
    </>
  );
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.ArrowDown();
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  expect(screen.getByText("button")).toHaveFocus();
});

test("close combobox popover by pressing esc", () => {
  render(<AccessibleCombobox />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
});

test("open combobox popover after pressing esc", () => {
  render(<AccessibleCombobox />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("\b");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
});

test("open combobox popover after pressing esc twice", () => {
  render(<AccessibleCombobox />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  press.Escape();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
});

test("move through combobox options with keyboard", () => {
  render(<AccessibleCombobox />);
  click(screen.getByLabelText("Fruit"));
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByText("Apple")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Orange")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Banana")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByText("Apple")).not.toHaveFocus();
  expect(screen.getByText("Orange")).not.toHaveFocus();
  expect(screen.getByText("Banana")).not.toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("Banana")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("Orange")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("Apple")).toHaveFocus();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruit")).toHaveFocus();
  expect(screen.getByText("Apple")).not.toHaveFocus();
  expect(screen.getByText("Orange")).not.toHaveFocus();
  expect(screen.getByText("Banana")).not.toHaveFocus();
  press.ArrowUp();
  expect(screen.getByText("Banana")).toHaveFocus();
  press.ArrowRight();
  expect(screen.getByText("Banana")).toHaveFocus();
  press.ArrowLeft();
  expect(screen.getByText("Banana")).toHaveFocus();
  press.Home();
  expect(screen.getByText("Banana")).toHaveFocus();
  press.End();
  expect(screen.getByText("Banana")).toHaveFocus();
});

test("select combobox option by clicking on it", () => {
  render(<AccessibleCombobox />);
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  click(screen.getByText("Orange"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("Orange");
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("\b\b\b\b\b\ba");
  expect(screen.getByLabelText("Fruit")).toHaveValue("a");
  click(screen.getByText("Apple"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("Apple");
});

test("select combobox option by pressing enter on it", () => {
  render(<AccessibleCombobox />);
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  press.ArrowUp();
  press.Enter();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Banana");
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("\b\b\b\b\b\ba");
  expect(screen.getByLabelText("Fruit")).toHaveValue("a");
  press.ArrowDown();
  press.Enter();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Apple");
});

test("do not select combobox option by pressing space on it", () => {
  render(<AccessibleCombobox />);
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  press.ArrowDown();
  press.Space();
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
});

test("unselect combobox option when typing on the combobox", () => {
  render(<AccessibleCombobox />);
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByText("Apple")).toHaveFocus();
  type("a");
  expect(screen.getByText("Apple")).not.toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Apple")).toHaveFocus();
});

test("clicking on combobox input unselects combobox option", () => {
  render(<AccessibleCombobox />);
  click(screen.getByLabelText("Fruit"));
  press.ArrowDown();
  expect(screen.getByText("Apple")).toHaveFocus();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByText("Apple")).not.toHaveFocus();
});
