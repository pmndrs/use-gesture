import { commonConfigResolver } from './commonConfigResolver'

export const pinchConfigResolver = {
  ...commonConfigResolver,
  device() {
    return 'touch'
  }
}
