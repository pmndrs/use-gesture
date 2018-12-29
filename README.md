    npm install react-with-gesture

Wraps a component into a div that receives MouseDown and TouchStart events, then captures movement until release.

<p align="middle">
  <img src="assets/button.gif" width="600"/>
</p>

Demo: https://codesandbox.io/embed/jzn14k0ppy

- `down`, true on mouse-down or finger-touch
- `x/y`, screen coordinates
- `xDelta/yDelta`, coordinates relative to initial coordinates, great for sliding/dragging gestures
- `xInitial/yInitial`, coordinates of the first click/touch
- `xVelocity/yVelocity`, flick velocity
- `xPrev/yPrev`, coordinates of the previous frame
- `target`, the dom element

### Decorated higher order component

```jsx
import { withGesture } from 'react-with-gesture'

@withGesture
export class App extends React.Component {
  render() {
    const { down, x, y, xDelta, yDelta, xInitial, yInitial } = this.props
    return (
      <div>
        Drag me! coordinates: {x}, {y}
      </div>
    )
  }
}
```

### Higher order component

```jsx
class App extends React.Component {
  render() {
    const { down, x, y, xDelta, yDelta, xInitial, yInitial } = this.props
    return (
      <div>
        Drag me! coordinates: {x}, {y}
      </div>
    )
  }
}

export withGesture(App)
```

### Render props

```jsx
import { Gesture } from 'react-with-gesture'

class App extends React.Component {
  render() {
    return (
      <Gesture>
        {({ down, x, y, xDelta, yDelta, xInitial, yInitial }) => (
          <div>
            Drag me! coordinates: {x}, {y}
          </div>
        )}
      </Gesture>
    )
  }
}
```

### Hooks

```jsx
import { useGesture } from 'react-with-gesture'

function App() {
  const [bind, { args, down, x, y, xDelta, yDelta, xInitial, yInitial }] = useGesture()
  return (
    <div {...bind(/*arguments you pass here will be available under args*/)}>
      Drag me! coordinates: {x}, {y}
    </div>
  )
}
```

### Transient mode

This won't cause new render passes, instead you will be notified through the callback. This works the same for Hoc's, render-props and hooks.

```jsx
const bind = useGesture(e => console.log(e))
```
