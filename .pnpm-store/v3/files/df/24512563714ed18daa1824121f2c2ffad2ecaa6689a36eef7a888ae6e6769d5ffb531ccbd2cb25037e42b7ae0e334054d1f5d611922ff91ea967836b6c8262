import * as React from "react";
import {
  render,
  press,
  focus,
  click,
  fireEvent,
  screen,
} from "reakit-test-utils";
import ComboboxInline from "..";

test("change combobox value by focusing on combobox options", () => {
  render(<ComboboxInline />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  focus(screen.getByText("Red"));
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
});

test("change combobox value by arrowing through combobox options", () => {
  render(<ComboboxInline />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("Green");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("Blue");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("");
});

test("revert combobox value after closing combobox popover with esc", () => {
  render(<ComboboxInline />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowUp();
  expect(screen.getByLabelText("Color")).toHaveValue("Blue");
  press.Escape();
  expect(screen.getByLabelText("Color")).toHaveValue("");
});

test("keep combobox value after closing combobox popover by tabbing out", () => {
  render(
    <>
      <ComboboxInline />
      <button>button</button>
    </>
  );
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
  press.Tab();
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
});

test("keep combobox value after closing combobox popover by clicking outside", () => {
  const { baseElement } = render(<ComboboxInline />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowUp();
  expect(screen.getByLabelText("Color")).toHaveValue("Blue");
  click(baseElement);
  expect(screen.getByLabelText("Color")).toHaveValue("Blue");
});

test("unselect combobox option when cleaning combobox value", () => {
  render(<ComboboxInline />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
  fireEvent.change(screen.getByLabelText("Color"), { target: { value: "" } });
  expect(screen.getByText("Red")).not.toHaveFocus();
  expect(screen.getByText("Green")).not.toHaveFocus();
  expect(screen.getByText("Blue")).not.toHaveFocus();
  expect(screen.getByLabelText("Color")).toHaveValue("");
});

test("clicking on combobox input does not revert current value", () => {
  render(<ComboboxInline />);
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("");
  press.ArrowDown();
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
  click(screen.getByLabelText("Color"));
  expect(screen.getByLabelText("Color")).toHaveValue("Red");
});
