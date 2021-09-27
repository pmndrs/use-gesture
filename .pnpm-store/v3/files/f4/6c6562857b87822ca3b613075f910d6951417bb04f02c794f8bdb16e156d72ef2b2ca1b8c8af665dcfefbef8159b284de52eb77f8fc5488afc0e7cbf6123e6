import * as React from "react";
import { render, press, click, type, screen } from "reakit-test-utils";
import ComboboxVisible from "..";

test("combobox is visible by default", () => {
  render(<ComboboxVisible />);
  expect(screen.getByLabelText("Colors")).toBeVisible();
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Colors")).toBeVisible();
  expect(screen.getByText("Red")).not.toHaveFocus();
});

test("type on the combobox", () => {
  render(<ComboboxVisible />);
  press.Tab();
  expect(screen.getByLabelText("Color")).toHaveFocus();
  expect(screen.getByLabelText("Colors")).toBeVisible();
  type("a");
  expect(screen.getByLabelText("Colors")).toBeVisible();
  expect(screen.getByText("Red")).not.toHaveFocus();
});

test("close combobox popover by clicking outside", () => {
  const { baseElement } = render(<ComboboxVisible />);
  expect(screen.getByLabelText("Colors")).toBeVisible();
  click(baseElement);
  expect(screen.getByLabelText("Colors")).not.toBeVisible();
});

test("close combobox popover by pressing esc", () => {
  render(<ComboboxVisible />);
  click(screen.getByLabelText("Color"));
  press.Escape();
  expect(screen.getByLabelText("Colors")).not.toBeVisible();
  expect(screen.getByLabelText("Color")).toHaveFocus();
});

test("move through combobox options with keyboard", () => {
  render(<ComboboxVisible />);
  click(screen.getByLabelText("Color"));
  press.ArrowDown();
  expect(screen.getByText("Red")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Green")).toHaveFocus();
  press.ArrowDown();
  expect(screen.getByText("Blue")).toHaveFocus();
  press.Home();
  expect(screen.getByText("Blue")).toHaveFocus();
  press.End();
  expect(screen.getByText("Blue")).toHaveFocus();
});

test("select combobox option by clicking on it", () => {
  render(<ComboboxVisible />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  click(screen.getByText("Green"));
  expect(screen.getByLabelText("Color")).toHaveValue("Green");
  expect(screen.getByLabelText("Colors")).not.toBeVisible();
  type("\b\b\b\b\b\ba");
  expect(screen.getByLabelText("Color")).toHaveValue("a");
  click(screen.getByText("Red"));
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
});
