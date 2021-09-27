import * as React from "react";
import { render } from "reakit-test-utils";
import { RadioGroup, RadioGroupProps } from "../RadioGroup";

const props: RadioGroupProps = {
  baseId: "radiogroup",
  items: [],
  currentId: null,
  move: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  setCurrentId: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(
    <RadioGroup {...props} aria-label="radiogroup" />
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          aria-label="radiogroup"
          id="radiogroup"
          role="radiogroup"
          tabindex="0"
        />
      </div>
    </body>
  `);
});

test("render without state props", () => {
  const { baseElement } = render(
    // @ts-ignore
    <RadioGroup id="radiogroup" aria-label="radiogroup" />
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      aria-label="radiogroup"
      id="radiogroup"
      role="radiogroup"
    />
  </div>
</body>
`);
});
