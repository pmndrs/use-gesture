---
'@use-gesture/core': patch
---

## General breaking changes:

- `config.domTarget` is renamed `config.target`
- `config.initial` is renamed `config.from`
- `config.from` accounts for `offset` and not for `movement` as it was the case for `config.initial`

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