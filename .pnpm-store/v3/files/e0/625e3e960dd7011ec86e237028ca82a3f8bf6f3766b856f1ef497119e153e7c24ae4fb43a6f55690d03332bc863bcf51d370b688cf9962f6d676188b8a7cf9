import * as React from "react";
import { render, press, click, type, axe, screen } from "reakit-test-utils";
import TabbableElements from "..";

test("tab", () => {
  render(<TabbableElements />);
  press.Tab();
  expect(screen.getByText("Default div")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Default button")).toHaveFocus();
  press.Tab();
  expect(screen.getByLabelText("Default input")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Default anchor")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Default custom")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Disabled focusable div")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Disabled focusable button")).toHaveFocus();
  press.Tab();
  expect(screen.getByLabelText("Disabled focusable input")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Disabled focusable anchor")).toHaveFocus();
  press.Tab();
  expect(screen.getByText("Disabled focusable custom")).toHaveFocus();
});

test("click", () => {
  jest.spyOn(window, "alert").mockImplementation();
  render(<TabbableElements />);
  click(screen.getByText("Default button"));
  expect(window.alert).toHaveBeenCalledWith("Default button");
  click(screen.getByText("Default anchor"));
  expect(window.alert).toHaveBeenCalledWith("Default anchor");
  click(screen.getByText("Default custom"));
  expect(window.alert).toHaveBeenCalledWith("Default custom");
  click(screen.getByText("Disabled button"));
  expect(window.alert).not.toHaveBeenCalledWith("Disabled button");
  click(screen.getByText("Disabled anchor"));
  expect(window.alert).not.toHaveBeenCalledWith("Disabled anchor");
  click(screen.getByText("Disabled custom"));
  expect(window.alert).not.toHaveBeenCalledWith("Disabled custom");
  click(screen.getByText("Disabled focusable button"));
  expect(window.alert).not.toHaveBeenCalledWith("Disabled focusable button");
  click(screen.getByText("Disabled focusable anchor"));
  expect(window.alert).not.toHaveBeenCalledWith("Disabled focusable anchor");
  click(screen.getByText("Disabled focusable custom"));
  expect(window.alert).not.toHaveBeenCalledWith("Disabled focusable custom");
});

test("type on input", () => {
  render(<TabbableElements />);
  const defaultInput = screen.getByLabelText("Default input");
  const disabledInput = screen.getByLabelText("Disabled input");
  const disabledFocusableInput = screen.getByLabelText(
    "Disabled focusable input"
  );
  type("abc", defaultInput);
  expect(defaultInput).toHaveValue("abc");
  type("abc", disabledInput);
  expect(disabledInput).toHaveValue("");
  type("abc", disabledFocusableInput);
  expect(disabledFocusableInput).toHaveValue("");
});

test("markup", () => {
  const { container } = render(<TabbableElements />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="display: inline-flex; flex-direction: column;"
      >
        <h2>
          Default
        </h2>
        <div
          tabindex="0"
        >
          Default div
        </div>
        <button>
          Default button
        </button>
        <input
          aria-label="Default input"
        />
        <a
          href="#"
        >
          Default anchor
        </a>
        <div
          tabindex="0"
        >
          Default custom
        </div>
        <h2>
          Disabled
        </h2>
        <div
          aria-disabled="true"
          style="pointer-events: none;"
        >
          Disabled div
        </div>
        <button
          aria-disabled="true"
          disabled=""
          style="pointer-events: none;"
        >
          Disabled button
        </button>
        <input
          aria-disabled="true"
          aria-label="Disabled input"
          disabled=""
          style="pointer-events: none;"
        />
        <a
          aria-disabled="true"
          href="#"
          style="pointer-events: none;"
          tabindex="-1"
        >
          Disabled anchor
        </a>
        <div
          aria-disabled="true"
          style="pointer-events: none;"
        >
          Disabled custom
        </div>
        <h2>
          Disabled focusable
        </h2>
        <div
          aria-disabled="true"
          style="pointer-events: none;"
          tabindex="0"
        >
          Disabled focusable div
        </div>
        <button
          aria-disabled="true"
          style="pointer-events: none;"
        >
          Disabled focusable button
        </button>
        <input
          aria-disabled="true"
          aria-label="Disabled focusable input"
          style="pointer-events: none;"
        />
        <a
          aria-disabled="true"
          href="#"
          style="pointer-events: none;"
        >
          Disabled focusable anchor
        </a>
        <div
          aria-disabled="true"
          style="pointer-events: none;"
          tabindex="0"
        >
          Disabled focusable custom
        </div>
      </div>
    </div>
  `);
});

test("a11y", async () => {
  const { baseElement } = render(<TabbableElements />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
