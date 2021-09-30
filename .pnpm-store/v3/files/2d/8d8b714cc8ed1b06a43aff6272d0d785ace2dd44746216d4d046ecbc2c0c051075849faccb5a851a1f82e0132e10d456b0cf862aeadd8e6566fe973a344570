declare type Listener = (...args: Array<any>) => void;
declare type EventEmitter = {
    on: (topic: string, listener: Listener) => void;
    off: (topic: string, listener: Listener) => void;
    emit: (event: string, ...args: Array<any>) => void;
};
/**
 * Super simple event emitter.
 */
export declare const createEventEmitter: () => EventEmitter;
export {};
