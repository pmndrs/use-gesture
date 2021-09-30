import * as React from "react";
import { render } from "reakit-test-utils";
import { createComponent } from "../createComponent";

test("as string", () => {
  const useA = ({ a }: { a: string }) => ({ children: a });
  const A = createComponent({ as: "div", useHook: useA });
  const { getByText } = render(<A as="span" state={{ a: "a" }} />);
  expect(getByText("a")).toMatchInlineSnapshot(`
    <span>
      a
    </span>
  `);
});

test("as component", () => {
  const useA = ({ a }: { a: string }, htmlProps: any) => ({
    children: a,
    ...htmlProps,
  });
  const A = createComponent({ as: "div", useHook: useA });
  const B = ({ b, state, ...props }: { state: any; b: string }) => (
    <div id={b} {...props} />
  );
  const { getByText } = render(<A as={B} state={{ a: "a" }} b="b" />);
  expect(getByText("a")).toMatchInlineSnapshot(`
    <div
      id="b"
    >
      a
    </div>
  `);
});

test("as generic component", () => {
  const useA = ({ a }: { a: string }, htmlProps: any) => ({
    children: a,
    ...htmlProps,
  });
  const A = createComponent({ as: "div", useHook: useA });
  function B<T extends string>({ b, state, ...props }: { state: any; b: T }) {
    return <div id={b} {...props} />;
  }
  const { getByText } = render(<A as={B} state={{ a: "a" }} b="b" />);
  expect(getByText("a")).toMatchInlineSnapshot(`
    <div
      id="b"
    >
      a
    </div>
  `);
});

test("wrap", () => {
  const useA = (_: any, h: any) => ({
    wrapElement: (element: React.ReactNode) => (
      <div id="wrapper">{element}</div>
    ),
    ...h,
  });
  const A = createComponent({ as: "span", useHook: useA });
  const { baseElement } = render(<A id="a">a</A>);
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          id="wrapper"
        >
          <span
            id="a"
          >
            a
          </span>
        </div>
      </div>
    </body>
  `);
});
