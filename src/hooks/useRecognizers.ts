/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Controller from '../Controller'
import { InternalConfig, HookReturnType, InternalHandlers, RecognizerClass, GenericOptions, NativeHandlersPartial } from '../types'

import { noop } from '../utils/utils'
/**
 * @private
 *
 * Utility hook called by all gesture hooks and that will be responsible for the internals.
 *
 * @param {Partial<InternalHandlers>} handlers
 * @param classes
 * @param {InternalConfig} config
 * @param {NativeHandlersPartial} nativeHandlers - native handlers such as onClick, onMouseDown, etc.
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export default function useRecognizers<Config extends Partial<GenericOptions>>(
  handlers: Partial<InternalHandlers>,
  classes: RecognizerClass[],
  config: InternalConfig,
  nativeHandlers?: NativeHandlersPartial
): (...args: any[]) => HookReturnType<Config> {
  // The gesture controller keeping track of all gesture states
  const controller = React.useMemo(() => new Controller(classes), [])

  // We reassign the config and handlers to the controller on every render.
  // We assign nativeHandlers, otherwise they won't be refreshed on the next render.
  controller!.config = config
  controller!.handlers = handlers
  controller!.nativeRefs = nativeHandlers

  // Run controller clean functions on unmount.
  React.useEffect(controller.effect, [])

  // @ts-ignore
  if (controller.isDomTargetDefined) return noop
  // @ts-ignore
  return controller.bind
}
