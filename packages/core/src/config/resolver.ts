import { sharedConfigResolver } from './sharedConfigResolver'
import { ConfigResolverMap } from '../imports'
import { GestureKey, InternalConfig, UserGestureConfig } from '../types'

export type Resolver = (x: any, key: string, obj: any) => any
export type ResolverMap = { [k: string]: Resolver | ResolverMap | boolean }

export function resolveWith<T extends { [k: string]: any }, V extends { [k: string]: any }>(
  config: Partial<T> = {},
  resolvers: ResolverMap
): V {
  const result: any = {}

  for (const [key, resolver] of Object.entries(resolvers))
    switch (typeof resolver) {
      case 'function':
        result[key] = resolver.call(result, config[key], key, config)
        break
      case 'object':
        result[key] = resolveWith(config[key], resolver)
        break
      case 'boolean':
        if (resolver) result[key] = config[key]
        break
    }

  return result
}

export function parse(config: UserGestureConfig, gestureKey?: GestureKey): InternalConfig {
  const { target, eventOptions, window, enabled, ...rest } = config as any
  const _config: any = {
    shared: resolveWith({ target, eventOptions, window, enabled }, sharedConfigResolver)
  }

  if (gestureKey) {
    const resolver = ConfigResolverMap.get(gestureKey)!
    _config[gestureKey] = resolveWith({ shared: _config.shared, ...rest }, resolver)
  } else {
    for (const key in rest) {
      const resolver = ConfigResolverMap.get(key as GestureKey)!
      _config[key] = resolveWith({ shared: _config.shared, ...rest[key] }, resolver)
    }
  }
  return _config
}
