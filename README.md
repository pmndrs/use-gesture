# react-use-gesture

![npm (tag)](https://img.shields.io/npm/v/react-use-gesture.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-use-gesture/6.0.1.svg) ![NPM](https://img.shields.io/npm/l/react-use-gesture.svg) [![BuildStatus](https://travis-ci.org/react-spring/react-use-gesture.svg)](https://travis-ci.org/react-spring/react-use-gesture?branch=v6)

React-use-gesture is a hook that lets you bind richer mouse and touch events to any component or view. With the data you receive, it becomes trivial to set up gestures, and often takes no more than a few lines of code.

You can use it stand-alone, but to make the most of it you should combine it with an animation library like [react-spring](https://github.com/react-spring/react-spring), though you can most certainly use any other.

<p align="middle">
  <a href="https://codesandbox.io/s/draggable-list-vp020"><img src="https://i.imgur.com/qLKJod3.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/cards-utgqg"><img src="https://i.imgur.com/H6nXQEq.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/react-use-gesture-sheet-fg3w0"><img src="https://i.imgur.com/THKPrmR.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/infinite-slideshow-fu8wc"><img src="https://i.imgur.com/cuOfqST.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/viewpager-0km3o"><img src="https://i.imgur.com/iwZOfT9.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/9o92o24wrr"><img src="https://i.imgur.com/Walt1Ip.gif" width="400"/></a>
</p>

<p align="middle"><i>The demos are real click them!</i></p>

## Api

### Simple example

<p align="middle">
  <a href="https://codesandbox.io/s/react-use-gesture-simple-y7yk9"><img src="https://i.imgur.com/AMzsEi3.gif" width="400"/></a>
</p>

```jsx
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

function PullRelease() {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

  // 1. Define the gesture
  const bind = useDrag(({ down, movement }) => set({ xy: down ? movement : [0, 0] }))

  return (
    <animated.div
      // 2. Bind it to a component
      {...bind()}
      style={{ transform: xy.to((x, y) => `translate3D(${x}px, ${y}px, 0)`) }} />
```

The example above makes a `div` draggable so that it follows your mouse on drag, and returns to its initial position on release.

➡️ [_Why using `react-spring` instead of `React.useState`_](#why-using-react-spring-instead-of-reactusestate)?

### Available hooks

React-use-gesture exports several hooks that can handle different gestures.

| Hook         | Description                                                                                                     |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| `useDrag`    | Handles the drag gesture                                                                                        |
| `useMove`    | Handles mouse move events (touch devices not supported)                                                         |
| `useHover`   | Handles mouse over events (touch devices not supported)                                                         |
| `useScroll`  | Handles scroll events                                                                                           |
| `useWheel`   | Handles wheel events                                                                                            |
| `usePinch`   | Handles pinch events                                                                                            |
| `useGesture` | Handles multiple gestures in one hook ([read more here](#usegesture-hook-supporting-multiple-gestures-at-once)) |

### Gesture event state

Every time a handler is called, it will get passed a gesture state that includes the source event and adds multiple attributes such as speed, previous value, and much mroe.

#### useDrag, useScroll, useWheel, useHover event state

```jsx
const bind = useDrag(({
  event,      // * the source event
              // * event.gesture indicates which gesture originated the event
  xy,         // [x,y] position of the pointer or scroll value for useScroll or useWheel
  previous,   // * previous xy
  initial,    // * xy value when the gesture has started
  delta,      // * delta between current and previous values (xy - previous)
  movement,   // * last gesture offset (xy - initial)
  offset,     // * offset since the first gesture (movement with book-keeping)
  vxvy,       // [vx, vy] momentum / speed of the gesture
  velocity,   // combined moment / speed of the gesture
  distance,   // offset distance
  direction,  // * [dirx, diry] direction per axis
  time,       // * timestamp of the current gesture
  first,      // * true when it's the first event
  last,       // * true when it's the last event
  active,     // * true when the gesture is active
  memo,       // * stores the value returned by your handler during its previous run
  cancel,     // * function you can call to interrupt relevant gestures (drag and pinch only)
  canceled,   // * whether the gesture has been canceled (drag and pinch only)
  down,       // * true when a mouse button or touch is down
  buttons,    // * buttons pressed (see https://developer.mozilla.org/fr/docs/Web/API/MouseEvent/button)
  touches     // * numbers of touches pressing the screen
  shiftKey, altKey, ctrlKey, metaKey,    // * true when modifier keys are pressed
  args        // * arguments you passed to bind
}) => {
    /* gesture logic */
  }
)
```

➡️ [_How do I use `memo`?_](#how-do-i-use-memo)

#### usePinch event state

Pinch is about scaling and rotating, therefore the keys `xy` and `vxvy` are renamed `da` (for distance and angle) and `vdva` respectively.

```jsx
const bind = usePinch(({
  da,         // [d,a] absolute distance and angle of the two pointers
  vdva,       // momentum / speed of the distance and rotation
  origin      // coordinates of the center between the two touch event
}) => {
  /* gesture logic */
  }
)
```

### Gesture options

You can pass a an object as an optional second argument to `use[Gesture]` hooks to customize their behavior.

```jsx
const bind = useScroll(handler, {
  // lets you specify a dom node or ref you want to attach the gesture to
  domTarget: undefined,
  // the event config attribute lets you configure `passive` and `capture` options passed to event listeners
  event: { passive: true, capture: false },
  // uses PointerEvent handlers for compatible gestures (disabled by default)
  dragDelay: false // you can set a delay in ms that will prevent drag from triggering if you just "click" on your element
  pointerEvents: false,
  // lets you specify which window element the gesture should use.
  window: window,
  // enables or disables gestures
  enabled: true,
  // enables or disables gestures individually (relevant for the useGesture hook)
  drag: true,
  pinch: true,
  scroll: true,
  wheel: true,
  move: true
})
```

➡️ [_How do I use `domTarget`_](#adding-gestures-to-dom-nodes)?

➡️ _See this [thread](https://github.com/react-spring/react-use-gesture/pull/43#issue-262835054) for a relevant use case of `window`._

## Advanced usage

#### useGesture hook: supporting multiple gestures at once

If you want your component to support multiple gestures at once, it is preferred that you use the `useGesture` hook as below.

```jsx
const bind = useGesture({
  onDrag: state => {...},     // fires on drag
  onPinch: state => {...},    // fires on pinch
  onScroll: state => {...},   // fires on scroll
  onHover: state => {...},    // fires on mouse enter, mouse leave
  onMove: state => {...},     // fires on mouse move over the element
  onWheel: state => {...}     // fires on mouse wheel over the element
})
```

#### on[Gesture]Start and on[Gesture]End handlers

Drag, pinch, move, scroll and wheel gestures also have two additional handlers that let you perform actions when they start or end. For example, `onScrollEnd` fires when the user finished scrolling.

> **Note #1:** `on[Gesture]Start` and `on[Gesture]End` methods are provided as a commodity. `on[Gesture]` handlers also receive `first` and `last` properties that indicate if the event fired is the first (i.e. gesture has started) or the last one (i.e. gesture has ended).

```jsx
// this:
useGesture({ onDragStart: doStuffOnStart, onDragEnd:doStuffOnEnd })

// is equivalent to this:
useDrag(({first, last}) {
  if (first) { /* do stuff on drag start */ }
  if (last) { /* do stuff on drag end */ }
})
```

#### Adding gestures to dom nodes

React-use-gesture also supports adding handlers to dom nodes directly (or the `window` or `document` objects). In that case, you shouldn't spread the `bind()` object returned by `use[Gesture]` hooks as a prop, but use the `React.useEffect` hook as below.

```jsx
// this will add a scroll listener to the window
const bind = useScroll(state => doStuff, { domTarget: window })
React.useEffect(bind, [bind])
```

You can also directly pass a ref to `domTarget`:

```jsx
const myRef = React.useRef(null)
// this will add a scroll listener the div
const bind = useScroll(state => doStuff, { domTarget: myRef })
React.useEffect(bind, [bind])
/*...*/
return <div ref={myRef} />
```

> _Note that using `useEffect` will also take care of removing event listeners when the component is unmounted._

#### How do I use memo?

<p align="middle">
  <a href="https://codesandbox.io/s/memo-rocket-29nih"><img src="https://i.imgur.com/BnZtmxE.gif" width="400"/></a>
</p>

This demo reads out further data like velocity and direction to calculate decay. `memo` in this case is a simple storage that picks up whatever value you (optionally) return inside the event handler. It's valid as long as the gesture is active. Without this you would need to store the initial `pos` value somewhere else and conditionally update it when the gesture begins.

```jsx
const [{ pos }, set] = useSpring(() => ({ pos: [0, 0] }))
const bind = useDrag(({ active, movement, velocity, direction, memo = pos.getValue() }) => {
  set({
    pos: addV(movement, memo),
    immediate: active,
    config: { velocity: scale(direction, velocity), decay: true },
  })
  return memo
})
return <animated.div {...bind()} style={{ transform: pos.to((x, y) => `translate3d(${x}px,${y}px,0)`) }} />
```

#### Using PointerEvents

You can set gestures to use [PointerEvent](https://developer.mozilla.org/fr/docs/Web/API/PointerEvent) instead of traditional mouse or touch events. It might be useful if you use [React-three-fiber](https://github.com/react-spring/react-three-fiber). Note that only drag, move and hover gestures currently support this option.

```jsx
const bind = useDrag(fn, { pointerEvents: true })
```

### Other examples

- [Locking Axis](https://codesandbox.io/s/25n4m933j)
- [Boundaries](https://codesandbox.io/s/r7xnzk4x0o)
- [Swipe](https://codesandbox.io/s/crimson-dawn-pzf9t)

### Utilities

React-use-gesture also exports two methods that add or substract vectors formed as arrays. They might be handy in the case you need to manipulate positions.

```jsx
import { addV, subV } from 'react-use-gesture'

const sum = addV([10, 10], [5, 5]) // => [15, 15]
const sub = subV([10, 10], [5, 5]) // => [5, 5]
```

## Frequently Asked Questions

#### Why using `react-spring` instead of `React.useState`?

Simply because setting state in the gesture handler would re-render the component on each gesture frame, which isn't always good for performance. `react-spring` lets us animate components without triggering renders. You could still use `useState` if you'd like though!

#### ️What are the differences between using `use[Gesture]` hooks and adding listeners manually?

Not a lot! Essentially these `use[Gesture]` hooks simplify the implementation of the drag and pinch gestures, calculate kinematics values you wouldn't get out of the box from the listeners, and debounce move, scroll and wheel events to let you know when they end.

#### Why `onMove` when `onDrag` already exists?

`onDrag` only fires while you touch or press the element. You just need to hover your mouse above the element to trigger `onMove`.

#### Why `onWheel` and `onScroll`?

Scrolling and wheeling are structurally different events although they produce similar results (i.e. scrolling a page). First of all, `wheel` is a mouse-only event. Then, for `onScroll` to be fired, the element you're scrolling needs to actually scroll, therefore have content overflowing, while you just need to wheel over an element to trigger `onWheel`. If you use [react-three-fiber](https://github.com/drcmda/react-three-fiber), `onWheel` might prove useful to simulate scroll on canvas elements.

#### Accessing source event triggers a warning in the console!

You're probably trying to access an event in `onScroll`, `onMove` or `onWheel` handlers. The last event is debounced, and therefore not accessible asynchronously because of how React pools events. A possible solution would be to make sure the event is not part of the last state update:

```jsx
useScroll(({ event, last }) => {
  !last && event.preventDefault() // <-- event will not be accessed in the last event
})
```

#### Why do I need to return `memo`?

As you've seen in some examples, whenever `memo` is used, it is imperatively returned in the handler function. Essentially `memo` is a gesture state attribute that is undefined when the gesture starts, but then takes the return value of the handler function.

In many use cases, we want `memo` to hold the original value of our element position when the gesture starts so that it becomes our point of reference when adding the gesture `movement`. So we set `memo` to the value of our position when `memo` is undefined, which is in fact when the gesture starts. Usually it looks like so:

```jsx
const [{ x }, set] = useSpring(() => ({ x: 0 }))
const bind = useDrag(({ movement: [mx], memo = x.getValue() }) => {
  set({ x: ox + memo })
  return memo
})
```

If we don’t return `memo`, then `memo` will remain undefined and in the next drag frame `memo` will take again the value of x, which will have updated in the meantime (therefore not being the point of reference when the gesture starts anymore).

It may sound silly but returning `memo` makes sure that we continue holding a reference to the initial value of `memo`, ie the original value of x when the gesture started.

#### Why is drag being triggered when I just click on an element?

This is typically a-feature-not-a-bug situation 🙃 Drag is triggered as soon as you mouse down on your component, which means it will be triggered when you "just" briefly click on it. However, there is an option to not trigger the drag before a certain delay, using the config option `dragDelay`.

```jsx
// using the default delay
const bind = useDrag(() => {
  console.log(`Won't show if you hold your mouse less than 180ms`)
}, { dragDelay: true })

// using a custom delay
const bind = useDrag(() => {
  console.log(`Won't show if you hold your mouse less than 1000ms`)
}, { dragDelay: 1000 })
```

#### Why am I getting warnings from `preventDefault()` after I pass `{ passive: false }`

The basic use of `<Component {...bind()) />` passes the task of attaching listeners to React. React does not [(yet)](https://github.com/facebook/react/issues/6436) support binding passive listeners via props. To have `useGesture` attach the listeners, you must also [use a domTarget](#adding-gestures-to-dom-nodes). This is only required if you plan to `preventDefault` or cancel the event.
