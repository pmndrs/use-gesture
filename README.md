    npm install react-with-gesture
    
Wraps a component into a div that receives MouseDown and TouchStart events, then captures the movement of it until release. It sends the coordinates, down-state and deltas down to the wrapped component as props.

```jsx
import withGesture from 'react-with-gesture'

@withGesture
class Something extends React.Component {
    render() {
        const { x, y, down }
        `x: ${x} y: ${y} down: ${down}`
    }
}
```


