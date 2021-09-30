/// <reference types="react" />
import { Id, ToastContent, ClearWaitingQueueParams, NotValidatedToastProps } from '../types';
import { ContainerInstance } from '../hooks';
export declare const enum Event {
    Show = 0,
    Clear = 1,
    DidMount = 2,
    WillUnmount = 3,
    Change = 4,
    ClearWaitingQueue = 5
}
declare type OnShowCallback = (content: ToastContent, options: NotValidatedToastProps) => void;
declare type OnClearCallback = (id?: Id) => void;
declare type OnClearWaitingQueue = (params: ClearWaitingQueueParams) => void;
declare type OnDidMountCallback = (containerInstance: ContainerInstance) => void;
declare type OnWillUnmountCallback = OnDidMountCallback;
export declare type OnChangeCallback = (toast: number, containerId?: number | string) => void;
declare type Callback = OnShowCallback | OnClearCallback | OnClearWaitingQueue | OnDidMountCallback | OnWillUnmountCallback | OnChangeCallback;
declare type TimeoutId = ReturnType<typeof setTimeout>;
export interface EventManager {
    list: Map<Event, Callback[]>;
    emitQueue: Map<Event, TimeoutId[]>;
    on(event: Event.Show, callback: OnShowCallback): EventManager;
    on(event: Event.Clear, callback: OnClearCallback): EventManager;
    on(event: Event.ClearWaitingQueue, callback: OnClearWaitingQueue): EventManager;
    on(event: Event.DidMount, callback: OnDidMountCallback): EventManager;
    on(event: Event.WillUnmount, callback: OnWillUnmountCallback): EventManager;
    on(event: Event.Change, callback: OnChangeCallback): EventManager;
    off(event: Event, callback?: Callback): EventManager;
    cancelEmit(event: Event): EventManager;
    emit(event: Event.Show, content: React.ReactNode, options: NotValidatedToastProps): void;
    emit(event: Event.Clear, id?: string | number): void;
    emit(event: Event.ClearWaitingQueue, params: ClearWaitingQueueParams): void;
    emit(event: Event.DidMount, containerInstance: ContainerInstance): void;
    emit(event: Event.WillUnmount, containerInstance: ContainerInstance): void;
    emit(event: Event.Change, toast: number, containerId?: number | string): void;
}
export declare const eventManager: EventManager;
export {};
