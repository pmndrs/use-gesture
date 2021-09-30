export type Clock = {
    now: number;
    timeouts: any;
    Date: typeof globalThis.Date;
    loopLimit: number;
    requestIdleCallback: (func: Function, timeout: number) => number;
    cancelIdleCallback: (timerId: number) => void;
    setTimeout: typeof setTimeout;
    clearTimeout: typeof clearTimeout;
    nextTick: (func: Function, ...args: any[]) => void;
    queueMicrotask: typeof queueMicrotask;
    setInterval: typeof setInterval;
    clearInterval: typeof clearInterval;
    setImmediate: (func: (...args: any[]) => void, ...args: any[]) => NodeTimer;
    clearImmediate: (timerId: NodeTimer) => void;
    countTimers: () => number;
    requestAnimationFrame: (func: (timer: number) => void) => number;
    cancelAnimationFrame: (timerId: number) => void;
    runMicrotasks: () => void;
    tick: (tickValue: string | number) => number;
    tickAsync: (tickValue: string | number) => Promise<number>;
    next: () => number;
    nextAsync: () => Promise<number>;
    runAll: () => number;
    runToFrame: () => number;
    runAllAsync: () => Promise<number>;
    runToLast: () => number;
    runToLastAsync: () => Promise<number>;
    reset: () => void;
    setSystemTime: (systemTime: number | Date) => void;
    performance: ({
        now(): number;
    });
    hrTime: (prev: any) => number[];
    /**
     * Uninstall the clock.
     */
    uninstall: () => void;
    methods: any;
};
/**
 * Configuration object for the `install` method.
 */
export type Config = {
    /**
     * a number (in milliseconds) or a Date object (default epoch)
     */
    now?: number | Date;
    /**
     * names of the methods that should be faked.
     */
    toFake?: string[];
    /**
     * the maximum number of timers that will be run when calling runAll()
     */
    loopLimit?: number;
    /**
     * tells FakeTimers to increment mocked time automatically (default false)
     */
    shouldAdvanceTime?: boolean;
    /**
     * increment mocked time every <<advanceTimeDelta>> ms (default: 20ms)
     */
    advanceTimeDelta?: number;
};
export type NodeTimer = {
    hasRef: () => boolean;
    ref: () => any;
    unref: () => any;
};
export namespace timers {
    const setTimeout_1: typeof globalThis.setTimeout;
    export { setTimeout_1 as setTimeout };
    const clearTimeout_1: typeof globalThis.clearTimeout;
    export { clearTimeout_1 as clearTimeout };
    const setInterval_1: typeof globalThis.setInterval;
    export { setInterval_1 as setInterval };
    const clearInterval_1: typeof globalThis.clearInterval;
    export { clearInterval_1 as clearInterval };
    const Date_1: typeof globalThis.Date;
    export { Date_1 as Date };
    export const setImmediate: (fn: (...args: any[]) => void, ...args: any[]) => NodeTimer;
    export const clearImmediate: (id: NodeTimer) => void;
    export const hrtime: (time?: [number, number]) => [number, number];
    export const nextTick: (fn: Function, ...args: any[]) => void;
    export const performance: ({
        now(): number;
    }) | undefined;
    export const requestAnimationFrame: (fn: (timer: number) => void) => number;
    const queueMicrotask_1: boolean | undefined;
    export { queueMicrotask_1 as queueMicrotask };
    export const cancelAnimationFrame: (id: number) => void;
    export const requestIdleCallback: (fn: (deadline: any) => void, options?: any) => number;
    export const cancelIdleCallback: (id: number) => void;
}
/**
 * @param {Date|number} [start] the system time - non-integer values are floored
 * @param {number} [loopLimit] maximum number of timers that will be run when calling runAll()
 * @returns {Clock}
 */
export function createClock(start?: Date | number, loopLimit?: number): Clock;
/**
 * @param {Config=} [config] Optional config
 * @returns {Clock}
 */
export function install(config?: Config | undefined, ...args: any[]): Clock;
/**
 * @typedef {object} Clock
 * @property {number} now
 * @property {any} timeouts
 * @property {typeof globalThis.Date} Date
 * @property {number} loopLimit
 * @property {(func: Function, timeout: number) => number} requestIdleCallback
 * @property {(timerId: number) => void} cancelIdleCallback
 * @property {setTimeout} setTimeout
 * @property {clearTimeout} clearTimeout
 * @property {(func: Function, ...args: any[]) => void} nextTick
 * @property {queueMicrotask} queueMicrotask
 * @property {setInterval} setInterval
 * @property {clearInterval} clearInterval
 * @property {(func: (...args: any[]) => void, ...args: any[]) => NodeTimer} setImmediate
 * @property {(timerId: NodeTimer) => void} clearImmediate
 * @property {() => number} countTimers
 * @property {(func: (timer: number) => void) => number} requestAnimationFrame
 * @property {(timerId: number) => void} cancelAnimationFrame
 * @property {() => void} runMicrotasks
 * @property {(tickValue: string | number) => number} tick
 * @property {(tickValue: string | number) => Promise<number>} tickAsync
 * @property {() => number} next
 * @property {() => Promise<number>} nextAsync
 * @property {() => number} runAll
 * @property {() => number} runToFrame
 * @property {() => Promise<number>} runAllAsync
 * @property {() => number} runToLast
 * @property {() => Promise<number>} runToLastAsync
 * @property {() => void} reset
 * @property {(systemTime: number | Date) => void} setSystemTime
 * @property {({now(): number})} performance
 * @property {(prev: any) => number[]} hrTime
 * @property {() => void} uninstall Uninstall the clock.
 * @property {any} methods
 */
/**
 * Configuration object for the `install` method.
 *
 * @typedef {object} Config
 * @property {number|Date} [now] a number (in milliseconds) or a Date object (default epoch)
 * @property {string[]} [toFake] names of the methods that should be faked.
 * @property {number} [loopLimit] the maximum number of timers that will be run when calling runAll()
 * @property {boolean} [shouldAdvanceTime] tells FakeTimers to increment mocked time automatically (default false)
 * @property {number} [advanceTimeDelta] increment mocked time every <<advanceTimeDelta>> ms (default: 20ms)
 */
/**
 * @typedef {object} NodeTimer
 * @property {() => boolean} hasRef
 * @property {() => any} ref
 * @property {() => any} unref
 */
/**
 * Mocks available features in the specified global namespace.
 *
 * @param {*} _global Namespace to mock (e.g. `window`)
 */
export function withGlobal(_global: any): {
    timers: {
        setTimeout: typeof setTimeout;
        clearTimeout: typeof clearTimeout;
        setInterval: typeof setInterval;
        clearInterval: typeof clearInterval;
        Date: typeof globalThis.Date;
        setImmediate?: (fn: (...args: any[]) => void, ...args: any[]) => NodeTimer;
        clearImmediate?: (id: NodeTimer) => void;
        hrtime?: (time?: [number, number]) => [number, number];
        nextTick?: (fn: Function, ...args: any[]) => void;
        performance?: ({
            now(): number;
        }) | undefined;
        requestAnimationFrame?: (fn: (timer: number) => void) => number;
        queueMicrotask?: boolean | undefined;
        cancelAnimationFrame?: (id: number) => void;
        requestIdleCallback?: (fn: (deadline: any) => void, options?: any) => number;
        cancelIdleCallback?: (id: number) => void;
    };
    createClock: (start?: Date | number, loopLimit?: number) => Clock;
    install: (config?: Config | undefined, ...args: any[]) => Clock;
    withGlobal: typeof withGlobal;
};
