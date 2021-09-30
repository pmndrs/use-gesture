import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuDisclosure } from "../MenuDisclosure";

const props: Parameters<typeof MenuDisclosure>[0] = {
  baseId: "base",
  toggle: jest.fn(),
  placement: "bottom",
  show: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(
    <MenuDisclosure {...props}>disclosure</MenuDisclosure>
  );
  expect(console).toHaveWarned();
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-controls="base"
          aria-expanded="false"
          aria-haspopup="menu"
          type="button"
        >
          disclosure
        </button>
      </div>
    </body>
  `);
});
