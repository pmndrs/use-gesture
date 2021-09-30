import * as React from "react";
import { render } from "reakit-test-utils";
import { unstable_FormInput as FormInput } from "../FormInput";

test("render", () => {
  const { baseElement } = render(
    <FormInput
      baseId="base"
      name="a"
      value="b"
      values={{ a: "" }}
      touched={{}}
      errors={{}}
      update={jest.fn()}
      blur={jest.fn()}
    />
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <input
          aria-describedby="base-a-message"
          aria-invalid="false"
          aria-labelledby="base-a-label"
          id="base-a"
          name="a"
          value="b"
        />
      </div>
    </body>
  `);
});
