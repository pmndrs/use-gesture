/// <reference types="node" />
import { Interpreter } from '.';
import { AnyInterpreter } from './types';
declare type ServiceListener = (service: AnyInterpreter) => void;
export interface XStateDevInterface {
    register: (service: Interpreter<any>) => void;
    unregister: (service: Interpreter<any>) => void;
    onRegister: (listener: ServiceListener) => {
        unsubscribe: () => void;
    };
    services: Set<Interpreter<any>>;
}
export declare function getGlobal(): (Window & typeof globalThis) | (NodeJS.Global & typeof globalThis) | undefined;
export declare function registerService(service: AnyInterpreter): void;
export {};
//# sourceMappingURL=devTools.d.ts.map