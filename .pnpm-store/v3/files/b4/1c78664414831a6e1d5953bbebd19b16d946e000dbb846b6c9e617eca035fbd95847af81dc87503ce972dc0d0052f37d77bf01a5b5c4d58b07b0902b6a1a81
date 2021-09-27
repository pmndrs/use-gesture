import * as THREE from 'three';
import Reconciler from 'react-reconciler';
import { UseStore } from 'zustand';
import { RootState } from './store';
import { EventHandlers } from './events';
export declare type Root = {
    fiber: Reconciler.FiberRoot;
    store: UseStore<RootState>;
};
export declare type LocalState = {
    root: UseStore<RootState>;
    objects: Instance[];
    instance?: boolean;
    handlers?: EventHandlers;
    memoizedProps: {
        [key: string]: any;
    };
};
export declare type ClassConstructor = {
    new (): void;
};
export declare type AttachFnType = (self: Instance, parent: Instance) => void;
export declare type AttachFnsType = [attach: string | AttachFnType, detach: string | AttachFnType];
export declare type BaseInstance = Omit<THREE.Object3D, 'parent' | 'children' | 'attach' | 'add' | 'remove' | 'raycast'> & {
    __r3f: LocalState;
    parent: Instance | null;
    children: Instance[];
    attach?: string;
    attachFns?: AttachFnsType;
    remove: (...object: Instance[]) => Instance;
    add: (...object: Instance[]) => Instance;
    raycast?: (raycaster: THREE.Raycaster, intersects: THREE.Intersection[]) => void;
};
export declare type Instance = BaseInstance & {
    [key: string]: any;
};
export declare type InstanceProps = {
    [key: string]: unknown;
} & {
    args?: any[];
    object?: object;
    visible?: boolean;
    dispose?: null;
    attach?: string;
};
declare let extend: (objects: object) => void;
declare function prepare<T = THREE.Object3D>(object: T, state?: Partial<LocalState>): T;
declare function createRenderer<TCanvas>(roots: Map<TCanvas, Root>): {
    reconciler: Reconciler.Reconciler<unknown, unknown, unknown, unknown, unknown>;
    applyProps: (instance: Instance, newProps: InstanceProps, oldProps?: InstanceProps, accumulative?: boolean) => void;
};
export { prepare, createRenderer, extend };
