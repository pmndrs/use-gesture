import * as props from './number-plugin'
import { NumberComponent } from './Number'
import { createInternalPlugin } from '../../plugin'

const { sanitizeStep, ...rest } = props

export * from './Number'
export * from './StyledNumber'
export * from './StyledRange'
export { sanitizeStep }

export default createInternalPlugin({
  component: NumberComponent,
  ...rest,
})
