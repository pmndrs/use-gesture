import * as React from "react";
import { render } from "reakit-test-utils";
import { unstable_FormCheckbox as FormCheckbox } from "../FormCheckbox";

test("render", () => {
  const { baseElement } = render(
    <FormCheckbox
      baseId="base"
      name="a"
      values={{ a: false }}
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
          aria-checked="false"
          aria-describedby="base-a-message"
          aria-invalid="false"
          aria-labelledby="base-a-label"
          id="base-a"
          name="a"
          type="checkbox"
        />
      </div>
    </body>
  `);
});

test("render value", () => {
  const { baseElement } = render(
    <FormCheckbox
      baseId="base"
      name="a"
      value="b"
      values={{ a: ["b"] as Array<"a" | "b" | "c"> }}
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
          aria-checked="true"
          aria-invalid="false"
          checked=""
          name="a"
          type="checkbox"
          value="b"
        />
      </div>
    </body>
  `);
});
