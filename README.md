<p align="middle">
  <a href="https://codesandbox.io/s/viewpager-0km3o"><img src="https://i.imgur.com/tg1mN1F.gif" width="655"/></a>
</p>
<p align="middle">
  <a href="https://codesandbox.io/s/cards-utgqg"><img src="https://i.imgur.com/OxGLHeT.gif" width="515"/></a>
  <a href="https://codesandbox.io/s/draggable-list-vp020"><img src="https://i.imgur.com/ifdCBvG.gif" width="130"/></a>
  <a href="https://codesandbox.io/s/9o92o24wrr"><img src="https://i.imgur.com/z6jFWpM.gif" width="180"/></a>
</p>
<p align="middle">
  <i>These demos are real, click them!</i>
</p>

# react-use-gesture

![npm (tag)](https://img.shields.io/npm/v/react-use-gesture.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-use-gesture.svg) ![NPM](https://img.shields.io/npm/l/react-use-gesture.svg) [![BuildStatus](https://travis-ci.org/react-spring/react-use-gesture.svg)](https://travis-ci.org/react-spring/react-use-gesture?branch=next)

Ever thought about doing that sidebar pull-out, a view pager, some slider, any gesture on the web basically, and dropped the idea because it's too hard? In that case, this is your lib.

React-use-gesture is a React hook that lets you bind richer mouse and touch events to any component or view. With the data you receive, it becomes trivial to set up gestures, and often takes no more than a few lines of code.

You can use it stand-alone, but to make the most of it you should combine it with an animation library like [react-spring](https://github.com/react-spring/react-spring), though you can most certainly use any other.

## Installation

```
npm install react-use-gesture
```

## Api

```jsx
import { useDrag } from 'react-use-gesture'

// in your component
const bind = useDrag(dragState => {
  /* do stuff on drag */
}, config)
```

The api is straight forward. You import the hook related to the gesture you want to handle and you will receive events when you interact with the component. These events include the source dom event, but also carry additional kinematics such as velocity, distance, delta, etc.

Hooks allow gestures to be re-used for more than one view (you can use the same `bind()` function multiple times!).

### Supported hooks

| Hook         | Description                                             |
| ------------ | ------------------------------------------------------- |
| `useDrag`    | Handles the drag gesture                                |
| `useMove`    | Handles mouse move events (touch devices not supported) |
| `useHover`   | Handles mouse over events (touch devices not supported) |
| `useScroll`  | Handles scroll events                                   |
| `useWheel`   | Handles wheel events                                    |
| `usePinch`   | Handles pinch events                                    |
| `useGesture` | Handles multiple gestures in one hook                   |

#### Making things move

<p align="middle">
  <img src="https://i.imgur.com/ooNu3jz.gif" width="200"/>
</p>

```jsx
function myComponent() {
  const [[x, y], set] = React.useState([0, 0])
  const bind = useGesture(({ local }) => set(local))
  return <div {...bind()} style={{ transform: `translate3d(${x}px,${y}px,0)` }} />
}
```

When the user drags the `div` that receives the `{...bind()}` prop, `useGesture` updates the state of the component and the `div` gets positioned accordingly.

In this case we fetch `local` off the gesture event, which keeps track of delta positions after release. Deltas are especially important in this lib, because they make it possible to use transitions for positioning, instead of doing complex `getBoundingClientRect()` calculations to figure out where a node went on the screen.

#### Avoid re-rendering (preferred)

In the example we’ve just seen, the component gets re-rendered every time `useGesture` drag handler fires, which can be taxing. To avoid re-rendering you may want to use libraries such as [react-spring](https://github.com/react-spring/react-spring) that allow animating dom elements without setting state, and therefore without triggering new renders.

```jsx
import { useSpring, animated } from 'react-spring'

function myComponent() {
  const [{ local }, set] = useSpring(() => ({ local: [0, 0] }))
  const bind = useDrag(({ local }) => set({ local }))

  return <animated.div {...bind()} style={{ transform: local.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} />
}
```

Because we’re now using `animated.div`, we’re able to make the element draggable without provoking new renders every time its position should update.

### Supporting multiple gestures at once

If you want your component to support multiple gestures at once, it is preferred that you use the `useGesture` hook.

```jsx
const bind = useGesture({
  onDrag: state => {...},     // fires on drag
  onPinch: state => {...},     // fires on pinch
  onScroll: state => {...},   // fires on scroll
  onHover: state => {...},    // fires on mouse enter, mouse leave
  onMove: state => {...},     // fires on mouse move over the element
  onWheel: state => {...}     // fires on mouse wheel over the element
})
```

### `on[Gesture]Start` and `on[Gesture]End`

Drag, pinch, move, scroll and wheel gestures also have two additional handlers that let you perform actions when they start or end. For example, `onScrollEnd` fires when the user finished scrolling.

> **Note #1:** `on[Gesture]Start` and `on[Gesture]End` methods are provided as a commodity. `on[Gesture]` handlers also receive `first` and `last` properties that indicate if the event fired is the first (i.e. gesture has started) or the last one (i.e. gesture has ended).

```jsx
// this:
useGesture({ onDragStart: doStuffOnStart, onDragEnd:doStuffOnEnd })

// is equivalent to this:
useGesture({
  onDrag: ({first, last}) {
    if(first) doStuffOnStart()
    if (last) doStuffOnEnd()
  }
})
```

> **Note #2:** since browsers don't have native event listeners for when scroll, move or wheel ends, react-use-gesture debounces these events to estimate when they stopped. One of the consequence of debouncing is trying to access properties from the source event when a gesture has ended will probably result in a warning: [React does event pooling](https://reactjs.org/docs/events.html#event-pooling), meaning a React event can only be queried synchronously.

### Adding gestures to dom nodes

React-use-gesture also supports adding handlers to dom nodes directly (or the `window` or `document` objects). In that case, you shouldn't spread the `bind()` object returned by `useGesture` as a prop, but use the `React.useEffect` hook as below.

```js
// this will add a scroll listener to the window
const bind = useScroll(state => doStuff, { domTarget: window })
React.useEffect(bind, [bind])
```

You can also directly pass a ref to `domTarget`:

```js
const myRef = React.useRef(null)
// this will add a scroll listener the div
const bind = useScroll(state => doStuff, { domTarget: myRef })
React.useEffect(bind, [bind])
/*...*/
return <div ref={myRef} />
```

> _Note that using `useEffect` will also take care of removing event listeners when the component is unmounted._

### `use[Gesture]` event state

Every time a handler is called, it will get passed the current event state for its corresponding gesture. An event state is an object that includes the source event and adds multiple attributes listed below.

#### Shared State

The following attributes are provid| Hook | Description |
`|` useDrag Handles the drag gesture |
| `useMove` | Handles hover events (touch devices not supported)
| `useHover` | Handlers | ed to the handler for all gestures.

| Name                                                | Type       | Description                                                                                                                  |
| --------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `event`                                             | `object`   | source event                                                                                                                 |
| `time`                                              | `Number`   | timestamp of the current gesture                                                                                             |
| `first`                                             | `Boolean`  | marks the first event                                                                                                        |
| `last`                                              | `Boolean`  | marks the last event                                                                                                         |
| `active`                                            | `Boolean`  | `true` when the gesture is active, `false` otherwise                                                                         |
| `memo`                                              | `Any`      | serves as a cache storing any value returned by your handler during its previous run. See below for an example.              |
| `cancel`                                            | `Function` | you can call `cancel` to interrupt the drag or pinch gestures. `cancel`is only relevant for `onDrag` and `onPinch` handlers. |
| `down`                                              | `Boolean`  | mouse / touch down                                                                                                           |
| `buttons`                                           | `Number`   | buttons pressed (see [documentation](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent/button))                       |
| `touches`                                           | `Number`   | number of touches pressing the screen                                                                                        |
| `shiftKey`<br/>`altKey`<br/>`ctrlKey`<br/>`metaKey` | `Boolean`  | modifier keys are pressed                                                                                                    |
| `dragging`                                          | `Boolean`  | `true` when the user is dragging                                                                                             |
| `moving`                                            | `Boolean`  | `true` when the user is moving the mouse                                                                                     |
| `hovering`                                          | `Boolean`  | `true` when the mouse hovers the element                                                                                     |
| `scrolling`                                         | `Boolean`  | `true` when the user is scrolling                                                                                            |
| `wheeling`                                          | `Boolean`  | `true` when the user is wheeling                                                                                             |
| `args`                                              | `Any`      | arguments you passed to `bind`                                                                                               |

#### Specific state attributes for X/Y Coordinates Gestures `[drag, scroll, wheel, hover]`

The following attributes are provided to the handler for gestures that deal with `x/y` coordinates.

| Name        | Type           | Description                                                                                                                                                                  |
| ----------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `xy`        | `Vec2 ([x,y])` | for touch/mouse events, `xy` returns the position of the pointer on the screen. For scroll/wheel events `xy` returns how much the element has been scrolled on x and y axis. |
| `previous`  | `Vec2`         | previous `xy`                                                                                                                                                                |
| `initial`   | `Vec2`         | `xy` value when the gesture has started                                                                                                                                      |
| `delta`     | `Vec2`         | delta offset (`xy - initial`)                                                                                                                                                |
| `local`     | `Vec2`         | delta with book-keeping (remembers the `xy` value throughout gestures)                                                                                                       |
| `lastLocal` | `Vec2`         | previous `local`                                                                                                                                                             |
| `vxvy`      | `Vec2`         | momentum / speed of the gesture (`x` and `y` axis separated)                                                                                                                 |
| `velocity`  | `Number`       | momentum / speed of the gesture (`x` and `y` axis combined)                                                                                                                  |
| `distance`  | `Number`       | delta distance                                                                                                                                                               |

#### Specific state attributes for Distance Angle Gestures `[pinch]`

Pinch is generally about scaling and rotating. The scale depends on the distance between the two fingers, while the rotation depends on the direction / angle of the vector formed by the two fingers or pointers.

> _More specifically, both scale and rotation depends on the `delta` of `distance` and `angle`, so you will probably end up using `local` or `delta` in most cases._

| Name        | Type     | Description                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------- |
| `da`        | `Vec2`   | absolute distance and angle of the two pointers/fingers.                                    |
| `previous`  | `Vec2`   | previous `da`                                                                               |
| `initial`   | `Vec2`   | `da` value when the gesture has started                                                     |
| `delta`     | `Vec2`   | delta offset (`da - initial`)                                                               |
| `local`     | `Vec2`   | delta with book-keeping (remembers the `da` value throughout gestures)                      |
| `lastLocal` | `Vec2`   | previous `local`                                                                            |
| `vdva`      | `Vec2`   | momentum / speed of the gesture for distance and angle                                      |
| `origin`    | `Number` | center between the two touch event coordinates                                              |
| `turns`     | `Number` | keeps track of the number of turns (don't rely on `turns` to count the number of rotations) |

### `use[Gesture]` config

You can pass a `config` object as an optional second argument to `use[Gesture]` hooks to customize their behavior.

| Name                                                                    | Default Value                     | Description                                                                                                                                                                            |
| ----------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domTarget`                                                             | `undefined`                       | lets you specify a dom node you want to attach gestures to (body, window, document...). You can also pass a ref created with the `useRef` hook.                                        |
| `event`                                                                 | `{passive: true, capture: false}` | the event config attribute lets you configure `passive` and `capture` options passed to event listeners.                                                                               |
| `transform`                                                             | `{x: x => x, y =>y }`             | transform functions you can pass to modify `x` and `y` values.                                                                                                                         |
| `window`                                                                | `window`                          | lets you specify which `window` element `useGesture` should use. See this [thread](https://github.com/react-spring/react-use-gesture/pull/43#issue-262835054) for a relevant use case. |
| `enabled`                                                               | `true`                            | enables or disables all gestures                                                                                                                                                       |
| `drag`<br/>`pinch`<br/>`scroll`<br/>`wheel`<br/>`hover`<br/>`move`<br/> | `true`                            | enables or disables gestures individually                                                                                                                                              |

## Examples

#### The case fo `memo`

<p align="middle">
  <img src="https://i.imgur.com/JyeQsEI.gif" width="200"/>
  <br/>
  <a href="https://codesandbox.io/s/memo-and-decay-r7gxy">Codesandbox</a>
</p>

This demo reads out further data like velocity and direction to calculate decay. `memo` in this case is a simple storage that picks up whatever value you (optionally) return inside the event handler. It's valid as long as the gesture is active. Without this you would need to store the initial `xy` value somewhere else and conditionally update it when the gesture begins.

```jsx
const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
const bind = useDrag(({ active, delta, velocity, direction, memo = xy.getValue() }) => {
  set({
    xy: add(delta, memo),
    immediate: active,
    config: { velocity: scale(direction, velocity), decay: true },
  })
  return memo
})
return <animated.div {...bind()} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} />
```

#### Other examples

- [Locking Axis](https://codesandbox.io/s/25n4m933j)
- [Boundaries](https://codesandbox.io/s/r7xnzk4x0o)
- [Swipe](https://codesandbox.io/s/crimson-dawn-pzf9t)
- [Action Sheet](https://codesandbox.io/s/react-use-gesture-sheet-fg3w0)

## Frequently asked questions

**What are the differences between using `use[Gesture]` hooks and adding listeners manually?**

Not a lot! Essentially these `use[Gesture]` hooks simplifies the implementation of the drag and pinch gestures, calculates kinematics values you wouldn't get out of the box from the listeners, and debounces move scroll and wheel events to let you know when they end.

**Why `onMove` when `onDrag` already exists?**

`onDrag` only fires while you touch or press the element. You just need to hover your mouse above the element to trigger `onMove`.

**Why `onWheel` and `onScroll`?**

Scrolling and wheeling are structurally different events although they produce similar results (i.e. scrolling a page). First of all, `wheel` is a mouse-only event. Then, for `onScroll` to be fired, the element you're scrolling needs to actually scroll, therefore have content overflowing, while you just need to wheel over an element to trigger `onWheel`. If you use [react-three-fiber](https://github.com/drcmda/react-three-fiber), `onWheel` might prove useful to simulate scroll on canvas elements.

**Accessing source event triggers a warning in the console!**

You're probably trying to access an event in `onScroll`, `onMove` or `onWheel` handlers. The last event is debounced, and therefore not accessible asynchronously because of how React pools events. A possible solution would be to make sure the event is not part of the last state update:

```jsx
useScroll(({ event, last }) => {
  !last && event.preventDefault() // <-- event will not be accessed in the last event
})
```

**Why do I need to return `memo`?**

As you've seen in some examples, whenever `memo` is used, it is imperatively returned in the handler function. Essentially `memo` is a gesture state attribute that is undefined when the gesture starts, but then takes the return value of the handler function.

In many use cases, we want `memo` to hold the original value of our element position when the gesture starts so that it becomes our point of reference when adding the gesture `delta`. So we set `memo` to the value of our position when `memo` is undefined, which is in fact when the gesture starts. Usually it looks like so:

```jsx
const [{ x }, set] = useSpring(() => ({ x: 0 }))
const bind = useDrag(({ delta: [dx], memo = x.getValue() }) => {
  set({ x: dx + memo })
  return memo
})
```

If we don’t return `memo`, then `memo` will remain undefined and in the next drag frame `memo` will take again the value of x, which will have updated in the meantime (therefore not being the point of reference when the gesture starts anymore).

It may sound silly but returning `memo` makes sure that we continue holding a reference to the initial value of `memo`, ie the original value of x when the gesture started.
