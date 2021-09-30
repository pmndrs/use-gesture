import * as React from "react";
import { render, click } from "reakit-test-utils";
import { Disclosure } from "../Disclosure";

const props: Parameters<typeof Disclosure>[0] = {
  toggle: jest.fn,
  baseId: "test",
};

test("render", () => {
  const { getByText } = render(<Disclosure {...props}>disclosure</Disclosure>);
  expect(getByText("disclosure")).toMatchInlineSnapshot(`
    <button
      aria-controls="test"
      aria-expanded="false"
      type="button"
    >
      disclosure
    </button>
  `);
});

test("render visible", () => {
  const { getByText } = render(
    <Disclosure {...props} visible>
      disclosure
    </Disclosure>
  );
  expect(getByText("disclosure")).toMatchInlineSnapshot(`
<button
  aria-controls="test"
  aria-expanded="true"
  type="button"
>
  disclosure
</button>
`);
});

test("render with aria-controls", () => {
  const { getByText } = render(
    <Disclosure {...props} aria-controls="a">
      disclosure
    </Disclosure>
  );
  expect(getByText("disclosure")).toMatchInlineSnapshot(`
<button
  aria-controls="a test"
  aria-expanded="false"
  type="button"
>
  disclosure
</button>
`);
});

test("toggle", () => {
  const fn = jest.fn();
  const { getByText } = render(
    <Disclosure {...props} toggle={fn}>
      disclosure
    </Disclosure>
  );
  expect(fn).toHaveBeenCalledTimes(0);
  click(getByText("disclosure"));
  expect(fn).toHaveBeenCalledTimes(1);
});
