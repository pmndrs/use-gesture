---
'@use-gesture/core': patch
---

## Breaking changes:

- `domTarget` is renamed `target`

## Features

### General

### Drag

- shows warning when `touch-action` is not properly set in development mode

```js
useDrag(handler, {
  pointer: {
    touch: true, // uses touch on mobile
    capture: false, // don't use setPointerCapture (uses window)
    lock: true, // will perform a pointer lock when drag starts, and exit pointer lock when drag ends,
  },
  axis: undefined | 'x' | 'y' | 'lock',
  r3f: true // will set up the hook to perform the best it can with @react-three/fiber  
})
```