import { commonConfigResolver } from './common'

export const pinchConfigResolver = {
  ...commonConfigResolver,
  device() {
    return 'touch'
  }
}
