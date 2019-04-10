import * as React from 'react'
import { useGesture, GestureXYState, GestureDAState } from '../../index'

function useGestureWithFunction(props: any) {
  const bind = useGesture(
    (state: GestureXYState): any => {
      console.log(state)
    },
    { event: { passive: false } }
  )
  return <div {...bind(...props)}> gesture hooks with function </div>
}

function useGestureWithOnDrag(props: any) {
  const bind = useGesture(
    {
      onDrag(state: GestureXYState): any {
        console.log(state)
      }
    },
    { event: { passive: false }, window }
  )
  return <div {...bind(...props)}> gesture hooks with on action </div>
}

function useGestureNoConfig(props: any) {
  const bind = useGesture({
    onPinch(state: GestureDAState): any {
      console.log(state)
    }
  })
  return <div {...bind(...props)}> gesture hooks with on action </div>
}
