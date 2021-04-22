export const EngineMap = new Map()
export const ConfigResolverMap = new Map()

export function registerEngine(action, Engine) {
  EngineMap.set(action, Engine)
}
