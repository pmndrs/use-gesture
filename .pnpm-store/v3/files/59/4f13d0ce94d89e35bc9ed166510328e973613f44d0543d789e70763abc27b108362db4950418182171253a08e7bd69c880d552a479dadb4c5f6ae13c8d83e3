import * as THREE from 'three';
import type { UseStore } from 'zustand';
import type { RootState } from './store';
export interface Intersection extends THREE.Intersection {
    eventObject: THREE.Object3D;
}
export interface IntesectionEvent<TSourceEvent> extends Intersection {
    intersections: Intersection[];
    stopped: boolean;
    unprojectedPoint: THREE.Vector3;
    ray: THREE.Ray;
    camera: Camera;
    stopPropagation: () => void;
    sourceEvent: TSourceEvent;
    nativeEvent: TSourceEvent;
    delta: number;
    spaceX: number;
    spaceY: number;
}
export declare type Camera = THREE.OrthographicCamera | THREE.PerspectiveCamera;
export declare type ThreeEvent<TEvent> = TEvent & IntesectionEvent<TEvent>;
export declare type DomEvent = ThreeEvent<PointerEvent | MouseEvent | WheelEvent>;
export declare type Events = {
    onClick: EventListener;
    onContextMenu: EventListener;
    onDoubleClick: EventListener;
    onWheel: EventListener;
    onPointerDown: EventListener;
    onPointerUp: EventListener;
    onPointerLeave: EventListener;
    onPointerMove: EventListener;
    onPointerCancel: EventListener;
    onLostPointerCapture: EventListener;
};
export declare type EventHandlers = {
    onClick?: (event: ThreeEvent<MouseEvent>) => void;
    onContextMenu?: (event: ThreeEvent<MouseEvent>) => void;
    onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void;
    onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerEnter?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerLeave?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerMove?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerMissed?: (event: ThreeEvent<PointerEvent>) => void;
    onPointerCancel?: (event: ThreeEvent<PointerEvent>) => void;
    onWheel?: (event: ThreeEvent<WheelEvent>) => void;
};
export interface EventManager<TTarget> {
    connected: TTarget | boolean;
    handlers?: Events;
    connect?: (target: TTarget) => void;
    disconnect?: () => void;
}
export declare function removeInteractivity(store: UseStore<RootState>, object: THREE.Object3D): void;
export declare function createEvents(store: UseStore<RootState>): {
    handlePointer: (name: string) => (event: DomEvent) => void;
};
