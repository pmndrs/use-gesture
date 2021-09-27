import * as React from "react";
import { render, press, focus, click, type, screen } from "reakit-test-utils";
import ComboboxBothAutocomplete from "..";

test("change combobox value by focusing on combobox options", () => {
  render(<ComboboxBothAutocomplete />);
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  focus(screen.getByText("Acerola"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("Acerola");
});

test("change combobox value by arrowing through combobox options", () => {
  render(<ComboboxBothAutocomplete />);
  click(screen.getByLabelText("Fruit"));
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Acerola");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Apple");
  press.ArrowDown();
  expect(screen.getByLabelText("Fruit")).toHaveValue("Apricots");
  press.ArrowUp();
  press.ArrowUp();
  press.ArrowUp();
  expect(screen.getByLabelText("Fruit")).toHaveValue("");
});

test("filter combobox options by typing on the combobox", () => {
  render(<ComboboxBothAutocomplete />);
  press.Tab();
  type("bla");
  expect(screen.queryByText("Blackberries")).toBeInTheDocument();
  expect(screen.queryByText("Blackcurrant")).toBeInTheDocument();
});

test("display no results when there is no option match", () => {
  render(<ComboboxBothAutocomplete />);
  press.Tab();
  type("1");
  expect(screen.queryByText("No results found")).toBeInTheDocument();
});
