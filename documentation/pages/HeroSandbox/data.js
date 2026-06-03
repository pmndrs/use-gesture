import { folder } from 'leva'

export const tweaks = {
  Movement: folder({
    axis: { value: undefined, options: { 'x axis': 'x', 'y axis': 'y', lock: 'lock' } },
    threshold: { value: 0, min: 0, max: 100, step: 1 }
  }),
  activateBounds: { value: false, label: 'activate bounds' },
  rubberband: { value: 0.15, min: 0, max: 3, render: (get) => get('activateBounds') },
  Bounds: folder(
    {
      vertical: { value: [-100, 100], min: -200, max: 200, step: 1 },
      horizontal: { value: [-100, 100], min: -200, max: 200, step: 1 }
    },
    { render: (get) => get('activateBounds') }
  )
}
