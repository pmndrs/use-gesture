import * as React from "react";
import {
  render,
  screen,
  press,
  hover,
  click,
  wait,
  focus,
  axe,
} from "reakit-test-utils";
import MenuWithSubmenu from "..";

test("open menu", async () => {
  render(<MenuWithSubmenu />);
  expect(screen.getByLabelText("Edit")).not.toBeVisible();
  click(screen.getByText("Edit"));
  await wait(expect(screen.getByLabelText("Edit")).toBeVisible);
  await wait(expect(screen.getByLabelText("Edit")).toHaveFocus);
});

test("open submenu with click", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Edit"));
  click(screen.getByText("Find"));
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  await wait(expect(screen.getByText("Find")).toHaveFocus);
});

test("open submenu with hover", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Edit"));
  hover(screen.getByText("Find"));
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  await wait(expect(screen.getByText("Find")).toHaveFocus);
});

test("open submenu by pressing enter", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Edit"));
  focus(screen.getByText("Find"));
  press.Enter();
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  await wait(expect(screen.getByText("Search the Web...")).toHaveFocus);
});

test("open submenu by pressing space", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Edit"));
  focus(screen.getByText("Find"));
  press.Space();
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  await wait(expect(screen.getByText("Search the Web...")).toHaveFocus);
});

test("open submenu by pressing arrow right", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Edit"));
  focus(screen.getByText("Find"));
  press.ArrowRight();
  await wait(expect(screen.getByLabelText("Find")).toBeVisible);
  await wait(expect(screen.getByText("Search the Web...")).toHaveFocus);
});

test("a11y", async () => {
  const { baseElement } = render(<MenuWithSubmenu />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
