import * as React from "react";
import { render, press, click, type, screen } from "reakit-test-utils";
import ComboboxInlineAutoSelect from "..";

function expectSelectionValue(element: Element, value: string) {
  const input = element as HTMLInputElement;
  const { selectionStart, selectionEnd } = input;
  const selectionValue = input.value.slice(selectionStart!, selectionEnd!);
  expect(selectionValue).toBe(value);
}

test("open combobox popover on click and do not auto select", () => {
  render(<ComboboxInlineAutoSelect />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow down and do not auto select", () => {
  render(<ComboboxInlineAutoSelect />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowDown();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on arrow up and do not auto select", () => {
  render(<ComboboxInlineAutoSelect />);
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).not.toHaveFocus();
});

test("open combobox popover on type and auto select", () => {
  render(<ComboboxInlineAutoSelect />);
  const combobox = screen.getByLabelText("Fruit");
  press.Tab();
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  type("a");
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  expect(screen.getByText("Apple")).toHaveFocus();
  expect(combobox).toHaveValue("apple");
  expectSelectionValue(combobox, "pple");
  type("pp");
  expect(screen.getByText("Apple")).toHaveFocus();
  expect(combobox).toHaveValue("apple");
  expectSelectionValue(combobox, "le");
  type("\b");
  expect(screen.getByText("Apple")).not.toHaveFocus();
  expect(combobox).toHaveValue("app");
  expectSelectionValue(combobox, "");
  type("\b");
  expect(screen.getByText("Apple")).not.toHaveFocus();
  expect(combobox).toHaveValue("ap");
  expectSelectionValue(combobox, "");
  type("p");
  expect(screen.getByText("Apple")).toHaveFocus();
  expect(combobox).toHaveValue("apple");
  expectSelectionValue(combobox, "le");
});

test("keep combobox value after closing combobox popover by clicking outside", () => {
  const { baseElement } = render(<ComboboxInlineAutoSelect />);
  click(screen.getByLabelText("Fruit"));
  type("a");
  expect(screen.getByLabelText("Fruit")).toHaveValue("apple");
  expectSelectionValue(screen.getByLabelText("Fruit"), "pple");
  click(baseElement);
  expect(screen.getByLabelText("Fruit")).toHaveValue("apple");
});

test("move through combobox options by pressing arrow keys", () => {
  render(<ComboboxInlineAutoSelect />);
  press.Tab();
  type("a");
  expect(screen.getByLabelText("Fruit")).toHaveValue("apple");
  expectSelectionValue(screen.getByLabelText("Fruit"), "pple");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Orange");
  expectSelectionValue(screen.getByLabelText("Fruit"), "");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Banana");
  expectSelectionValue(screen.getByLabelText("Fruit"), "");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("a");
  expectSelectionValue(screen.getByLabelText("Fruit"), "");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("apple");
  expectSelectionValue(screen.getByLabelText("Fruit"), "pple");
});
