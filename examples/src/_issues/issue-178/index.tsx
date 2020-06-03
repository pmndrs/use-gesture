import React from 'react'
import { useGesture } from 'react-use-gesture'

export default function Issue() {
  const bind = useGesture({ onMouseDown, onTouchStart })

  function onMouseDown(event: React.MouseEvent) {
    console.log('onMouseDown', event)
  }

  function onTouchStart(event: React.TouchEvent) {
    console.log('onTouchStart', event)
  }

  return <div {...bind()} />
}
