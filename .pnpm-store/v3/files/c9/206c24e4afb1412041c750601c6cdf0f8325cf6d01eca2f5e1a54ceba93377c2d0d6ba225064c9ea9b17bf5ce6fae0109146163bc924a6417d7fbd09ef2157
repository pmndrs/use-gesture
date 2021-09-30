import * as React from "react";
import { render } from "reakit-test-utils";
import { renderHook } from "reakit-test-utils/hooks";
import { Provider } from "reakit/Provider";
import { useCreateElement } from "../useCreateElement";

test("useCreateElement", () => {
  const { result } = renderHook(() =>
    useCreateElement("div", { a: "a" }, "div")
  );
  expect(result.current).toMatchInlineSnapshot(`
    <div
      a="a"
    >
      div
    </div>
  `);
});

test("render props", () => {
  const { result } = renderHook(() =>
    useCreateElement("div", { a: "a" }, ({ a }: { a: string }) => (
      <div id={a}>div</div>
    ))
  );
  expect(result.current).toMatchInlineSnapshot(`
    <div
      id="a"
    >
      div
    </div>
  `);
});

test("render props with component type", () => {
  type HTMLProps = React.HTMLAttributes<any>;
  type AProps = { children: (props: HTMLProps) => React.ReactElement };

  const A = ({ children }: AProps) => children({ className: "a" });
  const B = () =>
    useCreateElement(A, {}, (props: HTMLProps) => <div {...props}>a</div>);

  const { container } = render(<B />);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="a"
      >
        a
      </div>
    </div>
  `);
});

test("context", () => {
  const { result } = renderHook(
    () => useCreateElement("div", { a: "a" }, "div"),
    {
      wrapper: ({ children }) => (
        <Provider
          unstable_system={{
            useCreateElement: (_, props, c) => <p {...props}>{c}</p>,
          }}
        >
          {children}
        </Provider>
      ),
    }
  );
  expect(result.current).toMatchInlineSnapshot(`
    <p
      a="a"
    >
      div
    </p>
  `);
});
