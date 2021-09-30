import * as React from "react";
import { render } from "reakit-test-utils";
import { MenuButton, MenuButtonProps } from "../MenuButton";

const props: MenuButtonProps = {
  baseId: "base",
  toggle: jest.fn(),
  placement: "bottom",
  show: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(
    <MenuButton {...props}>disclosure</MenuButton>
  );
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
