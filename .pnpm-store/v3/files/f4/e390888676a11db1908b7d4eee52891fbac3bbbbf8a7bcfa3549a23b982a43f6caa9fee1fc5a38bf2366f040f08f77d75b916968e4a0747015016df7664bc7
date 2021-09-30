import * as React from "react";
import { render, focus, screen } from "reakit-test-utils";
import { getNextActiveElementOnBlur } from "../getNextActiveElementOnBlur";

test("getNextActiveElementOnBlur", () => {
  const onBlur = jest.fn(getNextActiveElementOnBlur);
  render(
    <>
      <button onBlur={onBlur}>button1</button>
      <button>button2</button>
    </>
  );
  focus(screen.getByText("button1"));
  expect(onBlur).not.toHaveBeenCalled();
  focus(screen.getByText("button2"));
  expect(onBlur).toHaveReturnedWith(screen.getByText("button2"));
});
