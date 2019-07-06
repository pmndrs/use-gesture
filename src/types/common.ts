export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type Vector2 = [number, number]
export type Fn = (...args: any[]) => any
export type TransformType = { x(x: number): number; y(y: number): number }
