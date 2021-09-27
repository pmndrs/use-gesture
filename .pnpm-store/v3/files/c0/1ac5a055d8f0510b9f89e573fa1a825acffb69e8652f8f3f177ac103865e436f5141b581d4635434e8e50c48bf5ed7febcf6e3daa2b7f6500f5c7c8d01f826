import * as React from "react";
import { render, press, type, screen } from "reakit-test-utils";
import ComboboxBothAutoSelect from "..";

function expectSelectionValue(element: Element, value: string) {
  const input = element as HTMLInputElement;
  const { selectionStart, selectionEnd } = input;
  const selectionValue = input.value.slice(selectionStart!, selectionEnd!);
  expect(selectionValue).toBe(value);
}

function getComboboxInput() {
  return screen.getByLabelText("Fruit") as HTMLInputElement;
}

test("auto select combobox option", async () => {
  render(<ComboboxBothAutoSelect />);
  press.Tab();
  type("car");
  expect(getComboboxInput()).toHaveValue("carambola");
  expectSelectionValue(getComboboxInput(), "ambola");
});

test("typing banana and then b", () => {
  render(<ComboboxBothAutoSelect />);
  press.Tab();
  type("b");
  expect(getComboboxInput()).toHaveValue("banana");
  expectSelectionValue(getComboboxInput(), "anana");
  getComboboxInput().setSelectionRange(0, 6);
  expectSelectionValue(getComboboxInput(), "banana");
  type("b");
  expect(getComboboxInput()).toHaveValue("banana");
  expectSelectionValue(getComboboxInput(), "anana");
});

test("typing g, moving to the third option and then replacing with b", () => {
  render(<ComboboxBothAutoSelect />);
  press.Tab();
  type("g");
  expect(getComboboxInput()).toHaveValue("gooseberries");
  expectSelectionValue(getComboboxInput(), "ooseberries");
  press.ArrowDown();
  press.ArrowDown();
  expect(getComboboxInput()).toHaveValue("Grapefruit");
  getComboboxInput().setSelectionRange(0, 10);
  type("b");
  expect(getComboboxInput()).toHaveValue("banana");
  expectSelectionValue(getComboboxInput(), "anana");
});
