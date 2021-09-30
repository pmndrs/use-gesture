import type React from 'react';
import type Controller from './Controller';
import type Recognizer from './recognizers/Recognizer';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type AtLeastOneOf<T, U = {
    [K in keyof T]: Pick<T, K>;
}> = Partial<T> & U[keyof U];
export declare type Vector2 = [number, number];
export declare type Fn = any;
declare type DomTarget = EventTarget | React.RefObject<EventTarget>;
export interface GenericOptions {
    domTarget?: DomTarget;
    window?: EventTarget;
    eventOptions?: {
        capture?: boolean;
        passive?: boolean;
    };
    enabled?: boolean;
    transform?: (v: Vector2) => Vector2;
}
export interface GestureOptions<T extends StateKey> {
    enabled?: boolean;
    initial?: Vector2 | ((state: State[T]) => Vector2);
    threshold?: number | Vector2;
    triggerAllEvents?: boolean;
    rubberband?: boolean | number | Vector2;
    transform?: (v: Vector2) => Vector2;
}
export declare type Bounds = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};
export declare type CoordinatesConfig<T extends CoordinatesKey> = GestureOptions<T> & {
    axis?: 'x' | 'y';
    lockDirection?: boolean;
    bounds?: Bounds | ((state: State[T]) => Bounds);
};
export declare type DistanceAngleBounds = {
    min?: number;
    max?: number;
};
export declare type DistanceAngleConfig<T extends DistanceAngleKey> = GestureOptions<T> & {
    distanceBounds?: DistanceAngleBounds | ((state: State[T]) => DistanceAngleBounds);
    angleBounds?: DistanceAngleBounds | ((state: State[T]) => DistanceAngleBounds);
};
export declare type DragConfig = CoordinatesConfig<'drag'> & {
    filterTaps?: boolean;
    useTouch?: boolean;
    swipeVelocity?: number | Vector2;
    swipeDistance?: number | Vector2;
    swipeDuration?: number;
    experimental_preventWindowScrollY?: boolean;
    delay?: boolean | number;
};
export declare type UseDragConfig = GenericOptions & DragConfig;
export declare type UsePinchConfig = GenericOptions & DistanceAngleConfig<'pinch'>;
export declare type UseWheelConfig = GenericOptions & CoordinatesConfig<'wheel'>;
export declare type UseScrollConfig = GenericOptions & CoordinatesConfig<'scroll'>;
export declare type UseMoveConfig = GenericOptions & CoordinatesConfig<'move'>;
export declare type UseHoverConfig = GenericOptions;
export declare type UseGestureConfig = GenericOptions & {
    drag?: DragConfig;
    wheel?: CoordinatesConfig<'wheel'>;
    scroll?: CoordinatesConfig<'scroll'>;
    move?: CoordinatesConfig<'move'>;
    pinch?: DistanceAngleConfig<'pinch'>;
    hover?: {
        enabled?: boolean;
    };
};
export interface InternalGenericOptions {
    domTarget?: DomTarget;
    eventOptions: {
        capture?: boolean;
        passive?: boolean;
    };
    window?: EventTarget;
    enabled: boolean;
    transform?: (v: Vector2) => Vector2;
}
export interface InternalGestureOptions<T extends StateKey> {
    enabled: boolean;
    initial: Vector2 | ((state: State[T]) => Vector2);
    threshold: Vector2;
    triggerAllEvents: boolean;
    rubberband: Vector2;
    bounds: [Vector2, Vector2] | ((state: State[T]) => [Vector2, Vector2]);
    transform?: (v: Vector2) => Vector2;
}
export interface InternalCoordinatesOptions<T extends CoordinatesKey> extends InternalGestureOptions<T> {
    axis?: 'x' | 'y';
    lockDirection: boolean;
}
export interface InternalDistanceAngleOptions<T extends DistanceAngleKey> extends InternalGestureOptions<T> {
}
export interface InternalDragOptions extends InternalCoordinatesOptions<'drag'> {
    filterTaps: boolean;
    useTouch: boolean;
    experimental_preventWindowScrollY: boolean;
    swipeVelocity: Vector2;
    swipeDistance: Vector2;
    swipeDuration: number;
    delay: number;
}
export declare type InternalConfig = InternalGenericOptions & {
    drag?: InternalDragOptions;
    wheel?: InternalCoordinatesOptions<'wheel'>;
    scroll?: InternalCoordinatesOptions<'scroll'>;
    move?: InternalCoordinatesOptions<'move'>;
    pinch?: InternalDistanceAngleOptions<'pinch'>;
    hover?: {
        enabled: boolean;
        transform?: (v: Vector2) => Vector2;
    };
};
export declare type WebKitGestureEvent = PointerEvent & {
    scale: number;
    rotation: number;
};
export declare type DomEvents = TouchEvent | PointerEvent | WheelEvent | UIEvent | WebKitGestureEvent | React.TouchEvent | React.PointerEvent | React.WheelEvent | React.UIEvent;
export interface ReactEventHandlers {
    onMouseDown?: React.MouseEventHandler;
    onMouseDownCapture?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseMove?: React.MouseEventHandler;
    onMouseMoveCapture?: React.MouseEventHandler;
    onMouseOut?: React.MouseEventHandler;
    onMouseOutCapture?: React.MouseEventHandler;
    onMouseOver?: React.MouseEventHandler;
    onMouseOverCapture?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onMouseUpCapture?: React.MouseEventHandler;
    onTouchCancel?: React.TouchEventHandler;
    onTouchCancelCapture?: React.TouchEventHandler;
    onTouchEnd?: React.TouchEventHandler;
    onTouchEndCapture?: React.TouchEventHandler;
    onTouchMove?: React.TouchEventHandler;
    onTouchMoveCapture?: React.TouchEventHandler;
    onTouchStart?: React.TouchEventHandler;
    onTouchStartCapture?: React.TouchEventHandler;
    onPointerDown?: React.PointerEventHandler;
    onPointerDownCapture?: React.PointerEventHandler;
    onPointerMove?: React.PointerEventHandler;
    onPointerMoveCapture?: React.PointerEventHandler;
    onPointerUp?: React.PointerEventHandler;
    onPointerUpCapture?: React.PointerEventHandler;
    onPointerCancel?: React.PointerEventHandler;
    onPointerCancelCapture?: React.PointerEventHandler;
    onPointerEnter?: React.PointerEventHandler;
    onPointerEnterCapture?: React.PointerEventHandler;
    onPointerLeave?: React.PointerEventHandler;
    onPointerLeaveCapture?: React.PointerEventHandler;
    onPointerOver?: React.PointerEventHandler;
    onPointerOverCapture?: React.PointerEventHandler;
    onPointerOut?: React.PointerEventHandler;
    onPointerOutCapture?: React.PointerEventHandler;
    onGotPointerCapture?: React.PointerEventHandler;
    onGotPointerCaptureCapture?: React.PointerEventHandler;
    onLostPointerCapture?: React.PointerEventHandler;
    onLostPointerCaptureCapture?: React.PointerEventHandler;
    onScroll?: React.UIEventHandler;
    onScrollCapture?: React.UIEventHandler;
    onWheel?: React.WheelEventHandler;
    onWheelCapture?: React.WheelEventHandler;
    onGestureStart?: Fn;
    onGestureChange?: Fn;
    onGestureEnd?: Fn;
    onClick?: React.MouseEventHandler;
    onClickCapture?: React.MouseEventHandler;
}
export declare type ReactEventHandlerKey = keyof ReactEventHandlers;
export declare type IngKey = 'hovering' | 'scrolling' | 'wheeling' | 'dragging' | 'moving' | 'pinching';
export declare type CoordinatesKey = 'drag' | 'wheel' | 'move' | 'scroll';
export declare type DistanceAngleKey = 'pinch';
export declare type GestureKey = CoordinatesKey | DistanceAngleKey | 'hover';
export declare type StateKey<T extends GestureKey = GestureKey> = T extends 'hover' ? 'move' : T;
export declare type SharedGestureState = {
    [ingKey in IngKey]: boolean;
} & {
    touches: number;
    down: boolean;
    buttons: number;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    locked: boolean;
};
export declare type EventTypes = {
    drag: React.PointerEvent | PointerEvent;
    wheel: React.WheelEvent | WheelEvent;
    scroll: React.UIEvent | UIEvent;
    move: React.PointerEvent | PointerEvent;
    pinch: React.TouchEvent | TouchEvent | React.WheelEvent | WheelEvent | WebKitGestureEvent;
    hover: React.PointerEvent | PointerEvent;
};
export interface CommonGestureState {
    _active: boolean;
    _blocked: boolean;
    _intentional: [false | number, false | number];
    _movement: Vector2;
    _initial: Vector2;
    _bounds: [Vector2, Vector2];
    _threshold: Vector2;
    _lastEventType?: string;
    _dragTarget?: EventTarget | (EventTarget & Element) | null;
    _dragPointerId?: number | null;
    _dragStarted: boolean;
    _dragPreventScroll: boolean;
    _dragIsTap: boolean;
    _dragDelayed: boolean;
    event?: React.UIEvent | UIEvent;
    intentional: boolean;
    values: Vector2;
    velocities: Vector2;
    delta: Vector2;
    movement: Vector2;
    offset: Vector2;
    lastOffset: Vector2;
    initial: Vector2;
    previous: Vector2;
    direction: Vector2;
    first: boolean;
    last: boolean;
    active: boolean;
    startTime: number;
    timeStamp: number;
    elapsedTime: number;
    cancel(): void;
    canceled: boolean;
    memo?: any;
    args?: any;
}
export interface Coordinates {
    axis?: 'x' | 'y';
    xy: Vector2;
    velocity: number;
    vxvy: Vector2;
    distance: number;
}
export interface DragState {
    _pointerId?: number;
    tap: boolean;
    swipe: Vector2;
}
export interface PinchState {
    _pointerIds: [number, number];
}
export interface DistanceAngle {
    da: Vector2;
    vdva: Vector2;
    origin: Vector2;
    turns: number;
}
export declare type State = {
    shared: SharedGestureState;
    drag: CommonGestureState & Coordinates & DragState;
    wheel: CommonGestureState & Coordinates;
    scroll: CommonGestureState & Coordinates;
    move: CommonGestureState & Coordinates;
    pinch: CommonGestureState & DistanceAngle & PinchState;
};
export declare type GestureState<T extends StateKey> = State[T];
export declare type PartialGestureState<T extends StateKey> = Partial<GestureState<T>>;
export declare type FullGestureState<T extends StateKey> = SharedGestureState & State[T];
export declare type Handler<T extends GestureKey, K = EventTypes[T]> = (state: Omit<FullGestureState<StateKey<T>>, 'event'> & {
    event: K;
}) => any | void;
export declare type InternalHandlers = {
    [Key in GestureKey]?: Handler<Key, any>;
};
declare type ReactDomAttributes = React.DOMAttributes<Element>;
declare type NativeHandlersKeys = keyof Omit<ReactDomAttributes, (keyof UserHandlers & keyof ReactDomAttributes) | 'children' | 'dangerouslySetInnerHTML'>;
export declare type AnyGestureEventTypes = Partial<{
    drag: any;
    wheel: any;
    scroll: any;
    move: any;
    pinch: any;
    hover: any;
} & {
    [key in NativeHandlersKeys]: any;
}>;
declare type check<T extends AnyGestureEventTypes, Key extends GestureKey> = undefined extends T[Key] ? EventTypes[Key] : T[Key];
export declare type UserHandlers<T extends AnyGestureEventTypes = EventTypes> = {
    onDrag: Handler<'drag', check<T, 'drag'>>;
    onDragStart: Handler<'drag', check<T, 'drag'>>;
    onDragEnd: Handler<'drag', check<T, 'drag'>>;
    onPinch: Handler<'pinch', check<T, 'pinch'>>;
    onPinchStart: Handler<'pinch', check<T, 'pinch'>>;
    onPinchEnd: Handler<'pinch', check<T, 'pinch'>>;
    onWheel: Handler<'wheel', check<T, 'wheel'>>;
    onWheelStart: Handler<'wheel', check<T, 'wheel'>>;
    onWheelEnd: Handler<'wheel', check<T, 'wheel'>>;
    onMove: Handler<'move', check<T, 'move'>>;
    onMoveStart: Handler<'move', check<T, 'move'>>;
    onMoveEnd: Handler<'move', check<T, 'move'>>;
    onScroll: Handler<'scroll', check<T, 'scroll'>>;
    onScrollStart: Handler<'scroll', check<T, 'scroll'>>;
    onScrollEnd: Handler<'scroll', check<T, 'scroll'>>;
    onHover: Handler<'hover', check<T, 'hover'>>;
};
export declare type RecognizerClass = {
    new (controller: Controller, args: any): Recognizer;
};
export declare type NativeHandlers<T extends AnyGestureEventTypes = {}> = {
    [key in NativeHandlersKeys]: (state: SharedGestureState & {
        event: undefined extends T[key] ? Event : T[key];
        args: any;
    }, ...args: any) => void;
};
export declare type Handlers<T extends AnyGestureEventTypes = EventTypes> = Partial<UserHandlers<T> & NativeHandlers<T>>;
export declare type HookReturnType<T extends {
    domTarget?: DomTarget;
}> = T['domTarget'] extends object ? void | undefined : ReactEventHandlers;
export {};
