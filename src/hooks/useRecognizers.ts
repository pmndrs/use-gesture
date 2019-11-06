import React from 'react'
import Controller from '../Controller'
import Recognizer from 'recognizers/Recognizer'
import { PartialUserConfig, Handler, Coordinates, DistanceAngle, Fn, ReactEventHandlers } from '../types'
import { getDerivedConfig } from '../utils/config'

type CreateRecognizer = (controller: Controller, args: any[]) => Recognizer<Coordinates> | Recognizer<DistanceAngle>

export const createRecognizer = <T extends Coordinates | DistanceAngle>(
  handler: Handler<T>,
  RecognizerClass: { new (controller: Controller, args: any[]): Recognizer<T> }
) => (controller: Controller, args: any[]): Recognizer<T> => {
  const recognizer = new RecognizerClass(controller, args)
  recognizer.handler = handler
  return recognizer
}

type GetBinderTypeFromDomTarget<T extends PartialUserConfig> = T['domTarget'] extends object ? Fn : ReactEventHandlers

export default function useRecognizers<Config extends PartialUserConfig>(
  createRecognizers: CreateRecognizer | CreateRecognizer[],
  config: PartialUserConfig
): (...args: any[]) => GetBinderTypeFromDomTarget<Config> {
  // the gesture controller will keep track of all gesture states
  const controller = React.useRef<Controller>()
  const createRecognizersArray = Array.isArray(createRecognizers) ? createRecognizers : [createRecognizers]

  if (!controller.current) {
    // we initialize the gesture controller once
    controller.current = new Controller(getDerivedConfig(config))
  }

  React.useEffect(() => {
    // every time the config changes, we let the gesture controller compute
    // them so that the gesture handlers functions are aware of the changes
    controller.current!.config = getDerivedConfig(config)
  }, [config])

  // when the user component unmounts, we run our gesture controller clean function
  React.useEffect(() => controller.current!.clean, [])

  const bind = (...args: any[]) => {
    controller.current!.resetBindings()
    createRecognizersArray.forEach(createRecognizer => {
      const recognizer = createRecognizer(controller.current!, args)
      recognizer.addBindings()
    })

    return controller.current!.getBind() as GetBinderTypeFromDomTarget<Config>
  }

  // we return the bind function of our controller, which returns an binding object or
  // a cleaning function depending on whether config.domTarget is set
  return bind
}
