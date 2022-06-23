# @use-gesture/core

## 10.2.16

### Patch Changes

- a521a171f: types: remove React types dependency on core package

## 10.2.15

### Patch Changes

- be1703a6d: fix: reset \_preventScroll when setting up scroll prevention to avoid side effects

## 10.2.14

### Patch Changes

- e82f1c220: fix: improve detection for drag gesture, also fixes #494

## 10.2.13

### Patch Changes

- 6896094b3: fix: preventScroll should resist to multiple fingers drag
- 15724eb5c: - Have `delta` increment on first keydown for drag
  - Fix `config.bounds` type for drag gestures
  - Add `eventOptions` option for each gesture

## 10.2.12

### Patch Changes

- 91651b202: Fix config types

## 10.2.11

### Patch Changes

- 670e6e2db: - fix: trigger `pointerDown` event when `triggerAllEvents` and `delay` options are set
  - fix: disable scroll prevention when the event type is `'mouse'`
  - feat: add `axisThreshold` property to set a threshold for axis calculation (can be set per device for the drag gesture)
  - fix: axis are now calculated on pixel movement rather than on transformed movement
- 5979b1add: feat: add modifierKey for wheel option. Defaults to `'ctrlKey'`.

## 10.2.10

### Patch Changes

- f593dbe09: - fix: increase `PINCH_WHEEL_RATIO` to `100` to slow down zoom on wheel-based devices.
  - fix: force drag to start no matter the threshold when delay is reached.
  - fix: improve `preventScroll`.

## 10.2.9

### Patch Changes

- d86df73b9: feat: add `pointer.mouse` option to force mouse listeners instead of pointers when possible.

## 10.2.8

### Patch Changes

- 2c0fde118: fix: delta is now derived from the `offset` value _after_ it is clamped by bounds.

## 10.2.7

### Patch Changes

- 2d943428c: Fix a bug when a touch identifier is equal to `0`

## 10.2.6

### Patch Changes

- 916d178c6: fix: make sure the drag gesture is ended when `touchcancel` event is triggered.

## 10.2.5

### Patch Changes

- cd5533a4c: fix: change TouchEvent detection
- 548a90985: [Drag] feat: Adding a custom threshold to taps when filtering them (`tapThreshold`)
- c5067dce0: feat: add `overflow` state attribute telling when offset is overflowing bounds.
  [Wheel] fix: only update `offset` when it stays within bounds.
- 4eaabaf1a: fix: add `lostpointercapture` listener for cases when the `pointerup` event is missed.

## 10.2.4

### Patch Changes

- ae631004a: fix: change isNaN to Number.isNaN in dev mode

## 10.2.3

### Patch Changes

- 8302c5bfd: fix: prevent deprecated resolvers from applying in dev mode

## 10.2.2

### Patch Changes

- cffaba5ae: fix: logic error in intent detection

## 10.2.1

### Patch Changes

- 2f0cd466b: fix: release pointerId when PointerEvent is canceled. Should fix [#376](https://github.com/pmndrs/use-gesture/issues/376).

## 10.2.0

### Minor Changes

- b4e6181e7: Fix: should fix `transform` function doesn't have [0,0] origin. This required some pretty drastic internal changes hence the minor version bump.

## 10.1.6

### Patch Changes

- 9883b1c78: types: fix ReactDOMAttributes type

## 10.1.5

### Patch Changes

- 55505c071: fix: `event.buttons` condition was preventing `pointer.touch` from behaving properly.

## 10.1.4

### Patch Changes

- 090ba6b62: feat: allow pointer.buttons to accept an array or -1

## 10.1.3

### Patch Changes

- a9f99ce3c: feat: warn in dev mode if transform function return invalid values

## 10.1.2

### Patch Changes

- ed0073543: fix: add threshold to config resolver

## 10.1.1

### Patch Changes

- 8a0bfacb0: fix: Remove the console output statement.
- 8a0bfacb0: fix: Remove the console output statement.

## 10.1.0

### Minor Changes

- b67543ff7: Feat (drag): add the `pointer.buttons` in order to customize which [buttons combination](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) will trigger the drag gesture.

## 10.0.3

### Patch Changes

- de01d7dbb: Sets state `canceled` / `_active` attributes synchronously with `cancel()`.

## 10.0.2

### Patch Changes

- a219d3f69: fix: make sure delay still set first to true when moving so that onDragStart can fire.

## 10.0.1

### Patch Changes

- c00c7b1: fix: add movement to offset when using wheel-based browsers on pinch
