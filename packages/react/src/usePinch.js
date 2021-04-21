import { registerEngine, PinchEngine } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('pinch', PinchEngine)

export function usePinch(pinchHandler, config = {}) {
  return useRecognizers({ pinch: pinchHandler }, { pinch: config })
}
