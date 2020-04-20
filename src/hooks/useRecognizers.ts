/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Controller from '../Controller'
import {
  InternalConfig,
  HookReturnType,
  InternalHandlers,
  RecognizerClass,
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
  const controller = React.useMemo(() => {
    const current = new Controller()

    /**
     * The bind function will create gesture recognizers and return the right
     * bind object depending on whether `domTarget` was specified in the config object.
     */
    const bind = (...args: any[]) => {
      current.resetBindings()
      for (let RecognizerClass of classes) {
        new RecognizerClass(current, args).addBindings()
      }

      // we also add event bindings for native handlers
      if (controller.nativeRefs) {
        for (let eventName in controller.nativeRefs)
          current.addBindings(
            eventName as ReactEventHandlerKey,
            // @ts-ignore we're cheating when it comes to event type :(
            controller.nativeRefs[eventName] as Fn
          )
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
  React.useEffect(() => {
    if (controller.current.isDomTargetDefined) {
      controller.bind()
    }
    return controller.current!.clean
  }, [])

  if (controller.current.isDomTargetDefined) {
    // @ts-ignore
    return () => (...args: any[]) => {
      console.warn(
        `[Deprecation warning] calling useEffect(bind, [bind]) is no longer required. \n`
       +`In the next major this will lead to an error`
      )
    };
  } else {
    return controller.bind
  }

  
}
