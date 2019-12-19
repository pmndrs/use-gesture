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
  const controller = React.useRef<Controller>() // The gesture controller keeping track of all gesture states
  const nativeRefs = React.useRef<NativeHandlersPartial>()

  if (!controller.current) {
    // We only initialize the gesture controller once
    controller.current = new Controller()
  }

  // We reassign the config and handlers to the controller on every render.
  controller.current!.config = config
  controller.current!.handlers = handlers

  /**
   * We also assign nativeHandlers to a ref, otherwise it they won't be refreshed
   * on the next render.
   */
  nativeRefs.current = nativeHandlers

  /**
   * When the component unmounts, we run the controller clean functions that will be responsible
   * for removing listeners, clearing timeouts etc.
   */
  React.useEffect(() => controller.current!.clean, [])

  /**
   * The bind function will create gesture recognizers and return the right
   * bind object depending on whether `domTarget` was specified in the config object.
   */
  const [bind] = React.useState(() => (...args: any[]) => {
    controller.current!.resetBindings()
    classes.forEach(RecognizerClass => {
      const recognizer = new RecognizerClass(controller.current!, args)
      recognizer.addBindings()
    })

    if (nativeRefs.current) {
      // we also add event bindings for native handlers
      Object.entries(nativeRefs.current).forEach(([eventName, fn]) => {
        // we're cheating when it comes to event type :(
        controller.current!.addBindings(eventName as ReactEventHandlerKey, fn as Fn)
      })
    }

    return controller.current!.getBind() as HookReturnType<Config>
  })

  return bind
}
