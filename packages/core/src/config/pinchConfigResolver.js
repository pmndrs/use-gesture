import { commonConfigResolver } from './commonConfigResolver'
import { SUPPORT } from './support'

export const pinchConfigResolver = {
  ...commonConfigResolver,
  device(_c, _k, config) {
    // Only try to use gesture events when they are supported and domTarget is set
    // as React doesn't support gesture handlers.
    const sharedConfig = config.shared
    if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture) return 'gesture'
    if (SUPPORT.touch) return 'touch'
  }
}
