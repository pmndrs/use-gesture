import * as React from "react";
import { render } from "reakit-test-utils";
import { PopoverDisclosure } from "../PopoverDisclosure";

const props: Parameters<typeof PopoverDisclosure>[0] = {
  baseId: "base",
  toggle: jest.fn,
};

test("render", () => {
  const { baseElement } = render(
    <PopoverDisclosure {...props}>disclosure</PopoverDisclosure>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          aria-controls="base"
          aria-expanded="false"
          aria-haspopup="dialog"
          type="button"
        >
          disclosure
        </button>
      </div>
    </body>
  `);
});

test("render visible", () => {
  const { baseElement } = render(
    <PopoverDisclosure {...props} visible>
      disclosure
    </PopoverDisclosure>
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <button
      aria-controls="base"
      aria-expanded="true"
      aria-haspopup="dialog"
      type="button"
    >
      disclosure
    </button>
  </div>
</body>
`);
});
