/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Controller } from '@use-gesture/core'

export function useRecognizers(handlers, config, gestureKey) {
  const ctrl = React.useMemo(() => new Controller(handlers), [])
  ctrl.applyHandlers(handlers)
  ctrl.applyConfig(config, gestureKey)

  React.useEffect(ctrl.effect.bind(ctrl))
  React.useEffect(() => {
    return () => ctrl.clean()
  }, [])

  return ctrl.bind.bind(ctrl)
}
