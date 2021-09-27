import * as React from "react";
import { render } from "reakit-test-utils";
import { unstable_Id as Id } from "../Id";
import { unstable_IdProvider as IdProvider } from "../IdProvider";

test("render", () => {
  const { baseElement } = render(
    <IdProvider>
      <Id />
    </IdProvider>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          id="id-1"
        />
      </div>
    </body>
  `);
});
