/// <reference types="react-reconciler" />
import * as THREE from 'three';
import * as React from 'react';
import { UseStore } from 'zustand';
import { StoreProps, context, RootState, Size } from '../core/store';
import { extend, Root } from '../core/renderer';
import { addEffect, addAfterEffect, addTail } from '../core/loop';
import { createPointerEvents as events } from './events';
import { Canvas } from './Canvas';
import { EventManager } from '../core/events';
declare const roots: Map<Element, Root>;
declare const modes: readonly ["legacy", "blocking", "concurrent"];
declare const invalidate: (state?: RootState | undefined) => void, advance: (timestamp: number, runGlobalEffects?: boolean, state?: RootState | undefined) => void;
declare const reconciler: import("react-reconciler").Reconciler<unknown, unknown, unknown, unknown, unknown>, applyProps: (instance: import("../core/renderer").Instance, newProps: import("../core/renderer").InstanceProps, oldProps?: import("../core/renderer").InstanceProps, accumulative?: boolean) => void;
export declare type RenderProps<TCanvas extends Element> = Omit<StoreProps, 'gl' | 'events' | 'size'> & {
    gl?: THREE.WebGLRenderer | THREE.WebGLRendererParameters;
    events?: (store: UseStore<RootState>) => EventManager<TCanvas>;
    size?: Size;
    mode?: typeof modes[number];
    onCreated?: (state: RootState) => void;
};
declare function render<TCanvas extends Element>(element: React.ReactNode, canvas: TCanvas, { gl, size, mode, events, onCreated, ...props }?: RenderProps<TCanvas>): UseStore<RootState>;
declare function unmountComponentAtNode<TElement extends Element>(canvas: TElement, callback?: (canvas: TElement) => void): void;
declare function dispose<TObj extends {
    dispose?: () => void;
    type?: string;
    [key: string]: any;
}>(obj: TObj): void;
declare const act: (callback: () => import("react-reconciler").Thenable<unknown>) => import("react-reconciler").Thenable<void>;
declare function createPortal(children: React.ReactNode, container: THREE.Object3D, implementation?: any, key?: any): React.ReactNode;
export * from '../core/hooks';
export { context, render, unmountComponentAtNode, createPortal, events, reconciler, applyProps, dispose, invalidate, advance, extend, addEffect, addAfterEffect, addTail, Canvas, act, roots as _roots, };
