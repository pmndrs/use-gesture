import * as React from "react";
import { render } from "reakit-test-utils";
import { createHook } from "../createHook";
import { SystemProvider } from "../SystemProvider";

type Options = {
  a: string;
};

test("useProps", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    useProps(options, htmlProps) {
      return {
        ...htmlProps,
        "data-a": options.a,
      };
    },
  });
  expect(useHook({ a: "a" }, { id: "a" })).toMatchInlineSnapshot(`
    Object {
      "data-a": "a",
      "id": "a",
    }
  `);
});

test("useProps undefined props", () => {
  const useHook = createHook<{}, React.HTMLAttributes<any>>({
    useProps(_, htmlProps) {
      return {
        ...htmlProps,
        "data-a": undefined,
      };
    },
  });
  expect(useHook({}, { id: "a" })).toMatchInlineSnapshot(`
    Object {
      "id": "a",
    }
  `);
});

test("compose useProps", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    useProps(options, htmlProps) {
      return {
        ...htmlProps,
        "data-a": options.a,
      };
    },
  });
  type Options2 = Options & {
    b: string;
  };
  const useHook2 = createHook<Options2, React.HTMLAttributes<any>>({
    compose: [useHook],
    useProps(options, htmlProps) {
      return {
        ...htmlProps,
        "data-b": options.b,
      };
    },
  });
  expect(useHook2({ a: "a", b: "b" }, { id: "a" })).toMatchInlineSnapshot(`
    Object {
      "data-a": "a",
      "data-b": "b",
      "id": "a",
    }
  `);
});

test("useOptions", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    useOptions(options) {
      return {
        ...options,
        a: "a",
      };
    },
    useProps(options, htmlProps) {
      return {
        ...htmlProps,
        id: options.a,
      };
    },
  });
  expect(useHook()).toEqual({ id: "a" });
});

test("compose useOptions", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    useOptions(options) {
      return {
        ...options,
        a: `${options.a}b`,
      };
    },
  });
  const useHook2 = createHook<Options, React.HTMLAttributes<any>>({
    compose: [useHook],
    useOptions(options) {
      return {
        ...options,
        a: "a",
      };
    },
    useProps(options, htmlProps) {
      return {
        ...htmlProps,
        id: options.a,
      };
    },
  });
  expect(useHook2()).toEqual({ id: "ab" });
});

test("useComposeOptions", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    useProps(options, htmlProps) {
      return {
        ...htmlProps,
        id: `${options.a}b`,
      };
    },
  });
  const useHook2 = createHook<Options, React.HTMLAttributes<any>>({
    compose: [useHook],
    useComposeOptions(options) {
      return { ...options, a: "a" };
    },
  });
  expect(useHook2()).toEqual({ id: "ab" });
});

test("name", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({ name: "A" });
  expect(useHook.name).toBe("useA");
});

test("name and context", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({ name: "A" });
  const Test = () => {
    return <div {...useHook()} />;
  };
  const system = {
    useAProps: (_: Options, htmlProps: React.HTMLAttributes<any>) => ({
      ...htmlProps,
      id: "a",
    }),
  };
  const { baseElement } = render(
    <SystemProvider unstable_system={system}>
      <Test />
    </SystemProvider>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          id="a"
        />
      </div>
    </body>
  `);
});

test("name and context with useProps", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    name: "A",
    useProps(_, htmlProps) {
      return { className: "a", ...htmlProps };
    },
  });
  const Test = () => {
    return <div {...useHook()} />;
  };
  const system = {
    useAProps: (_: Options, htmlProps: React.HTMLAttributes<any>) => ({
      ...htmlProps,
      id: "a",
    }),
  };
  const { baseElement } = render(
    <SystemProvider unstable_system={system}>
      <Test />
    </SystemProvider>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          class="a"
          id="a"
        />
      </div>
    </body>
  `);
});

test("name and context with useOptions", () => {
  const useHook = createHook<Options, React.HTMLAttributes<any>>({
    name: "A",
    useOptions(options) {
      return {
        ...options,
        a: "a",
      };
    },
  });
  const Test = () => {
    return <div {...useHook()} />;
  };
  const system = {
    useAProps: (options: Options, htmlProps: React.HTMLAttributes<any>) => ({
      ...htmlProps,
      id: options.a,
    }),
  };
  const { baseElement } = render(
    <SystemProvider unstable_system={system}>
      <Test />
    </SystemProvider>
  );
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          id="a"
        />
      </div>
    </body>
  `);
});
