import * as React from 'react';

export type vector2 = [number, number];

export interface GestureState {
    event: MouseEvent | TouchEvent;
    target: HTMLElement;
    initial: vector2;
    xy: vector2;
    previous: vector2;
    delta: vector2;
    direction: vector2;
    local: vector2;
    lastLocal: vector2;
    time: number;
    velocity: number;
    distance: number;
    first: boolean;
    down: boolean;
    args: any;
    temp: any;

    cancel?(): void;
}

export interface GestureOptions {
    touch?: boolean;
    mouse?: boolean;
    passive?: boolean | AddEventListenerOptions;

    onAction?(state: GestureState): any;
}

export interface GestureProps {
    style?: React.CSSProperties;
    className?: string;

    children(props: GestureState): React.ReactNode;
}

type GestureChildComponent<T> = React.ComponentType<T & Partial<GestureState>>;

export function withGesture(config: GestureOptions)
    : <T>(WrappedComponent: GestureChildComponent<T>)
    => React.ComponentType<T>

type GestureEvents = {
    onMouseDown?: React.MouseEventHandler;
    onTouchDown?: React.TouchEventHandler;
}

export function useGesture(onAction: (state: GestureState) => any): (...args: any[]) => GestureEvents
export function useGesture(options: Pick<GestureOptions, Exclude<keyof GestureOptions, "onAction">>): [(...args: any[]) => GestureEvents, GestureState]
export function useGesture(options: GestureOptions): (...args: any[]) => GestureEvents

export class Gesture extends React.Component<GestureProps & GestureOptions> {
}
