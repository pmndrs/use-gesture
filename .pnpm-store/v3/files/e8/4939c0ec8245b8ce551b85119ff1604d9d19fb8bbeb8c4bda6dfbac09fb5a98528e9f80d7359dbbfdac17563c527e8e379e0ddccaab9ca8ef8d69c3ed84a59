import { fireEvent } from "reakit-utils/fireEvent";

export function setTextFieldValue(element: HTMLElement, value: string) {
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    const proto = Object.getPrototypeOf(element);
    const setValue = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setValue) {
      setValue.call(element, value);
      fireEvent(element, "input", { bubbles: true });
    }
  }
}
