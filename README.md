<p align="middle">
  <a href="https://codesandbox.io/embed/n9vo1my91p"><img src="https://i.imgur.com/tg1mN1F.gif" width="655"/></a>
</p>
<p align="middle">
  <a href="https://codesandbox.io/embed/j0y0vpz59"><img src="https://i.imgur.com/OxGLHeT.gif" width="515"/></a>
  <a href="https://codesandbox.io/embed/r5qmj8m6lq"><img src="https://i.imgur.com/ifdCBvG.gif" width="130"/></a>
</p>
<p align="middle">
  <i>These demos are real, click them!</i>
</p>

```
npm install react-with-gesture
```

Ever thought about doing that sidebar pull-out, a view pager, some slider, any gesture on the web basically, and dropped the idea because it's too hard? In that case, this is your lib.

React-with-gesture is a small utility that lets you bind richer mouse and touch events to any component or view. With the data you receive it becomes trivial to set up gestures, and often takes no more than a few lines of code.
    
You can use it stand-alone, but to make the most of it you should combine it with an animation library like [react-spring](https://github.com/react-spring/react-spring), though you can most certainly use any other.

### Api

```js
import { useGesture, withGesture, Gesture } from 'react-with-gesture'
```

The api is straight forward. You can use React-hooks, render-props or higher-order-components. You bind handlers to your view (done for you if you use render-props or hoc's), and you will receive events when you click/drag/pull/release it. Hooks however are preferred, since they allow gestures to be re-used for more than one view (you can use the same `bind()` function multiple times!).

```js
// Full config with event handler
const bind = useGesture({ onAction: event => eventHandler, ...config })
return <div {...bind(optionalArgs)} />

// Short cut with event handler (becomes onAction + default config)
const bind = useGesture(event => eventHandler)
return <div {...bind(optionalArgs)} />

// Without onAction it will re-render the component on event changes with fresh props
const [bind, props] = useGesture({ ...config })
return <div {...bind(optionalArgs)} />

/* -------------------------- Render-props and Higher-order-components -------------------------- */

<Gesture {...config}>
  {event => <div />}
</Gesture>

@withGesture(config)
class extends React.Component {
  render() {
    const event = this.props.event
    return <div />
  }
}

withGesture(config)(Component)
```

### Config

```
{ 
  touch: true,                  // accept touch input
  mouse: true,                  // accept mouse input
  passive: { passive: true },   // event handler 3rd argument input, passive by default
  onAction: undefined           // event => eventHandler, respond to events outside Reacts render cycle
}
```

### Event data

```
{
  event,                        // source event
  target,                       // dom node
  time,                         // time tag
  initial,                      // click coordinates (vec2)
  xy,                           // page coordinates (vec2)
  previous,                     // previous page coordinates (vec2)
  delta,                        // delta offset (xy - initial) (vec2)
  direction,                    // direction normal (vec2)
  local,                        // delta with book-keeping (vec2)
  velocity,                     // drag momentuum / speed
  distance,                     // delta distance
  down,                         // mouse / touch down
  first,                        // marks first event (mouse / touch down)
  args,                         // arguments optionally passed to bind(a,b,c,d,..)
  temp,                         // arguments optionally returned by onActions eventHandler
}
```

### Examples

#### React hooks (basic drag/n/drop)

<img src="https://i.imgur.com/ooNu3jz.gif" width="195"/>

Demo: https://codesandbox.io/embed/l2wy87l28l

In this example we use useGesture's default syntax, where each change ends up re-rendering the component so that we get fresh props that we simply stick into the view. In this case we fetch `local` off the gesture event, which keeps track of delta positions after release. Deltas are especially important in this lib, because they make it possible to use transitions for positioning, instead of doing complex getBoundingClientRect() calculations to figure out where a node went on the screen.

```jsx
const [bind, { local: [x, y] }] = useGesture()
return <div {...bind()} style={{ transform: `translate3d(${x}px,${y}px,0)` }} />
```

#### React hooks with onAction (and react-spring) (basic pull & release)

<img src="https://i.imgur.com/KDeJBqp.gif" width="195"/>

Demo: https://codesandbox.io/embed/r24mzvo3q

Re-rendering on every event can be taxing, but it can be avoided. If you are using an animation lib that can update the view outside of React (for instance react-spring or animated), then you can use the onAction syntax, which gives you a callback in which you receive events. 

```jsx
const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
const bind = useGesture(({ down, delta }) => set({ xy: down ? delta : [0, 0] }))
return (
  <animated.div
    {...bind()}
    style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}
  />
)
```

#### React hooks with onAction (and react-spring) (decay)

<img src="https://i.imgur.com/JyeQsEI.gif" width="195"/>

Demo: https://codesandbox.io/embed/zq19y1xr9m

This demo reads out further data like velocity and direction to calculate decay. `temp` in this case is a simple storage that picks up whatever value you (optionally) return inside the event handler. It's valid as long as the gesture is active. Without this you would need to store the initial xy value somewhere else and conditionally update it when the gesture begins.

```jsx
const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
const bind = useGesture(({ down, delta, velocity, direction, temp = xy.getValue() }) => {
  set({ 
    xy: add(delta, temp),
    immediate: down,
    config: { velocity: scale(direction, velocity), decay: true }
  })
  return temp
})
return (
  <animated.div
    {...bind()}
    style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}
  />
)
```
