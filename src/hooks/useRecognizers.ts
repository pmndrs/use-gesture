import React from 'react'
import Controller from '../Controller'
import Recognizer from 'recognizers/Recognizer'
import { InternalFullConfig, Handler, Coordinates, DistanceAngle, HookReturnType, GenericConfig } from '../types'

type CreateRecognizer = (controller: Controller, args: any[]) => Recognizer<Coordinates> | Recognizer<DistanceAngle>

export const createRecognizer = <T extends Coordinates | DistanceAngle>(
  handler: Handler<T>,
  RecognizerClass: { new (controller: Controller, args: any[]): Recognizer<T> }
) => (controller: Controller, args: any[]): Recognizer<T> => {
  const recognizer = new RecognizerClass(controller, args)
  recognizer.handler = handler
  return recognizer
}

export default function useRecognizers<Config extends Partial<GenericConfig>>(
  createRecognizers: CreateRecognizer | CreateRecognizer[],
  config: InternalFullConfig
): (...args: any[]) => HookReturnType<Config> {
  // the gesture controller will keep track of all gesture states
  const controller = React.useRef<Controller>()
  const createRecognizersArray = Array.isArray(createRecognizers) ? createRecognizers : [createRecognizers]

  if (!controller.current) {
    // we initialize the gesture controller once
    controller.current = new Controller()
  }

  controller.current!.config = config

  // when the user component unmounts, we run our gesture controller clean function
  React.useEffect(() => controller.current!.clean, [])

  const [bind] = React.useState(() => (...args: any[]) => {
    controller.current!.resetBindings()
    createRecognizersArray.forEach(createRecognizer => {
      const recognizer = createRecognizer(controller.current!, args)
      recognizer.addBindings()
    })

    return controller.current!.getBind() as HookReturnType<Config>
  })

  // we return the bind function of our controller, which returns an binding object or
  // a cleaning function depending on whether config.domTarget is set
  return bind
}
