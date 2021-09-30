type Listener = (...args: Array<any>) => void

type EventEmitter = {
  on: (topic: string, listener: Listener) => void
  off: (topic: string, listener: Listener) => void
  emit: (event: string, ...args: Array<any>) => void
}

/**
 * Super simple event emitter.
 */
export const createEventEmitter = (): EventEmitter => {
  const listenerMapping = new Map<string, Set<Listener>>()
  return {
    on: (topic, listener) => {
      let listeners = listenerMapping.get(topic)
      if (listeners === undefined) {
        listeners = new Set()
        listenerMapping.set(topic, listeners)
      }
      listeners.add(listener)
    },
    off: (topic, listener) => {
      const listeners = listenerMapping.get(topic)
      if (listeners === undefined) {
        return
      }
      listeners.delete(listener)
      if (listeners.size === 0) {
        listenerMapping.delete(topic)
      }
    },
    emit: (topic, ...args) => {
      const listeners = listenerMapping.get(topic)
      if (listeners === undefined) {
        return
      }
      for (const listener of listeners) {
        listener(...args)
      }
    },
  }
}
