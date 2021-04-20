export const EngineMap = new Map()
export const ConfigMap = new Map()

export function registerEngine(action, Engine) {
  EngineMap.set(action, Engine)
}
