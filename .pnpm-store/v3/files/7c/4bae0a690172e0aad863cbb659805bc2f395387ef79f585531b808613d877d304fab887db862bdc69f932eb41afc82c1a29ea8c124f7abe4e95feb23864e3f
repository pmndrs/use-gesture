/* eslint-disable no-console */
import * as React from "react";
import { renderHook, act } from "reakit-test-utils/hooks";
import { jestSerializerStripFunctions } from "reakit-test-utils/jestSerializerStripFunctions";
import { unstable_useFormState } from "../FormState";

expect.addSnapshotSerializer(jestSerializerStripFunctions);

test("initial state", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({ baseId: "base" })
  );
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "baseId": "base",
      "errors": Object {},
      "messages": Object {},
      "submitFailed": 0,
      "submitSucceed": 0,
      "submitting": false,
      "touched": Object {},
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "valid": true,
      "validating": false,
      "values": Object {},
    }
  `);
});

test("initial state values", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({
      baseId: "base",
      values: { a: "a", b: { c: ["d", "e"] } },
    })
  );
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "baseId": "base",
      "errors": Object {},
      "messages": Object {},
      "submitFailed": 0,
      "submitSucceed": 0,
      "submitting": false,
      "touched": Object {},
      "unstable_idCountRef": Object {
        "current": 0,
      },
      "valid": true,
      "validating": false,
      "values": Object {
        "a": "a",
        "b": Object {
          "c": Array [
            "d",
            "e",
          ],
        },
      },
    }
  `);
});

test("update", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({
      values: { a: "a", b: { c: ["d", "e"] } },
    })
  );
  expect(result.current.values.a).toBe("a");
  act(() => result.current.update("a", "b"));
  expect(result.current.values.a).toBe("b");
  expect(result.current.values.b.c).toEqual(["d", "e"]);
  act(() => result.current.update(["b", "c", 1] as const, "f"));
  expect(result.current.values.b.c).toEqual(["d", "f"]);
});

test("update with function", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({
      values: { a: "a", b: { c: ["d", "e"] } },
    })
  );
  expect(result.current.values.a).toBe("a");
  act(() => result.current.update("a", (v) => `${v}b`));
  expect(result.current.values.a).toBe("ab");
  expect(result.current.values.b.c).toEqual(["d", "e"]);
  act(() => result.current.update(["b", "c", 1] as const, (v) => `${v}f`));
  expect(result.current.values.b.c).toEqual(["d", "ef"]);
});

test("update undefined", () => {
  type Values = {
    a?: string;
  };
  const { result } = renderHook(() =>
    unstable_useFormState<Values>({
      values: { a: "a" },
    })
  );
  expect(result.current.values.a).toBe("a");
  act(() => result.current.update("a", undefined));
  expect(result.current.values.a).toBe("");
});

test("validate", async () => {
  const { result } = renderHook(() =>
    unstable_useFormState({
      values: { a: "a" },
      onValidate: (values) => {
        if (values.a === "a") {
          const error = { a: "error" };
          throw error;
        }
      },
    })
  );
  await act(() =>
    // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/pull/37426#discussion_r312717670
    expect(result.current.validate()).rejects.toEqual({ a: "error" })
  );
});

test("validate with updating onValidate", async () => {
  jest.useFakeTimers();
  const { result } = renderHook(() => {
    const [message, setMessage] = React.useState("");
    React.useEffect(() => {
      setTimeout(() => act(() => setMessage("error")), 1000);
    }, []);
    return unstable_useFormState({
      values: { a: "a" },
      onValidate: (values) => {
        if (values.a === "a") {
          const error = { a: message };
          throw error;
        }
      },
    });
  });
  // @ts-ignore
  await act(() => expect(result.current.validate()).rejects.toEqual({ a: "" }));
  jest.advanceTimersByTime(1000);
  await act(() =>
    // @ts-ignore
    expect(result.current.validate()).rejects.toEqual({ a: "error" })
  );
  jest.useRealTimers();
});

test("submit", async () => {
  const { result } = renderHook(() =>
    unstable_useFormState({
      values: { a: "a" },
      onSubmit: (values) => {
        if (values.a === "a") {
          const error = { a: "error" };
          throw error;
        }
      },
    })
  );
  await act(result.current.submit);
  expect(result.current.errors).toEqual({ a: "error" });
});

test("submit with resetOnSubmitSucceed", async () => {
  const { result } = renderHook(() =>
    unstable_useFormState({
      values: { a: "a" },
      resetOnSubmitSucceed: true,
    })
  );
  expect(result.current.values.a).toBe("a");
  act(() => result.current.update("a", "b"));
  expect(result.current.values.a).toBe("b");
  await act(result.current.submit);
  expect(result.current.values.a).toBe("a");
});

test("submit with updating onSubmit", async () => {
  jest.useFakeTimers();
  const { result } = renderHook(() => {
    const [message, setMessage] = React.useState("");
    React.useEffect(() => {
      setTimeout(() => act(() => setMessage("error")), 1000);
    }, []);
    return unstable_useFormState({
      values: { a: "a" },
      onSubmit: (values) => {
        if (values.a === "a") {
          const error = { a: message };
          throw error;
        }
      },
    });
  });
  await act(result.current.submit);
  expect(result.current.errors).toEqual({ a: "" });
  jest.advanceTimersByTime(1000);
  await act(result.current.submit);
  expect(result.current.errors).toEqual({ a: "error" });
  jest.useRealTimers();
});

test("blur", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({ values: { a: "a", b: { c: ["d", "e"] } } })
  );
  expect(result.current.touched).toEqual({});
  act(() => result.current.blur("a"));
  expect(result.current.touched).toEqual({ a: true });
  act(() => result.current.blur(["b", "c", 1] as const));
  expect(result.current.touched).toEqual({ a: true, b: { c: [true] } });
});

test("push", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({ values: { a: "a", b: { c: ["d", "e"] } } })
  );
  act(() => result.current.push(["b", "c"], "f"));
  expect(result.current.values.b.c).toEqual(["d", "e", "f"]);
});

test("remove", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({ values: { a: "a", b: { c: ["d", "e"] } } })
  );
  act(() => result.current.remove(["b", "c"], 0));
  expect(result.current.values.b.c).toEqual([undefined, "e"]);
});

test("reset", () => {
  const { result } = renderHook(() =>
    unstable_useFormState({ values: { a: "a" } })
  );
  expect(result.current.values.a).toBe("a");
  act(() => result.current.update("a", "b"));
  expect(result.current.values.a).toBe("b");
  act(result.current.reset);
  expect(result.current.values.a).toBe("a");
});
