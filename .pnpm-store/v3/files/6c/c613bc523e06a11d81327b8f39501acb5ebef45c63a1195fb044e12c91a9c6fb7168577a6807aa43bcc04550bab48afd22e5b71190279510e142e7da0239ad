import * as React from "react";
import { render } from "reakit-test-utils";
import { unstable_FormSubmitButton as FormSubmitButton } from "../FormSubmitButton";

test("render", () => {
  const { baseElement } = render(
    <FormSubmitButton baseId="base" submit={jest.fn()} />
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          type="submit"
        />
      </div>
    </body>
  `);
});

test("disabled", () => {
  const { baseElement } = render(
    <FormSubmitButton baseId="base" submit={jest.fn()} disabled />
  );
  expect(baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <button
      aria-disabled="true"
      disabled=""
      style="pointer-events: none;"
      type="submit"
    />
  </div>
</body>
`);
});
