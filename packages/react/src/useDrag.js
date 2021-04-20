/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { registerEngine, Controller, DragEngine } from '@use-gesture/core'

registerEngine('drag', DragEngine)

export function useDrag(dragHandler, config = {}) {
  return useRecognizer({ drag: dragHandler }, { drag: config })
}

function useRecognizer(handlers, config) {
  const ctrl = React.useMemo(() => new Controller(handlers), [])
  ctrl.applyHandlers(handlers)
  ctrl.applyConfig(config)

  return ctrl.bind.bind(ctrl)
}
