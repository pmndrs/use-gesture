import { contains } from "./contains";

/**
 * Returns `true` if `event` has been fired within a React Portal element.
 */
export function isPortalEvent(
  event: React.SyntheticEvent<Element, Event>
): boolean {
  return !contains(event.currentTarget, event.target as Element);
}
