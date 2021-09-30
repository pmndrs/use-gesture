import * as THREE from 'three';
import * as React from 'react';
import * as ReactThreeFiber from '../three-types';
import { GetState, SetState, UseStore } from 'zustand';
import { Instance, InstanceProps } from './renderer';
import { DomEvent, EventManager, ThreeEvent } from './events';
export interface Intersection extends THREE.Intersection {
    eventObject: THREE.Object3D;
}
export declare type Subscription = {
    ref: React.MutableRefObject<RenderCallback>;
    priority: number;
};
export declare type Dpr = number | [min: number, max: number];
export declare type Size = {
    width: number;
    height: number;
};
export declare type Viewport = Size & {
    initialDpr: number;
    dpr: number;
    factor: number;
    distance: number;
    aspect: number;
};
export declare type Camera = THREE.OrthographicCamera | THREE.PerspectiveCamera;
export declare type Raycaster = THREE.Raycaster & {
    enabled: boolean;
    filter?: FilterFunction;
    computeOffsets?: ComputeOffsetsFunction;
};
export declare type RenderCallback = (state: RootState, delta: number) => void;
export declare type Performance = {
    current: number;
    min: number;
    max: number;
    debounce: number;
    regress: () => void;
};
export declare const isRenderer: (def: THREE.WebGLRenderer) => def is THREE.WebGLRenderer;
export declare const isOrthographicCamera: (def: THREE.Camera) => def is THREE.OrthographicCamera;
export declare type InternalState = {
    active: boolean;
    priority: number;
    frames: number;
    lastProps: StoreProps;
    interaction: THREE.Object3D[];
    hovered: Map<string, DomEvent>;
    subscribers: Subscription[];
    capturedMap: Map<number, Map<THREE.Object3D, Intersection>>;
    initialClick: [x: number, y: number];
    initialHits: THREE.Object3D[];
    subscribe: (callback: React.MutableRefObject<RenderCallback>, priority?: number) => () => void;
};
export declare type RootState = {
    gl: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: Camera;
    controls: THREE.EventDispatcher | null;
    raycaster: Raycaster;
    mouse: THREE.Vector2;
    clock: THREE.Clock;
    vr: boolean;
    linear: boolean;
    flat: boolean;
    frameloop: 'always' | 'demand' | 'never';
    performance: Performance;
    size: Size;
    viewport: Viewport & {
        getCurrentViewport: (camera?: Camera, target?: THREE.Vector3, size?: Size) => Omit<Viewport, 'dpr' | 'initialDpr'>;
    };
    set: SetState<RootState>;
    get: GetState<RootState>;
    invalidate: () => void;
    advance: (timestamp: number, runGlobalEffects?: boolean) => void;
    setSize: (width: number, height: number) => void;
    setDpr: (dpr: Dpr) => void;
    onPointerMissed?: (event: ThreeEvent<PointerEvent>) => void;
    events: EventManager<any>;
    internal: InternalState;
};
export declare type FilterFunction = (items: THREE.Intersection[], state: RootState) => THREE.Intersection[];
export declare type ComputeOffsetsFunction = (event: any, state: RootState) => {
    offsetX: number;
    offsetY: number;
};
export declare type StoreProps = {
    gl: THREE.WebGLRenderer;
    size: Size;
    vr?: boolean;
    shadows?: boolean | Partial<THREE.WebGLShadowMap>;
    linear?: boolean;
    flat?: boolean;
    orthographic?: boolean;
    frameloop?: 'always' | 'demand' | 'never';
    performance?: Partial<Omit<Performance, 'regress'>>;
    dpr?: Dpr;
    clock?: THREE.Clock;
    raycaster?: Partial<Raycaster>;
    camera?: Camera | Partial<ReactThreeFiber.Object3DNode<THREE.Camera, typeof THREE.Camera> & ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> & ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>>;
    onPointerMissed?: (event: ThreeEvent<PointerEvent>) => void;
};
export declare type ApplyProps = (instance: Instance, newProps: InstanceProps, oldProps?: InstanceProps, accumulative?: boolean) => void;
declare const context: React.Context<UseStore<RootState>>;
declare const createStore: (applyProps: ApplyProps, invalidate: (state?: RootState | undefined) => void, advance: (timestamp: number, runGlobalEffects?: boolean | undefined, state?: RootState | undefined) => void, props: StoreProps) => UseStore<RootState>;
export { createStore, context };
