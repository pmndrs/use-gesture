import { PinchConfig, GenericOptions, InternalPinchOptions, State, Vector2 } from '../types'
import { call, assignDefault } from '../utils/fn'
import { V } from '../utils/maths'
import { commonConfigResolver } from './commonConfigResolver'
import { SUPPORT } from './support'

export const pinchConfigResolver = {
  ...commonConfigResolver,
  useTouch(_v: any, _k: string, { pointer: { touch = false } = {} }) {
    return SUPPORT.touch && touch
  },
  device(this: InternalPinchOptions, _v: any, _k: string, config: { shared: GenericOptions } & PinchConfig) {
    // Only try to use gesture events when they are supported and domTarget is set
    // as React doesn't support gesture handlers.
    const sharedConfig = config.shared
    if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture) return 'gesture'
    if (sharedConfig.r3f) return 'pointer'
    if (this.useTouch) return 'touch'
    if (SUPPORT.touch && SUPPORT.pointer) return 'pointer'
    if (SUPPORT.touch) return 'touch'
    // device is undefined and that's ok, we're going to use wheel to zoom.
  },
  useRad(_v: any, _k: string, config: { shared: GenericOptions } & PinchConfig) {
    return config.angleUnit === 'rad' || (config.angleUnit == null && config.shared.r3f)
  },
  bounds(_v: any, _k: string, { scaleBounds = {}, angleBounds = {} }: PinchConfig) {
    const _scaleBounds = (state?: State) => {
      const D = assignDefault(call(scaleBounds, state), { min: -Infinity, max: Infinity })
      return [D.min, D.max]
    }

    const _angleBounds = (state?: State) => {
      const A = assignDefault(call(angleBounds, state), { min: -Infinity, max: Infinity })
      return [A.min, A.max]
    }

    if (typeof scaleBounds !== 'function' && typeof angleBounds !== 'function') return [_scaleBounds(), _angleBounds()]

    return (state: State) => [_scaleBounds(state), _angleBounds(state)]
  },
  threshold(this: InternalPinchOptions, value: number | Vector2, _k: string, config: PinchConfig) {
    this.lockDirection = config.axis === 'lock'
    const angleRatio = this.useRad ? Math.PI / 180 : 1
    const threshold = V.toVector(value, this.lockDirection ? [0.1, 3 * angleRatio] : 0)
    return threshold
  }
}
