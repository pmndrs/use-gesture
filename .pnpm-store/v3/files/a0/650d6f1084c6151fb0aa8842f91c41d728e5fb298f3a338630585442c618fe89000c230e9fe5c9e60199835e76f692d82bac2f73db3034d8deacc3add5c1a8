import * as React from "react";
import { render, axe, screen, click } from "reakit-test-utils";
import RadioWithRadioGroup from "..";

test("should select a radio", async () => {
  render(<RadioWithRadioGroup />);
  expect(screen.getByText("apple")).toBeVisible();
  expect(screen.getByText("orange")).toBeVisible();
  expect(screen.getByText("watermelon")).toBeVisible();
  click(screen.getByText("apple"));
  const radio = screen.getByLabelText("apple") as HTMLInputElement;
  expect(radio.checked).toBe(true);
});

test("a11y", async () => {
  const { baseElement } = render(<RadioWithRadioGroup />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
