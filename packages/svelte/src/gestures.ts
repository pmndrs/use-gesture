import type {
  FullGestureState,
  GestureKey,
  UserDragConfig,
  UserHoverConfig,
  UserMoveConfig,
  UserPinchConfig,
  UserScrollConfig,
  UserWheelConfig
} from '@use-gesture/vanilla'
import { DragGesture, HoverGesture, MoveGesture, PinchGesture, ScrollGesture, WheelGesture } from '@use-gesture/vanilla'

export function drag(node: HTMLElement, config?: UserDragConfig) {
  const gesture = new DragGesture(
    node,
    (payload) => {
      node.dispatchEvent(
        new CustomEvent('drag', {
          detail: payload
        })
      )
    },
    config
  )

  return {
    destroy() {
      gesture.destroy()
    }
  }
}

export function move(node: HTMLElement, config?: UserMoveConfig) {
  const gesture = new MoveGesture(
    node,
    (payload) => {
      node.dispatchEvent(
        new CustomEvent('move', {
          detail: payload
        })
      )
    },
    config
  )

  return {
    destroy() {
      gesture.destroy()
    }
  }
}

export function hover(node: HTMLElement, config?: UserHoverConfig) {
  const gesture = new HoverGesture(
    node,
    (payload) => {
      node.dispatchEvent(
        new CustomEvent('hover', {
          detail: payload
        })
      )
    },
    config
  )

  return {
    destroy() {
      gesture.destroy()
    }
  }
}

export function scroll(node: HTMLElement, config?: UserScrollConfig) {
  const gesture = new ScrollGesture(
    node,
    (payload) => {
      node.dispatchEvent(
        new CustomEvent('scroll', {
          detail: payload
        })
      )
    },
    config
  )

  return {
    destroy() {
      gesture.destroy()
    }
  }
}

export function wheel(node: HTMLElement, config?: UserWheelConfig) {
  const gesture = new WheelGesture(
    node,
    (payload) => {
      node.dispatchEvent(
        new CustomEvent('wheel', {
          detail: payload
        })
      )
    },
    config
  )

  return {
    destroy() {
      gesture.destroy()
    }
  }
}

export function pinch(node: HTMLElement, config?: UserPinchConfig) {
  const gesture = new PinchGesture(
    node,
    (payload) => {
      node.dispatchEvent(
        new CustomEvent('pinch', {
          detail: payload
        })
      )
    },
    config
  )

  return {
    destroy() {
      gesture.destroy()
    }
  }
}

export type GestureEvent<Key extends GestureKey> = Omit<FullGestureState<Key>, 'event'> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
}
