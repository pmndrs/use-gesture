/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Controller from '../Controller'
import {
  InternalConfig,
  HookReturnType,
  InternalHandlers,
  RecognizerClasses,
  GenericOptions,
  NativeHandlersPartial,
  ReactEventHandlerKey,
  Fn,
} from '../types'
/**
 * @private
 *
 * Utility hook called by all gesture hooks and that will be responsible for the internals.
 *
 * @param {Partial<InternalHandlers>} handlers
 * @param {RecognizerClasses} classes
 * @param {InternalConfig} config
 * @param {NativeHandlersPartial} nativeHandlers - native handlers such as onClick, onMouseDown, etc.
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export default function useRecognizers<Config extends Partial<GenericOptions>>(
  handlers: Partial<InternalHandlers>,
  classes: RecognizerClasses,
  config: InternalConfig,
  nativeHandlers?: NativeHandlersPartial
): (...args: any[]) => HookReturnType<Config> {
  // The gesture controller keeping track of all gesture states
  const controller = React.useMemo(() => {
    const current = new Controller()

    /**
     * The bind function will create gesture recognizers and return the right
     * bind object depending on whether `domTarget` was specified in the config object.
     */
    const bind = (...args: any[]) => {
      current.resetBindings()
      classes.forEach(RecognizerClass => {
        new RecognizerClass(current, args).addBindings()
      })

      if (controller.nativeRefs) {
        // we also add event bindings for native handlers
        Object.entries(controller.nativeRefs).forEach(([eventName, fn]) => {
          // we're cheating when it comes to event type :(
          current.addBindings(eventName as ReactEventHandlerKey, fn as Fn)
        })
      }

      return current.getBind() as HookReturnType<Config>
    }

    return { nativeRefs: nativeHandlers, current, bind }
  }, [])

  // We reassign the config and handlers to the controller on every render.
  controller.current!.config = config
  controller.current!.handlers = handlers
  // We assign nativeHandlers, otherwise they won't be refreshed on the next render.
  controller.nativeRefs = nativeHandlers

  // Run controller clean functions on unmount.
  React.useEffect(() => controller.current!.clean, [])

  return controller.bind
}
