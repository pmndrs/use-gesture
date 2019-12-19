import React from 'react'
import DatGui, {
  DatBoolean,
  DatNumber,
  DatSelect,
  DatFolder
} from '@tim-soft/react-dat-gui'

export default ({ data = {}, onUpdate }) => (
  <DatGui data={data} onUpdate={onUpdate}>
    <DatFolder title="Drag Detection" closed={false}>
      <DatBoolean path="fliterTaps" label="Filter Clicks" />
      <DatNumber path="delay" label="Drag Delay (ms)" min={0} max={1000} />
      <DatNumber
        path="threshold"
        label="Int. Threshold"
        min={-1}
        max={100}
        step={1}
      />
      <DatBoolean path="lockDirection" label="Lock direction" />
      <DatSelect path="axis" label="Axis" options={[undefined, 'x', 'y']} />
    </DatFolder>
    {data.activateBounds ? (
      <DatFolder title="Bounds" closed={false}>
        <DatBoolean path="activateBounds" label="Activate Bounds" />
        <DatNumber
          path="rubberband"
          label="Rubberband"
          min={0}
          max={3}
          step={0.05}
        />
        <DatNumber path="bounds.top" label="Top" min={-200} max={0} />
        <DatNumber path="bounds.bottom" label="Bottom" min={0} max={200} />
        <DatNumber path="bounds.right" label="Right" min={0} max={200} />
        <DatNumber path="bounds.left" label="Left" min={-200} max={0} />
      </DatFolder>
    ) : (
      <DatFolder title="Bounds" closed={false}>
        <DatBoolean path="activateBounds" label="Activate Bounds" />
      </DatFolder>
    )}
    <DatFolder title="Swipes">
      <DatNumber
        path="swipeVel"
        label="Swipe Velocity"
        min={0}
        max={10}
        step={0.1}
      />
      <DatNumber path="swipeDist" label="Swipe Distance" min={0} max={200} />
    </DatFolder>
    <DatBoolean path="enabled" label="Enabled" />
    <DatBoolean path="pointer" label="🧪 Use pointers" />
    <DatSelect
      path="gesture"
      label="Gesture"
      options={['movement', 'offset']}
    />
  </DatGui>
)

export const initialConfig = {
  gesture: 'movement',
  enabled: true,
  pointer: false,
  axis: undefined,
  delay: 0,
  lockDirection: false,
  fliterTaps: true,
  threshold: 10,
  swipeDist: 100,
  swipeVel: 0.5,
  activateBounds: false,
  rubberband: 0.15,
  bounds: {
    enabled: false,
    top: -100,
    bottom: 100,
    left: -100,
    right: 100
  }
}
