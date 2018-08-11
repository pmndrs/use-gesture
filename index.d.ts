import * as React from 'react';

export interface GestureState {
    x: number;
    y: number;
    xDelta: number;
    yDelta: number;
    xInitial: number;
    yInitial: number;
    xPrev: number;
    yPrev: number;
    down: boolean;

    xVelocity: number;
    yVelocity: number;
}

type GestureChildComponent<T> = React.ComponentType<T & GestureState>;

export interface WithGestureProps {
    onUp?: (newProps: GestureState) => GestureState;
    onDown?: (newProps: GestureState) => GestureState;
    onMove?: (newProps: GestureState) => GestureState;
}

export interface GestureProps {
    children(props: GestureState): React.ReactNode;
}

export function withGesture<T>(
    WrappedComponent: GestureChildComponent<T>,
): React.ComponentType<T & WithGestureProps>;

export class Gesture extends React.Component<GestureProps & WithGestureProps> {}
