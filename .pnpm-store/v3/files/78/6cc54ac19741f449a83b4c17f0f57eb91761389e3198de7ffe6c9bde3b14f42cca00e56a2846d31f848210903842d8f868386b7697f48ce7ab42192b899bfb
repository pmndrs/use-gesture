import * as React from "react";
import { render, screen, click, axe } from "reakit-test-utils";
import DillUpComposite from "..";

test("mount and unmount", () => {
  render(<DillUpComposite />);
  expect(screen.queryByLabelText("composite")).toBeInTheDocument();
  click(screen.getByText("Toggle Toolbar"));
  expect(screen.queryByLabelText("composite")).not.toBeInTheDocument();
  click(screen.getByText("Toggle Toolbar"));
  expect(screen.queryByLabelText("composite")).toBeInTheDocument();
});

test("a11y", async () => {
  const { baseElement } = render(<DillUpComposite />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
