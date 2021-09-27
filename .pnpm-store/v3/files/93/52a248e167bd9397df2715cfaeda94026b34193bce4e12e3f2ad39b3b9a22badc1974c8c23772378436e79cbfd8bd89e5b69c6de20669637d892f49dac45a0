import * as React from "react";
import { render, press, click, type, screen } from "reakit-test-utils";
import ComboboxMinValueLength from "..";

test("open combobox popover on click", () => {
  render(<ComboboxMinValueLength />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow down", () => {
  render(<ComboboxMinValueLength />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow up", () => {
  render(<ComboboxMinValueLength />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
  press.Escape();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});
