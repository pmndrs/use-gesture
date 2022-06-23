export type Vector2 = [number, number]
export type WebKitGestureEvent = PointerEvent & { scale: number; rotation: number }
export type Target = EventTarget | { current: EventTarget | null }
export type PointerType = 'mouse' | 'touch' | 'pen'
