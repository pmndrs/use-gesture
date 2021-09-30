import * as React from "react";
import { render, press, click, type, screen } from "reakit-test-utils";
import ComboboxAutoSelect from "..";

test("open combobox popover on click and do not auto select", () => {
  render(<ComboboxAutoSelect />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow down and do not auto select", () => {
  render(<ComboboxAutoSelect />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow up and do not auto select", () => {
  render(<ComboboxAutoSelect />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on type and auto select", () => {
  render(<ComboboxAutoSelect />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).toHaveFocus();
  type("\b");
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover after pressing esc", () => {
  render(<ComboboxAutoSelect />);
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
