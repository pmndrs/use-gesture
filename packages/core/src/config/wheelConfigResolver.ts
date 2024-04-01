import { coordinatesConfigResolver } from './coordinatesConfigResolver'

export const wheelConfigResolver = {
  ...coordinatesConfigResolver,
  reverse: (value = false) => value
}
