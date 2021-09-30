import * as React from "react";
import { render, screen } from "reakit-test-utils";
import { setTextFieldValue } from "../setTextFieldValue";

test("input", () => {
  const onChange = jest.fn((event) => event.target.value);
  render(<input onChange={onChange} />);
  const input = screen.getByRole("textbox");
  expect(onChange).not.toHaveBeenCalled();
  setTextFieldValue(input, "a");
  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveReturnedWith("a");
});

test("textarea", () => {
  const onChange = jest.fn((event) => event.target.value);
  render(<textarea onChange={onChange} />);
  const textarea = screen.getByRole("textbox");
  expect(onChange).not.toHaveBeenCalled();
  setTextFieldValue(textarea, "a");
  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveReturnedWith("a");
});
