import { TransformType } from './common'
import React from 'react'

export type EventOptions = { capture: boolean; passive: boolean }

export interface GestureConfig {
  domTarget?: EventTarget | React.RefObject<EventTarget> | null
  event: EventOptions
  window?: EventTarget | null
  pointerEvents: boolean
  transform: TransformType
  enabled: boolean
  drag: boolean
  pinch: boolean
  scroll: boolean
  wheel: boolean
  hover: boolean
  move: boolean
}
