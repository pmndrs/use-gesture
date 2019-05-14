import React from 'react'
import Handler from './handler'

import { defaultConfig } from './default'

export function useGesture(props, config) {
  if (typeof props === 'function') props = { onDrag: props }
  if (props.onAction) {
    props.onDrag = props.onAction
  }

  config = { ...defaultConfig, ...props.config, ...config }

  const handler = React.useRef(null)

  if (!handler.current) {
    handler.current = new Handler(props, config)
  }

  React.useEffect(() => {
    handler.current.props = props
    handler.current.config = config
  }, [props, config])

  React.useEffect(() => handler.current.clean, [])

  return handler.current.bind
}
