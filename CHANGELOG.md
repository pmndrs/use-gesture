# Changelog

## 6.0.12 Release

**Summary:** Fixes Typescript import.

### Fixed

1. Added `Omit` to the types import list.

## 6.0.11 Release

**Summary:** Continues fixing of start state.

### Fixed

1. Fixes `previous` attribute in start state.

## 6.0.10 Release

**Summary:** Fixes start state.

### Fixed

1. Fixes [#97](https://github.com/react-spring/react-use-gesture/issues/97) (follow up of #96 with fixes of distance and direction)

## 6.0.9 Release

**Summary:** Fixes refactoring of 6.0.8.

## 6.0.8 Release

**Summary:** Fixes bug with continuous gestures.

### Fixed

1. Scroll and wheel are continuous gestures and should therefore init delta, movement and offset as soon as they start ([#96](https://github.com/react-spring/react-use-gesture/issues/96))

## 6.0.7 Release

**Summary:** Fixes bug with `dragDelay`.

### Fixed

1. Drag no longer reset after `dragDelay` when drag is forced with mouse move.

## 6.0.6 Release

**Summary:** Fixes types 🤦‍

## 6.0.5 Release

**Summary:** Tweak of 6.0.4.

### Improved

1. Moving the cursor when dragging doesn't wait for `dragDelay` timeout.

## 6.0.4 Release

**Summary:** Added option to detect clicks from drag triggers.

### Added

1. Added `dragDelay` config attribute to trigger drag after a given delay.

## 6.0.3 Release

**Summary:** Minor additions.

### Added

1. Added `origin` for wheel pinching (matching cursor position).
2. Added `origin` for trackpad gesture event pinching (matching cursor position).

## 6.0.2 Release

**Summary:** Re-introducing pointer-events.

### Added

1. Pointer Events are supported again with `config: { pointerEvents: true }`.


### Breaking
1. Removed `transform` function: it was originally introduced for `react-three-fiber` support but resulted useless eventually.


## 6.0.1 Release

**Summary:** Bug fix.

### Fixed

1. Pinching with wheel could return undefined angle. It now returns previous angle or 0.

## 6.0.0 Release

**Summary:** Refinement release, better naming of keys, with breaking changes.

### Breaking

1. `temp` is no longer supported. Please use `memo`.
2. `delta` now calculates the delta between current and previous values.
3. Former `delta` is replaced by `movement` (`xy - initial`).
4. Former `local` is replaced by `offset`.
5. `lastLocal` has been removed.
6. `onAction` handler as an alias for `onDrag` is not supported anymore.
7. `useGesture` doesn't support a function as a shortcut for `onDrag`. Please use `useDrag` from now on.

### Added

1. Added `direction` to pinch gestures.
2. Added `delta` that just calculates the delta between current and previous values.
3. Added `addV` and `subV` as convenient exports for adding and substracting vectors formed as arrays.
4. Added a warning when using trackpad zoom without a `domTarget` or `event.passive` set to true.
5. Added a `gesture` key to the event passed to handlers indicating which gesture originated the event.

### Fixed

1. Fixed velocity for angle on pinch gestures.
2. Doesn't trigger the `onWheel` handler when the ctrl key is pressed and `onPinch` is active [#80](https://github.com/react-spring/react-use-gesture/issues/80#issuecomment-520915895).

## 5.2.4 Release

**Summary:** Minor release.

### Fixed

1. `memo` now works as expected when returning `0` from the handler.

## 5.2.3 Release

**Summary:** Minor release.

### Fixed

1. Changed the default timeout for debounced events.

## 5.2.1 Release

**Summary:** Minor release.

### Fixed

1. Fixed issue with Webkit Gesture Recognizer.

## 5.2.0 Release

**Summary:** Introducing shorthand hooks for gestures.

### Added

1. `useDrag`, `useMove`,`useHover`,`useScroll`,`useWheel`,`usePinch` hooks have been added.

### Changed

1. `temp` renamed to `memo`.

## 5.1.3 Release

**Summary:** Better build process and TypeScript improvements.

### Added

1. Build process now uses `tsdx` instead of `rollup`.

### Fixed

1. Event type fixing in TypeScript.

## 5.1.2 Release

**Summary:** Minor release fixing TypeScript export.

### Fixed

1. `import { useGesture } from 'react-use-gesture'` should now be functional.

## ~~5.1.0 Release~~ (do not use)

## 5.1.1 Release

**Summary:** important release introducing trackpad gestures. The library has been fully rewritten in TypeScript with some important refactoring involved.

### Added

1. Support for for zoom and rotate on trackpad for Safari.
2. Support for zoom on trackpad for Chrome and Firefox.
3. Added `buttons` attribute to pointer-related gesture state.
4. Added `origin` attribute to pinch gesture.
5. Accepts support for genuine element handlers (such as `onMouseDown`) to prevent overriding when passing the prop directly to the bound component.

### Fixed

1. Drag gesture will interrupt if a move event has no button pressed (that could happen if triggering a right click) and then moving the mouse around.

### Breaking changes

1. `config` object must be passed as a second argument.

## 5.0.2 Release

**Summary:** minor release.

### Fixed

1. Added `onHover` in Typescript definitions.

## 5.0.1 Release

**Summary:** release updating dev dependencies and fixing minor bugs.

### Fixed

1. Fixed a bug where `onDragEnd` or `onPinchEnd` would be called too late when the gestures are canceled [#52](https://github.com/react-spring/react-use-gesture/issues/52)

2. Wheel and scroll gestures are also returning modifier keys.

## 5.0.0 Release

**Summary (recap from betas):** major release introducing additional gestures on top of **drag**: **pinch**, **scroll**, **wheel**, **hover** and **move** are now supported. This release is dropping support for high-order and render-props component and can only be used through React hooks 🎣. Therefore `react-with-gesture` is now `react-use-gesture`.

### Added

1. Support for pinch, scroll, wheel, move and hover events. Each gesture has now an `active` boolean prop that lets you know whether it’s currently active. State also include `dragging`, `moving`, `scrolling`, `wheeling`, `pinching`, and `hovering` booleans so that you can know within a gesture handler the running state of all others.

2. Support for dynamically enabling or disabling gestures in the `config` object: `useGesture(actions, { enabled: false })` or `useGesture(actions, { drag: true, move: false })` if you want to disable or enable gestures individually.

3. You can now add a gesture to a dom node or the `window` (useful for scroll) with the `domTarget` config prop. In that case you shouldn’t spread `bind` in a component but use the `useEffect` hook that will take care of adding and removing listeners:

```jsx
const bind = useGesture({ onScroll: () => {...} }, { domTarget: window })
React.useEffect(bind, [bind])
```

4. Individual per-axis velocity has been added in gesture state props as `vxvy: vector2`.

5. There's a new `transform` config prop that can be passed to change the way `x` and `y` are calculated (useful for canvas which inverts axis compared to the dom).

6. Experimental support for pointer events through config: `{ event : { pointerEvents: true } }`.

7. Tests with `react-testing-library`.

8. Travis integration.

### Improved

1. State and props are no longer frozen, meaning you can now use state or props values from your component _inside_ your handler and they will be up to date.

```jsx
const [dragCount, setDragCount] = useState(0)
const bind = useGesture({
  onDrag: ({ first }) => {
    console.log(dragCount) //<-- count will be up to date
    if (first) setDragCount(dragCount + 1)
  },
})
```

3. Readme should be clearer (hopefully)!

### Breaking

1. HOC and render-props component support has been dropped. Hooks usage is enforced, therefore this package requires React 16.8+.

2. Default syntax `[bind, props] = useGesture()` has been dropped in favor of `bind = useGesture({ onDrag: () => {...} })` which is more performance-effective since it doesn’t render on each frame.

3. `onAction` prop is now an alias of `onDrag` but should be avoided as its support could be dropped at any time. Subsequently, `onUp` and `onDown` have been dropped, and there's now `on[Gesture]Start` and `on[Gesture]End` handlers.

4. `config` object should now be passed as a second argument.

```jsx
// from this:
useGesture({ onAction: () => {}, config })
// to this:
useGesture({ onDrag: () => {} }, { ...config })
```

5. `touch` and `mouse` config props are dropped.

## 5.0.0-beta.8 Release

**Summary:** Removed default export to match TypeScript import in JS.

### Breaking

1. You should now import useGesture as follows: `import { useGesture } from 'react-use-gesture'`

## 5.0.0-beta.7 Release

**Summary:** Minor bug fixing.

### Fixed

1. `first` was still set to `true` when the gesture finished if no movement was registered.

## 5.0.0-beta.6 Release

**Summary:** Minor bug fixing.

### Fixed

1. `NaN` or `Infinity` velocities are now set to `0`.

## 5.0.0-beta.5 Release

**Summary:** bug fixing and more tests.

### Improved

2. `domTarget` now accepts refs.
1. Tests are now testing `domTarget`.
1. Tests are now testing `bind` passing arguments.

### Fixed

1. `onMoveEnd` shouldn't fire if state isn't moving (ie `onLeave` was triggered).
2. Performance optimizations were removed as they were conflicting with passing args to `bind`.

## 5.0.0-beta.4 Release

**Summary:** bug fixing and added tests!

### Added

1. Tests have been added with `react-testing-library`: they still throw a warning about some tests not being wrapped in `act(...)` but this is probably because of async debouncing in move, scroll, wheel events and RAF for `cancel` in drag and pinch.

2. Added Travis integration.

### Improved

1. Now using `dtslint` for Typescript definitions and tests.

### Fixed

1. `first` was always returning true and this is no longer the case.

2. `active` wasn't set to `true` when moving in `onMove`.

3. Added `active`set to `false` on `mouseLeave` for `onHover`. This might not be a good idea though.

## 5.0.0-beta.3 Release

**Summary:** major release introducing additional gestures on top of **drag**: **pinch**, **scroll**, **wheel**, **hover** and **move** are now supported. This release is dropping support for high-order and render-props component and can only be used through React hooks 🎣. Therefore `react-with-gesture` is now `react-use-gesture`.

### Added

1. Support for pinch, scroll, wheel, move and hover events. Each gesture has now an `active` boolean prop that lets you know whether it’s currently active. State also include `dragging`, `moving`, `scrolling`, `wheeling`, `pinching`, and `hovering` booleans so that you can know within a gesture handler the running state of all others.

2. Support for dynamically enabling or disabling gestures in the `config` object: `useGesture(actions, { enabled: false })` or `useGesture(actions, { drag: true, move: false })` if you want to disable or enable gestures individually.

3. You can now add a gesture to a dom node or the `window` (useful for scroll) with the `domTarget` config prop. In that case you shouldn’t spread `bind` in a component but use the `useEffect` hook that will take care of adding and removing listeners:

```jsx
const bind = useGesture({ onScroll: () => {...} }, { domTarget: window })
React.useEffect(bind, [bind])
```

4. Individual per-axis velocity has been added in gesture state props as `vxvy: vector2`.

5. There's a new `transform` config prop that can be passed to change the way `x` and `y` are calculated (useful for canvas which inverts axis compared to the dom).

6. Experimental support for pointer events through config: `{ event : { pointerEvents: true } }`.

### Improved

1. `useGesture` returned value is now cached which should produce better performance in case of frequent renders produced by external factors (i.e. prop change).

2. State and props are no longer frozen, meaning you can now use state or props values from your component _inside_ your handler and they will be up to date.

```jsx
const [dragCount, setDragCount] = useState(0)
const bind = useGesture({
  onDrag: ({ first }) => {
    console.log(dragCount) //<-- count will be up to date
    if (first) setDragCount(dragCount + 1)
  },
})
```

3. Readme should be clearer (hopefully)!

### Breaking

1. HOC and render-props component support has been dropped. Hooks usage is enforced, therefore this package requires React 16.8+.

2. Default syntax `[bind, props] = useGesture()` has been dropped in favor of `bind = useGesture({ onDrag: () => {...} })` which is more performance-effective since it doesn’t render on each frame.

3. `onAction` prop is now an alias of `onDrag` but should be avoided as its support could be dropped at any time. Subsequently, `onUp` and `onDown` have been dropped, and there's now `on[Gesture]Start` and `on[Gesture]End` handlers.

4. `config` object should now be passed as a second argument.

```jsx
// from this:
useGesture({ onAction: () => {}, config })
// to this:
useGesture({ onDrag: () => {} }, { ...config })
```

5. `touch` and `mouse` config props are dropped.
