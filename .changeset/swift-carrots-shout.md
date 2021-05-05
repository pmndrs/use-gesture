---
'@use-gesture/core': patch
---

## General breaking changes

- `config.domTarget` is renamed `config.target`
- `config.initial` is renamed `config.from`
- `config.from` accounts for `offset` and not for `movement` as it was the case for `config.initial`
- `config.bounds` accounts for `offset`
- `velocity` is now a Vector with absolute (use `direction` if you need relative velocity)
- `distance` is now a Vector with cumulative deltas
- `state.pressed` is an alias to `state.down`


## Features

### General

- Types: Handlers have a better type inference
- Adds `r3f` general shared option that will perform some adjustments when using @react-three/fiber 

### Drag

- keyboard support when target has focus!
- shows warning when `touch-action` is not properly set in development mode
- `bounds` accepts an `HTMLElement` or a React Ref
- `config.experimental_preventWindowScrollY` is now `config.preventScroll`
- supports non capturing (uses mouse listeners instead)

```js
useDrag(handler, {
  pointer: {
    touch: true, // uses touch on mobile
    capture: false, // don't use setPointerCapture (uses window)
    lock: true, // will perform a pointer lock when drag starts, and exit pointer lock when drag ends,
  },
  axis: undefined | 'x' | 'y' | 'lock',
  r3f: true, // will set up the hook to perform the best it can with @react-three/fiber,
  swipe: {
    distance: 50,
    velocity: 0.5,
    duration: 250
  }
})
```

### Pinch

- `distanceBounds` is now `scaleBounds`
- `state.movement` and `state.offset` now reflect scale and not distance
- Use pointer events where it can
- Add `useTouch` option to use touch events if needed
- Add `angleUnit` which defaults to `deg` unless `config.r3f` is set to `true` in which case it defaults to `rad`.
Note that `state.values` are still returned in degrees, only `state.movement` and `state.offset` are expressed in the `angleUnit` unit.
- `config.axis` can be set to `'lock'`, which will either scale or rotate.

```js
usePinch(({ offset: [scale, angle] }) => {
  api.start({ rotate: angle, scale })
})
```