import * as React from "react";
import { click, screen, render, axe } from "reakit-test-utils";
import ChatDialog from "..";

test("open and close chat dialog", () => {
  const { baseElement } = render(<ChatDialog />);
  const dialog = screen.getByLabelText("Chat");
  expect(dialog).not.toBeVisible();
  click(screen.getByText("Open chat"));
  expect(dialog).toBeVisible();
  click(baseElement);
  expect(dialog).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<ChatDialog />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
