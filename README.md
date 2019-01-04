<p align="middle">
  <img src="https://i.imgur.com/tg1mN1F.gif" width="660"/>
  <img src="https://i.imgur.com/ifdCBvG.gif" width="195"/>
</p>

    npm install react-with-gesture
    
    import { useGesture, withGesture, Gesture } from 'react-with-gesture'

Ever thought about doing that sidebar pull-out, or a view pager, some slider, any gesture on the web basically, and dropped the idea because it's way too hard? In that case, this is your lib. 

React-with-gesture is a small utility that lets you bind richer mouse and touch events to any component or view. It calculates initial position, deltas, velocity, direction, distance, etc. With this data it becomes trivial to set up even complex gesture controls with just a few lines of code.
    
You can use it stand-alone, but to make the most of it you should combine it with a animation library, preferrably [react-spring](https://github.com/react-spring/react-spring) (nothing complements gestures better than physics-based springs).

### Demos

Viewpager/carousel: https://codesandbox.io/embed/n9vo1my91p

Draggable list: https://codesandbox.io/embed/r5qmj8m6lq

Slider: https://codesandbox.io/embed/zrj66y8714

### Api

The api is straight forward. You bind handlers to your view, and you will receive events when the user is clicking/dragging/pulling/releasing them.

```js
// Full config with event handler
const bind = useGesture({ onAction: event => eventHandler, ...config })
return <div {...bind(optionalArgs)} />

// Short cut with event handler (becomes onAction + default config)
const bind = useGesture(event => eventHandler)
return <div {...bind(optionalArgs)} />

// No event handler (will re-render the component on event changes with fresh props)
const [bind, props] = useGesture()
return <div {...bind(optionalArgs)} />

// Render props
<Gesture {...config}>
  {event => <div />}
</Gesture>

// HOC
@withGesture(config)
class extends React.Component {
  render() {
    const event = this.props.event
    return <div />
  }
}
```

### Config

```
{ 
  touch: true,                  // accept mouse input
  mouse: true,                  // accept touch input
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

```jsx
const [bind, { local: [x, y] }] = useGesture()
return <div {...bind()} style={{ transform: `translate3d(${x}px,${y}px,0)` }} />
```

#### React hooks with onAction (and react-spring) (basic pull & release)

<img src="https://i.imgur.com/KDeJBqp.gif" width="195"/>

Demo: https://codesandbox.io/embed/r24mzvo3q

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
