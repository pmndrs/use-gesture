import * as React from "react";
import { render, screen } from "reakit-test-utils";
import { contains } from "../contains";

test("contains", () => {
  render(
    <div className="parent" data-testid="parent">
      <div data-testid="child" />
    </div>
  );
  const parent = screen.getByTestId("parent");
  const child = screen.getByTestId("child");
  expect(contains(child, child)).toBe(true);
  expect(contains(child, parent)).toBe(false);
  expect(contains(parent, child)).toBe(true);
});
