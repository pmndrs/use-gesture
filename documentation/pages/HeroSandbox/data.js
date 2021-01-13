import { makeFolder } from 'use-tweaks'

export const tweaks = {
  ...makeFolder('Movement', {
    axis: { value: 'free', options: { free: 'free', 'x axis': 'x', 'y axis': 'y' } },
    lockDirection: { value: false, label: 'lock direction' },
    threshold: { value: 0, min: 0, max: 100, step: 1 },
    rubberband: { value: 0.15, min: 0, max: 3 },
  }),
  ...makeFolder('Bounds', {
    activateBounds: { value: false, label: 'activate bounds' },
    top: { value: 100, min: 0, max: 200, step: 1 },
    bottom: { value: 100, min: 0, max: 200, step: 1 },
    left: { value: 100, min: 0, max: 200, step: 1 },
    right: { value: 100, min: 0, max: 200, step: 1 },
  }),
}
