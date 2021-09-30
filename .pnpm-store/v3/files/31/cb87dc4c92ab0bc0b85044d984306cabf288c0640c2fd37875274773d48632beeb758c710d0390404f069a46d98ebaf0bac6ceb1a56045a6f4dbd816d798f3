import * as React from "react";
import { render, focus, screen } from "reakit-test-utils";
import { hasFocus } from "../hasFocus";

test("hasFocus", () => {
  render(
    <>
      <div aria-label="item1">
        <button aria-label="item1-1" />
      </div>
      <button aria-label="item2" />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div aria-label="item3" tabIndex={0} aria-activedescendant="item3-1">
        <div aria-label="item3-1" id="item3-1" />
      </div>
    </>
  );
  expect(hasFocus(screen.getByLabelText("item1"))).toBe(false);
  focus(screen.getByLabelText("item1-1"));
  expect(hasFocus(screen.getByLabelText("item1"))).toBe(false);
  expect(hasFocus(screen.getByLabelText("item1-1"))).toBe(true);
  expect(hasFocus(screen.getByLabelText("item2"))).toBe(false);
  focus(screen.getByLabelText("item2"));
  expect(hasFocus(screen.getByLabelText("item2"))).toBe(true);
  expect(hasFocus(screen.getByLabelText("item3-1"))).toBe(false);
  focus(screen.getByLabelText("item3"));
  expect(hasFocus(screen.getByLabelText("item3"))).toBe(true);
  expect(hasFocus(screen.getByLabelText("item3-1"))).toBe(true);
});
