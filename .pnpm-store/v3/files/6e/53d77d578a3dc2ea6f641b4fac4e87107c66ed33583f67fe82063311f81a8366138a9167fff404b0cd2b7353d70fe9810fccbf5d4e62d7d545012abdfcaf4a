import { createEvent } from "../createEvent";

test("createEvent", () => {
  const element = document.createElement("div");
  const event = createEvent(element, "focus", { bubbles: false });
  expect(event).toBeInstanceOf(Event);
});
