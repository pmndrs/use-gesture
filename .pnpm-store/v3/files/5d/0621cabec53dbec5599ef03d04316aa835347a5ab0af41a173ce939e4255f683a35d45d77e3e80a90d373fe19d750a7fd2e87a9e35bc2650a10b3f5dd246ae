declare type ResizeObserverCallback = (entries: any[], observer: ResizeObserver) => void
declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback)
  observe(target: Element, options?: any): void
  unobserve(target: Element): void
  disconnect(): void
  static toString(): string
}
export interface RectReadOnly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number
  [key: string]: number
}
declare type HTMLOrSVGElement = HTMLElement | SVGElement
declare type Result = [(element: HTMLOrSVGElement | null) => void, RectReadOnly, () => void]
export declare type Options = {
  debounce?:
    | number
    | {
        scroll: number
        resize: number
      }
  scroll?: boolean
  polyfill?: {
    new (cb: ResizeObserverCallback): ResizeObserver
  }
}
declare function useMeasure({ debounce, scroll, polyfill }?: Options): Result
export default useMeasure
