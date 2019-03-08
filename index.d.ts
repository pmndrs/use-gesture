import * as React from 'react';

// Helper type, taken from: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
    onMove?(state: GestureState): any;
    onUp?(state: GestureState): any;
    onDown?(state: GestureState): any;
}

export interface GestureProps {
    style?: React.CSSProperties;
    className?: string;

    children(props: GestureState): React.ReactNode;
}

export function withGesture(config: GestureOptions)
    : <P extends GestureState>(WrappedComponent: React.ComponentType<P>) 
    => React.ComponentType<Omit<P, keyof GestureState>>

type GestureEvents = {
    onMouseDown?: React.MouseEventHandler;
    onTouchStart?: React.TouchEventHandler;
}

export function useGesture(): [(...args: any[]) => GestureEvents, GestureState]
export function useGesture(onAction: (state: GestureState) => any): (...args: any[]) => GestureEvents
export function useGesture(options: Pick<GestureOptions, Exclude<keyof GestureOptions, "onAction">>): [(...args: any[]) => GestureEvents, GestureState]
export function useGesture(options: GestureOptions): (...args: any[]) => GestureEvents

export class Gesture extends React.Component<GestureProps & GestureOptions> {
}
