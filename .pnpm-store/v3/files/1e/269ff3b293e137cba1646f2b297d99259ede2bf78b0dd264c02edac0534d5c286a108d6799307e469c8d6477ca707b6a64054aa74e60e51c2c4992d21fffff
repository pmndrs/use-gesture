import * as React from "react";
import { render, click, type, wait, screen } from "reakit-test-utils";
import ComboboxFetch from "..";

function getComboboxInput() {
  return screen.getByLabelText("Fruit");
}

function expectSelectionValue(element: Element, value: string) {
  const input = element as HTMLInputElement;
  const { selectionStart, selectionEnd } = input;
  const selectionValue = input.value.slice(selectionStart!, selectionEnd!);
  expect(selectionValue).toBe(value);
}

test("open combobox popover on click", async () => {
  render(<ComboboxFetch />);
  expect(screen.getByLabelText("Fruits")).not.toBeVisible();
  click(getComboboxInput());
  expect(screen.getByLabelText("Fruits")).toBeVisible();
  await wait(() => expect(screen.getByText("Acerola")).not.toHaveFocus());
});

test("type on combobox", async () => {
  render(<ComboboxFetch />);
  click(getComboboxInput());
  await wait(() => expect(screen.getByText("Acerola")).not.toHaveFocus());
  // value: ace[rola]
  type("ace");
  expect(screen.getByText("Acerola")).toHaveFocus();
  expect(getComboboxInput()).toHaveValue("acerola");
  expectSelectionValue(getComboboxInput(), "rola");
  // value: ace
  type("\b");
  expect(screen.getByText("Acerola")).not.toHaveFocus();
  expect(getComboboxInput()).toHaveValue("ace");
  // Wait for fetch
  await wait(expect(screen.queryByText("Aple")).not.toBeInTheDocument);
  expect(screen.getByText("Acerola")).not.toHaveFocus();
  expect(getComboboxInput()).toHaveValue("ace");
  // value: bl[ackberries]
  type("\b\b\bbl");
  await wait(() => expect(getComboboxInput()).toHaveValue("blackberries"));
  expectSelectionValue(getComboboxInput(), "ackberries");
  expect(screen.getByText("Blackberries")).toHaveFocus();
  // value: bl
  type("\b");
  await wait(() => expect(getComboboxInput()).toHaveValue("bl"));
  await wait(() => expect(screen.getByText("Blackberries")).not.toHaveFocus());
});
