import { Vector2dComponent } from './Vector2d'
import { getVectorPlugin } from '../Vector'
import { createInternalPlugin } from '../../plugin'
import type { InternalVector2dSettings } from './vector2d-types'

export * from './Vector2d'

const plugin = getVectorPlugin(['x', 'y'])
const normalize = ({ joystick = true, ...input }: any) => {
  const { value, settings } = plugin.normalize(input)
  return { value, settings: { ...settings, joystick } as InternalVector2dSettings }
}

export default createInternalPlugin({
  component: Vector2dComponent,
  ...plugin,
  normalize,
})
