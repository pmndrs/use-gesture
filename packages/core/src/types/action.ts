import { GestureKey } from 'packages/react/src'
import { ResolverMap } from '../config/resolver'
import type { Controller } from '../Controller'
import type { Engine } from '../engines/Engine'

export type EngineClass<Key extends GestureKey> = {
  new (controller: Controller, args: any[], key: Key): Engine<Key>
}

export type Action = {
  key: GestureKey
  engine: EngineClass<GestureKey>
  resolver: ResolverMap
}
