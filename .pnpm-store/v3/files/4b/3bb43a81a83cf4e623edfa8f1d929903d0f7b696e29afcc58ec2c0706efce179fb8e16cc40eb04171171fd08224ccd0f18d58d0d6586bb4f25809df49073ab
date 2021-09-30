import * as React from "react";
import { render, press } from "reakit-test-utils";
import { Composite, CompositeProps } from "../Composite";

const props: CompositeProps = {
  id: "composite",
  items: [
    { id: "1", ref: { current: null } },
    { id: "2", ref: { current: null } },
    { id: "3", ref: { current: null } },
  ],
  currentId: "2",
  setCurrentId: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  move: jest.fn(),
};

test("render", () => {
  const { container } = render(<Composite {...props} />);
  expect(console).toHaveWarned();
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="composite"
      />
    </div>
  `);
});

test("render aria-activedescendant", () => {
  const { container } = render(<Composite {...props} unstable_virtual />);
  expect(console).toHaveWarned();
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    aria-activedescendant="2"
    id="composite"
    tabindex="0"
  />
</div>
`);
});

test("render without state props", () => {
  // @ts-ignore
  const { container } = render(<Composite id="composite" />);
  expect(console).toHaveWarned();
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        id="composite"
      />
    </div>
  `);
});

test("interact without state props", () => {
  const { getByLabelText } = render(
    // @ts-ignore
    <Composite role="toolbar" aria-label="composite" id="composite" />
  );
  const composite = getByLabelText("composite");
  press.Enter(composite);
});
