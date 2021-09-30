import * as React from "react";
import { render } from "reakit-test-utils";
import { createComponent } from "../createComponent";

test("keys", () => {
  const useHook = ({ children }: { children: string }) => ({ children });
  useHook.__keys = ["children"] as const;
  const Component = createComponent({ as: "div", useHook });
  const { getByText } = render(<Component>component</Component>);
  expect(getByText("component")).toBeDefined();
});

test("as string", () => {
  const useA = ({ a }: { a: string }) => ({ children: a });
  useA.__keys = ["a"] as const;
  const A = createComponent({ as: "div", useHook: useA });
  const { getByText } = render(<A as="span" a="a" />);
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
  useA.__keys = ["a"] as const;
  const A = createComponent({ as: "div", useHook: useA });
  const B = ({ b, ...props }: { b: string }) => <div id={b} {...props} />;
  const { getByText } = render(<A as={B} a="a" b="b" />);
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
  useA.__keys = ["a"] as const;
  const A = createComponent({ as: "div", useHook: useA });
  function B<T extends string>({ b, ...props }: { b: T }) {
    return <div id={b} {...props} />;
  }
  const { getByText } = render(<A as={B} a="a" b="b" />);
  expect(getByText("a")).toMatchInlineSnapshot(`
    <div
      id="b"
    >
      a
    </div>
  `);
});

test("as other component created with createComponent", () => {
  const useA = ({ a }: { a: string }, h: any) => ({ children: a, ...h });
  useA.__keys = ["a"] as const;
  const A = createComponent({ as: "div", useHook: useA });

  const useB = ({ b }: { b: string }, h: any) => ({ id: b, ...h });
  useB.__keys = ["b"] as const;
  const B = createComponent({ as: "div", useHook: useB });

  const { getByText } = render(<A as={B} a="a" b="b" />);
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
