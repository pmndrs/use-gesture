import { contains } from './contains.js';

/**
 * Returns `true` if `event` has been fired within a React Portal element.
 */

function isPortalEvent(event) {
  return !contains(event.currentTarget, event.target);
}

export { isPortalEvent };
