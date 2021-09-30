import { Namespace } from "./namespace";
import type { Server } from "./index";
export declare class ParentNamespace extends Namespace {
    private static count;
    private children;
    constructor(server: Server);
    /**
     * @private
     */
    _initAdapter(): void;
    emit(ev: string | Symbol, ...args: [...any]): true;
    createChild(name: string): Namespace;
}
