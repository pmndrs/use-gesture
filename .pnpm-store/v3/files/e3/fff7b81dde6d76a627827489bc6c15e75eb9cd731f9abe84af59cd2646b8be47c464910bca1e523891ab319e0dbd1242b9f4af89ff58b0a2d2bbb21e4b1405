import "reakit-test-utils/mockClientRects";
import { ComponentProps } from "react";
import { isFocusable, isTabbable } from "../tabbable";

function h<T extends keyof JSX.IntrinsicElements>(
  type: T,
  props: ComponentProps<T> = {} as any
) {
  const element = document.createElement(type);
  const keys = Object.keys(props);
  for (const prop of keys) {
    const value = props[prop as keyof typeof props];
    // @ts-ignore
    element[prop] = value;
    element.setAttribute(prop.toLowerCase(), `${value}`);
  }
  return element;
}

test("isFocusable", () => {
  expect(
    isFocusable(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  ).toBe(false);
  expect(isFocusable(h("input"))).toBe(true);
  expect(isFocusable(h("input", { tabIndex: -1 }))).toBe(true);
  expect(isFocusable(h("input", { hidden: true }))).toBe(false);
  expect(isFocusable(h("input", { disabled: true }))).toBe(false);
  expect(isFocusable(h("a"))).toBe(false);
  expect(isFocusable(h("a", { href: "" }))).toBe(true);
  expect(isFocusable(h("audio"))).toBe(false);
  expect(isFocusable(h("audio", { controls: true }))).toBe(true);
  expect(isFocusable(h("video"))).toBe(false);
  expect(isFocusable(h("video", { controls: true }))).toBe(true);
  expect(isFocusable(h("div"))).toBe(false);
  expect(isFocusable(h("div", { contentEditable: true }))).toBe(true);
  expect(isFocusable(h("div", { tabIndex: 0 }))).toBe(true);
  expect(isFocusable(h("div", { tabIndex: -1 }))).toBe(true);
});

test("isTabbable", () => {
  expect(
    isTabbable(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
  ).toBe(false);
  expect(isTabbable(h("input"))).toBe(true);
  expect(isTabbable(h("input", { tabIndex: -1 }))).toBe(false);
  expect(isTabbable(h("input", { hidden: true }))).toBe(false);
  expect(isTabbable(h("input", { disabled: true }))).toBe(false);
  expect(isTabbable(h("a"))).toBe(false);
  expect(isTabbable(h("a", { href: "" }))).toBe(true);
  expect(isTabbable(h("audio"))).toBe(false);
  expect(isTabbable(h("audio", { controls: true }))).toBe(true);
  expect(isTabbable(h("video"))).toBe(false);
  expect(isTabbable(h("video", { controls: true }))).toBe(true);
  expect(isTabbable(h("div"))).toBe(false);
  expect(isTabbable(h("div", { contentEditable: true }))).toBe(true);
  expect(isTabbable(h("div", { tabIndex: 0 }))).toBe(true);
  expect(isTabbable(h("div", { tabIndex: -1 }))).toBe(false);
});
