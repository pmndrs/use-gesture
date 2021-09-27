export interface Config {
  testIdAttribute: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncWrapper(cb: (...args: any[]) => any): Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventWrapper(cb: (...args: any[]) => any): void
  asyncUtilTimeout: number
  computedStyleSupportsPseudoElements: boolean
  defaultHidden: boolean
  showOriginalStackTrace: boolean
  throwSuggestions: boolean
  getElementError: (message: string | null, container: Element) => Error
}

export interface ConfigFn {
  (existingConfig: Config): Partial<Config>
}

export function configure(configDelta: ConfigFn | Partial<Config>): void
export function getConfig(): Config
