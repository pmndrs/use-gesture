import * as React from "react";
import { render, fireEvent } from "reakit-test-utils";
import { unstable_Form as Form } from "../Form";

const props: Parameters<typeof Form>[0] = {
  submit: jest.fn(),
};

test("render", () => {
  const { baseElement } = render(<Form {...props} />);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <form
          novalidate=""
          role="form"
        />
      </div>
    </body>
  `);
});

test("submit", () => {
  const { getByRole } = render(<Form {...props} />);
  const form = getByRole("form");
  fireEvent.submit(form);
  expect(props.submit).toHaveBeenCalled();
});
