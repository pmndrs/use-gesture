interface TimeoutStoreConstructor {
  new (): TimeoutStore
}

export interface TimeoutStore {
  _timeouts: Map<string, number>
  add<FunctionType extends (...args: any) => any>(
    this: TimeoutStore,
    key: string,
    callback: FunctionType,
    ms?: number,
    ...args: Parameters<FunctionType>
  ): void
  remove(this: TimeoutStore, key: string): void
  clean(this: TimeoutStore): void
}

export const TimeoutStore: TimeoutStoreConstructor = function (this: TimeoutStore) {
  this._timeouts = new Map()
} as any

TimeoutStore.prototype.add = function (key, callback, ms = 140, ...args) {
  this.remove(key)
  this._timeouts.set(key, window.setTimeout(callback, ms, ...args))
} as TimeoutStore['add']

TimeoutStore.prototype.remove = function (key) {
  const timeout = this._timeouts.get(key)
  if (timeout) window.clearTimeout(timeout)
} as TimeoutStore['remove']

TimeoutStore.prototype.clean = function () {
  this._timeouts.forEach((timeout) => void window.clearTimeout(timeout))
  this._timeouts.clear()
} as TimeoutStore['clean']
