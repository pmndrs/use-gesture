import React from 'react'
import Handler from './Handler'

export function useGesture(props, config) {
  const handler = React.useRef(null)

  if (!handler.current) {
    handler.current = new Handler(props, config)
  }

  React.useEffect(() => {
    handler.current.setPropsConfig(props, config)
  }, [props, config])

  React.useEffect(() => handler.current.clean, [])

  return handler.current.bind
}
