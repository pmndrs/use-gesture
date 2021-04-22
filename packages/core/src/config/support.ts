const isBrowser = typeof window !== 'undefined' && window.document && window.document.createElement

function supportsTouchEvents(): boolean {
  return isBrowser && 'ontouchstart' in window
}

function supportsPointerEvents(): boolean {
  return isBrowser && 'onpointerdown' in window
}

function supportsLock(): boolean {
  return isBrowser && 'exitPointerLock' in window.document
}

export const SUPPORT = {
  isBrowser,
  touch: supportsTouchEvents(),
  pointer: supportsPointerEvents(),
  lock: supportsLock()
}
