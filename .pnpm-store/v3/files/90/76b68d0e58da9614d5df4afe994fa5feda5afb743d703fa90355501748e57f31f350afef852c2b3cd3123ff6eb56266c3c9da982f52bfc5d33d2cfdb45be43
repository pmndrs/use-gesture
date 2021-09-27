import * as React from "react";
import { render, screen } from "reakit-test-utils";
import { isButton } from "../isButton";

test("isButton", () => {
  render(
    <>
      <button aria-label="item1" />
      <button type="submit" aria-label="item2" />
      <input type="submit" aria-label="item3" />
      <input type="text" aria-label="item4" />
      <div role="button" aria-label="item5" />
    </>
  );
  expect(isButton(screen.getByLabelText("item1"))).toBe(true);
  expect(isButton(screen.getByLabelText("item2"))).toBe(true);
  expect(isButton(screen.getByLabelText("item3"))).toBe(true);
  expect(isButton(screen.getByLabelText("item4"))).toBe(false);
  expect(isButton(screen.getByLabelText("item5"))).toBe(false);
});
