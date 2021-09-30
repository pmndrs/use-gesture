import * as React from "react";
import { render } from "reakit-test-utils";
import { unstable_FormMessage as FormMessage } from "../FormMessage";

test("render", () => {
  const { baseElement } = render(
    <FormMessage
      baseId="base"
      name="a"
      touched={{ a: true }}
      errors={{ a: "b" }}
      messages={{}}
    />
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          id="base-a-message"
          role="alert"
        >
          b
        </div>
      </div>
    </body>
  `);
});
