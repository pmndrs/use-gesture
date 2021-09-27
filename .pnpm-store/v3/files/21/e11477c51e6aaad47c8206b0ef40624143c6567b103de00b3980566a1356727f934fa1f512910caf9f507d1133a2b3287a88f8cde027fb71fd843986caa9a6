import React from 'react'
import { Meta } from '@storybook/react'
import Reset from './components/decorator-reset'
import { Half2Icon, OpacityIcon, DimensionsIcon } from '@radix-ui/react-icons'

import { folder, useControls, LevaInputs } from '../src'

export default {
  title: 'Misc/Input options',
  decorators: [Reset],
} as Meta

export const LabelAndIcon = () => {
  const values = useControls({
    string: { value: 'hello', label: 'My string' },
    color: { value: '#f00', label: <Half2Icon /> },
    opacity: { value: 0.5, label: <OpacityIcon /> },
    size: { value: { width: 200, height: 300 }, label: <DimensionsIcon /> },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Hint = () => {
  const values = useControls({
    color: { value: '#f00', hint: 'Used for important content' },
    position: { value: [0, 0, 0], hint: 'Position of the object relative to the screen' },
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Render = () => {
  const values = useControls({
    show: { value: true, label: 'Show color' },
    color: { value: '#fff', render: (get) => get('show') },
    show2: { value: false, label: 'Show folder' },
    folder: folder(
      {
        number: 1,
        string: {
          value: 'shown if `number >= 1`',
          render: (get) => get('folder.number') >= 1,
        },
      },
      { render: (get) => get('show2') }
    ),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Optional = () => {
  const values = useControls({
    color: { value: '#f00', optional: true },
    vector: { value: [0, 0, 0], optional: true, disabled: true },
  })
  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

function A() {
  const renderRef = React.useRef(0)
  const divRef = React.useRef(null)
  renderRef.current++
  const data = useControls({
    color: {
      value: '#f00',
      onChange: (v) => {
        divRef.current.style.color = v
        divRef.current.innerText = `Transient color is ${v}`
      },
    },
  })
  return (
    <div style={{ padding: 20, margin: 20, border: '1px solid black' }}>
      <pre>A data (should be empty)</pre>
      <pre>{JSON.stringify(data, null, '  ')}</pre>A rendered {renderRef.current} time
      <div style={{ marginTop: 20 }} ref={divRef} />
    </div>
  )
}

function B() {
  const data = useControls({
    color: { value: '#f00' },
  })
  return (
    <div style={{ padding: 20, margin: 20, border: '1px solid black' }}>
      <pre>B data (should update)</pre>
      <pre>{JSON.stringify(data, null, '  ')}</pre>
    </div>
  )
}

export const OnChange = () => {
  const [showA, setShowA] = React.useState(true)
  return (
    <>
      <button onClick={() => setShowA((s) => !s)}>{showA ? 'Hide A' : 'Show A'}</button>
      {showA && <A />}
      <B />
    </>
  )
}

OnChange.storyName = 'onChange'

export const OnChangeWithRender = ({ transient }) => {
  const ref = React.useRef<HTMLPreElement | null>(null)
  const data = useControls({
    color: {
      value: '#f00',
      onChange: (value) => {
        ref.current.innerHTML = value
      },
      transient,
    },
  })

  return (
    <div style={{ padding: 20, margin: 20, border: '1px solid black' }}>
      <pre>color data (should{transient ? ' not' : null} update)</pre>
      <pre>{JSON.stringify(data, null, '  ')}</pre>
      <pre>Transient Value (should also update)</pre>
      <pre ref={ref}></pre>
    </div>
  )
}
OnChangeWithRender.args = {
  transient: false,
}

OnChangeWithRender.storyName = 'onChange With Render'

export const OnChangeFromPanel = () => {
  const ref = React.useRef<HTMLDivElement>()
  const [, set] = useControls(() => ({
    value: {
      value: 0.1,
      optional: true,
      onChange: (value, path, context) => {
        const node = window.document.createElement('pre')
        node.innerText = JSON.stringify({ value, path, context })
        ref.current.appendChild(node)
        ref.current.scrollTop = ref.current.scrollHeight
      },
    },
  }))

  return (
    <>
      <div ref={ref} style={{ overflowY: 'scroll', height: 150 }}></div>
      <button onClick={() => set({ value: Math.random() })}>Change Value externally</button>
    </>
  )
}

OnChangeFromPanel.storyName = 'onChange From Panel'

export const EnforceInputType = () => {
  useControls({
    color: {
      type: LevaInputs.STRING,
      value: '#f00',
    },
    number: {
      type: LevaInputs.STRING,
      value: '1',
    },
  })

  return null
}

export const OnEditStartOnEditEnd = () => {
  const [isEditing, setIsEditing] = React.useState(0)
  const [editedInput, setEditedInput] = React.useState<{ value: any; path: string }>(null)

  const onEditStart = (value, path, context) => {
    setIsEditing((i) => i + 1)
    setEditedInput({ value, path })
  }

  const onEditEnd = () => {
    setIsEditing((i) => i - 1)
  }

  const data = useControls({
    string: { value: 'foobars', onEditStart, onEditEnd },
    number: { value: 1, onEditStart, onEditEnd },
    numberSlider: { value: 1, onEditStart, onEditEnd, min: 0, max: 10 },
    interval: { value: [1, 10], min: 1, max: 10, onEditStart, onEditEnd },
    vector2d: { value: [1, 1], onEditStart, onEditEnd },
    vector3d: { value: [1, 1, 1], onEditStart, onEditEnd },
    color: { value: '#fff', onEditStart, onEditEnd },
  })

  return (
    <div style={{ padding: 20, margin: 20, border: '1px solid black' }}>
      <pre>Value</pre>
      <pre>{JSON.stringify(data, null, '  ')}</pre>
      <pre>
        {isEditing === 0
          ? 'Not Editing'
          : `Editing ${editedInput.path} with initial value ${String(editedInput.value)}`}
      </pre>
    </div>
  )
}

OnEditStartOnEditEnd.storyName = 'onEditStart And onEditEnd'

function OnEditComponent({ name }) {
  const [edited, setEdited] = React.useState(false)
  useControls({
    input: {
      value: 'something',
      onEditStart: () => setEdited(true),
      onEditEnd: () => setEdited(false),
    },
  })
  return (
    <pre>
      Component {name} is being edited: {String(edited)}
    </pre>
  )
}

export const OnEditStartOnEditEndMultiPanel = () => {
  const [toggled, toggle] = React.useState(true)
  return (
    <>
      <button onClick={() => toggle((t) => !t)}>{toggled ? 'Hide' : 'Show'} B</button>
      <OnEditComponent name="A" />
      {toggled && <OnEditComponent name="B" />}
    </>
  )
}

OnEditStartOnEditEndMultiPanel.storyName = 'onEdit Multiple Callbacks'
