import * as React from "react";
import { click, render, screen, axe } from "reakit-test-utils";
import InputWithPasswordToggle from "..";

test("toggle input type", () => {
  render(<InputWithPasswordToggle />);
  expect(screen.getByText("Show")).toBeVisible();
  expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  click(screen.getByText("Show"));
  expect(screen.getByText("Hide")).toBeVisible();
  expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
});

test("a11y", async () => {
  const { baseElement } = render(<InputWithPasswordToggle />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
