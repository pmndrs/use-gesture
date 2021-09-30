type UserFocusElement = HTMLElement & { userFocus?: boolean };

export function userFocus(element: UserFocusElement) {
  element.userFocus = true;
  element.focus();
  element.userFocus = false;
}

export function hasUserFocus(element: UserFocusElement) {
  return !!element.userFocus;
}

export function setUserFocus(element: UserFocusElement, value: boolean) {
  element.userFocus = value;
}
