/* eslint-disable no-console */
if (window.PointerEvent) {
  console.error('ERROR: patching PointerEvent is no longer necessary')
} else {
  console.log('Setup: patching PointerEvent')
  // @ts-ignore
  window.PointerEvent = window.MouseEvent
  document.createEvent = null // prevents https://github.com/facebook/react/blob/master/packages/shared/invokeGuardedCallbackImpl.js
  window.onpointerdown = true // prevents lib warning during tests
  // patching window
  const _windowAddEventListener = window.addEventListener
  window.addEventListener = function (type, fn, capture) {
    _windowAddEventListener(type.replace('pointer', 'mouse'), fn, capture)
  }

  // patching elements
  const _addEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (type, fn, capture) {
    this._addEventListener = _addEventListener
    this._addEventListener(type.replace('pointer', 'mouse'), fn, capture)
  }
}
