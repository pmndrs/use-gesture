import * as React from "react";
import { render, press, focus, click, type, screen } from "reakit-test-utils";
import ComboboxList from "..";

test("do not change combobox value by focusing on combobox options", () => {
  render(<ComboboxList />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  focus(screen.getByText("AliceBlue"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
});

test("do not change combobox value by arrowing through combobox options", () => {
  render(<ComboboxList />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.End();
  expect(screen.getByLabelText("Color")).toHaveValue("");
});

test("change combobox value by clicking on the combobox option", () => {
  render(<ComboboxList />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  click(screen.getByText("AliceBlue"));
  expect(screen.getByLabelText("Color")).toHaveValue("AliceBlue");
});

test("filter combobox options by typing on the combobox", () => {
  render(<ComboboxList />);
  press.Tab();
  type("bla");
  expect(screen.queryByText("Black")).toBeInTheDocument();
  expect(screen.queryByText("BlanchedAlmond")).toBeInTheDocument();
});

test("display no results when there is no option match", () => {
  render(<ComboboxList />);
  press.Tab();
  type("1");
  expect(screen.queryByText("No results found")).toBeInTheDocument();
});
