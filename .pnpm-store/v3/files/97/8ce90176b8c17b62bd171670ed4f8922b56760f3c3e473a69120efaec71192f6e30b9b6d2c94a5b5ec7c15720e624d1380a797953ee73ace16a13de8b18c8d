import * as React from "react";
import { render, screen, press, hover, click, wait } from "reakit-test-utils";
import MenuWithSubmenu from "..";

test("open menu", async () => {
  render(<MenuWithSubmenu />);
  expect(screen.getByLabelText("Bookmarks")).not.toBeVisible();
  click(screen.getByText("Bookmarks"));
  await wait(expect(screen.getByLabelText("Bookmarks")).toBeVisible);
  await wait(expect(screen.getByLabelText("Bookmarks")).toHaveFocus);
});

test("open dialog", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Bookmarks"));
  click(screen.getByRole("menuitem", { name: "Bookmark This Tab..." }));
  await wait(expect(screen.getByLabelText("Bookmark This Tab...")).toBeVisible);
  await wait(expect(screen.getByText("Cancel")).toHaveFocus);
});

test("close dialog", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Bookmarks"));
  press.ArrowDown();
  press.ArrowDown();
  press.Enter();
  await wait(expect(screen.getByLabelText("Bookmark This Tab...")).toBeVisible);
  await wait(expect(screen.getByText("Cancel")).toHaveFocus);
  press.Enter();
  await wait(
    expect(screen.getByLabelText("Bookmark This Tab...")).not.toBeVisible
  );
  await wait(
    expect(screen.getByRole("menuitem", { name: "Bookmark This Tab..." }))
      .toHaveFocus
  );
});

test("hover menu items with dialog open", async () => {
  render(<MenuWithSubmenu />);
  click(screen.getByText("Bookmarks"));
  press.ArrowDown();
  press.ArrowDown();
  press.Enter();
  await wait(expect(screen.getByLabelText("Bookmark This Tab...")).toBeVisible);
  hover(screen.getByText("Bookmark Manager"));
  expect(screen.getByLabelText("Bookmark This Tab...")).toBeVisible();
});
