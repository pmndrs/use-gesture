import * as React from "react";
import { render } from "reakit-test-utils";
import { useWarning } from "../useWarning";

const initialNodeEnv = process.env.NODE_ENV;

afterEach(() => {
  process.env.NODE_ENV = initialNodeEnv;
});

test('log to console.warn once when NODE_ENV is not "production"', () => {
  process.env.NODE_ENV = "development";
  const Test = ({ a = false, b = 0 }) => {
    useWarning(a, "a");
    return <div>{b}</div>;
  };
  const { rerender } = render(<Test />);
  expect(console).not.toHaveWarned();
  rerender(<Test a />);
  // eslint-disable-next-line no-console
  expect(console.warn).toHaveBeenCalledTimes(1);
  expect(console).toHaveWarnedWith("a");
  rerender(<Test a b={1} />);
  // eslint-disable-next-line no-console
  expect(console.warn).toHaveBeenCalledTimes(1);
  expect(console).toHaveWarnedWith("a");
});

test('do not log to console.warn if NODE_ENV is "production"', () => {
  process.env.NODE_ENV = "production";
  const Test = ({ a = false, b = 0 }) => {
    useWarning(a, "a");
    return <div>{b}</div>;
  };
  const { rerender } = render(<Test />);
  expect(console).not.toHaveWarned();
  rerender(<Test a />);
  expect(console).not.toHaveWarned();
  rerender(<Test a b={1} />);
  expect(console).not.toHaveWarned();
});
