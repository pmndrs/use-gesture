import * as React from "react";
import { render, screen } from "reakit-test-utils";
import { closest } from "../closest";

test("closest", () => {
  render(
    <div className="parent" data-testid="parent">
      <div data-testid="child" />
    </div>
  );
  const parent = screen.getByTestId("parent");
  const child = screen.getByTestId("child");
  expect(closest(child, "div")).toEqual(child);
  expect(closest(child, ".parent")).toEqual(parent);
});
