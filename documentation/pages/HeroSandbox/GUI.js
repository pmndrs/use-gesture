import React from 'react'
import DatGui, { DatBoolean, DatNumber, DatSelect, DatFolder } from '@tim-soft/react-dat-gui'

export default ({ data = {}, onUpdate, style }) => (
  <DatGui data={data} onUpdate={onUpdate} style={style}>
    <DatFolder title="Drag Detection">
      <DatNumber path="threshold" label="Int. Threshold" min={-1} max={100} step={1} />
      <DatBoolean path="lockDirection" label="Lock direction" />
      <DatSelect path="axis" label="Axis" options={[undefined, 'x', 'y']} />
      <DatBoolean path="activateBounds" label="Activate Bounds" />
    </DatFolder>
    {data.activateBounds ? (
      <DatFolder title="Bounds">
        <DatNumber path="rubberband" label="Rubberband" min={0} max={3} step={0.05} />
        <DatNumber path="bounds.top" label="Top" min={0} max={200} />
        <DatNumber path="bounds.bottom" label="Bottom" min={0} max={200} />
        <DatNumber path="bounds.right" label="Right" min={0} max={200} />
        <DatNumber path="bounds.left" label="Left" min={0} max={200} />
      </DatFolder>
    ) : null}
  </DatGui>
)

export const initialConfig = {
  axis: undefined,
  lockDirection: false,
  threshold: 10,
  activateBounds: false,
  rubberband: 0.15,
  bounds: {
    enabled: false,
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  },
}
