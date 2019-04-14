import { useGesture, CoordinatesGestureState, DistanceAngleGestureState } from 'react-use-gesture'

useGesture(
  (state: CoordinatesGestureState): any => {
    // do something with state
  },
  { event: { passive: false } }
)

useGesture(
  {
    onDrag: (state: CoordinatesGestureState): any => {
      // do something with state
    }
  },
  { event: { passive: false }, domTarget: window }
)

useGesture({
  onPinch: (state: DistanceAngleGestureState): any => {
    // do something with state
  }
})

useGesture() // $ExpectError
useGesture({}, { domTarget: window }) // $ExpectError
