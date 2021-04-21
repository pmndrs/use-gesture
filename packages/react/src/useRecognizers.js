/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Controller } from '@use-gesture/core'

export function useRecognizers(handlers, config) {
  const ctrl = React.useMemo(() => new Controller(handlers), [])
  ctrl.applyHandlers(handlers)
  ctrl.applyConfig(config)

  return ctrl.bind.bind(ctrl)
}
