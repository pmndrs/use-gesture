import * as React from "react";
import { render } from "reakit-test-utils";
import { unstable_FormGroup as FormGroup } from "../FormGroup";

test("render", () => {
  const { baseElement } = render(
    <FormGroup baseId="base" touched={{ a: true }} errors={{}} name="a" />
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <fieldset
          aria-describedby="base-a-message"
          aria-invalid="false"
          aria-labelledby="base-a-label"
          id="base-a"
          role="group"
          tabindex="-1"
        />
      </div>
    </body>
  `);
});
