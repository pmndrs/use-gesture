import * as React from "react";
import { render } from "reakit-test-utils";
import { DialogDisclosure } from "../DialogDisclosure";

const props: Parameters<typeof DialogDisclosure>[0] = {
  baseId: "base",
  toggle: jest.fn,
};

test("render", () => {
  const { baseElement } = render(
    <DialogDisclosure {...props}>disclosure</DialogDisclosure>
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
    <DialogDisclosure {...props} visible>
      disclosure
    </DialogDisclosure>
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
