import { mergeSystem } from "../mergeSystem";

test("single primitive prop", () => {
  const system = { a: "a" };
  const merged = mergeSystem(system, {});
  expect(merged.a).toBe("a");
});

test("different primitive props", () => {
  const system1 = { a: "a" };
  const system2 = { b: "b" };
  const merged = mergeSystem(system1, system2);
  expect(merged.a).toBe("a");
  expect(merged.b).toBe("b");
});

test("same primitive props with different values", () => {
  const system1 = { a: "a" };
  const system2 = { a: "b" };
  const merged = mergeSystem(system1, system2);
  expect(merged.a).toBe("b");
});

test("single object prop", () => {
  const system = { a: { a: "a" } };
  const merged = mergeSystem(system, {});
  expect(merged.a.a).toBe("a");
});

test("different object props", () => {
  const system1 = { a: { a: "a" } };
  const system2 = { b: { b: "b" } };
  const merged = mergeSystem(system1, system2);
  expect(merged.a.a).toBe("a");
  expect(merged.b.b).toBe("b");
});

test("same object props with different values", () => {
  const system1 = { a: { a: "a" } };
  const system2 = { a: { b: "b" } };
  const merged = mergeSystem(system1, system2);
  expect(merged.a.a).toBe("a");
  expect(merged.a.b).toBe("b");
});

test("same object props with intersection values", () => {
  const system1 = { a: { a: "a" } };
  const system2 = { a: { a: "b", b: "b" } };
  const merged = mergeSystem(system1, system2);
  expect(merged.a.a).toBe("b");
  expect(merged.a.b).toBe("b");
});

test("single function props", () => {
  const system = { fn: jest.fn() };
  const merged = mergeSystem(system, {});
  expect(merged.fn).toBe(system.fn);
  merged.fn(1, 2, 3, 4, 5);
  expect(system.fn).toBeCalledWith(1, 2, 3, 4, 5);
});

test("different function props", () => {
  const system1 = { fn1: jest.fn() };
  const system2 = { fn2: jest.fn() };
  const merged = mergeSystem(system1, system2);
  expect(merged.fn1).toBe(system1.fn1);
  expect(merged.fn2).toBe(system2.fn2);
  merged.fn1(1, 2, 3, 4, 5);
  merged.fn2(1, 2, 3, 4, 5);
  expect(system1.fn1).toBeCalledWith(1, 2, 3, 4, 5);
  expect(system2.fn2).toBeCalledWith(1, 2, 3, 4, 5);
});

test("same function props with different values", () => {
  const impl = (a: number, b: number, c: number) => a + b + c;
  const system1 = { fn: jest.fn(impl) };
  const system2 = { fn: jest.fn(impl) };
  const merged = mergeSystem(system1, system2);
  merged.fn(1, 2, 3);
  expect(system1.fn).toBeCalledWith(1, 2, 3);
  expect(system2.fn).toBeCalledWith(1, 2, 6);
});
