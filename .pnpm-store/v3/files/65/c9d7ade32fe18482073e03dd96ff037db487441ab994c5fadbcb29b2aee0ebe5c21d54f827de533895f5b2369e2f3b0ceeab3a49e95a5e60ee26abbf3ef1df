import * as React from "react";
import {
  click,
  screen,
  focus,
  press,
  render,
  type,
  wait,
  axe,
} from "reakit-test-utils";
import DialogWithForm from "..";

test("should rename", async () => {
  render(<DialogWithForm />);
  expect(screen.getByText("Name")).toBeVisible();
  const dialog = screen.getByLabelText("Choose a new name");
  expect(dialog).not.toBeVisible();
  click(screen.getByText("✏️"));
  expect(dialog).toBeVisible();
  focus(screen.getByLabelText("New name"));
  type(" 2");
  press.Enter();
  await wait(expect(dialog).not.toBeVisible);
  expect(screen.getByText("Name 2")).toBeVisible();
});

test("a11y", async () => {
  const { baseElement } = render(<DialogWithForm />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
