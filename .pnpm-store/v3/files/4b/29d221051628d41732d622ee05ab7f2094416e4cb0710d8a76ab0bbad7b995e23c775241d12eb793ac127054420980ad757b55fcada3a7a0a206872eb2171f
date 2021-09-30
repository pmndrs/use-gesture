declare type Handler<T> = (data: T) => void;
export default function EE<T>(): {
    listen: (fn: Handler<T>) => void;
    unlisten: (fn: Handler<T>) => void;
    emit: (data: T) => void;
};
export declare function LifeTimeNotify<T>(): ((data: T) => any)[];
export {};
