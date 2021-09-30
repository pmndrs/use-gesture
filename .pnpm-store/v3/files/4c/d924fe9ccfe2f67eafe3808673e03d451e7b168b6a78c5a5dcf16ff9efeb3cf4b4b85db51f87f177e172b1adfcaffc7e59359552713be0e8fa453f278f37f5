/// <reference types="node" />
import { Socket } from "./socket";
import type { Server } from "./index";
import type { Client } from "./client";
import { EventEmitter } from "events";
import type { Adapter, Room, SocketId } from "socket.io-adapter";
export interface ExtendedError extends Error {
    data?: any;
}
export declare class Namespace extends EventEmitter {
    readonly name: string;
    readonly sockets: Map<SocketId, Socket>;
    adapter: Adapter;
    /** @private */
    readonly server: Server;
    /** @private */
    _fns: Array<(socket: Socket, next: (err?: ExtendedError) => void) => void>;
    /** @private */
    _rooms: Set<Room>;
    /** @private */
    _flags: any;
    /** @private */
    _ids: number;
    /**
     * Namespace constructor.
     *
     * @param server instance
     * @param name
     */
    constructor(server: Server, name: string);
    /**
     * Initializes the `Adapter` for this nsp.
     * Run upon changing adapter by `Server#adapter`
     * in addition to the constructor.
     *
     * @private
     */
    _initAdapter(): void;
    /**
     * Sets up namespace middleware.
     *
     * @return self
     * @public
     */
    use(fn: (socket: Socket, next: (err?: ExtendedError) => void) => void): this;
    /**
     * Executes the middleware for an incoming client.
     *
     * @param socket - the socket that will get added
     * @param fn - last fn call in the middleware
     * @private
     */
    private run;
    /**
     * Targets a room when emitting.
     *
     * @param name
     * @return self
     * @public
     */
    to(name: Room): this;
    /**
     * Targets a room when emitting.
     *
     * @param name
     * @return self
     * @public
     */
    in(name: Room): this;
    /**
     * Adds a new client.
     *
     * @return {Socket}
     * @private
     */
    _add(client: Client, query: any, fn?: () => void): Socket;
    /**
     * Removes a client. Called by each `Socket`.
     *
     * @private
     */
    _remove(socket: Socket): void;
    /**
     * Emits to all clients.
     *
     * @return Always true
     * @public
     */
    emit(ev: string | Symbol, ...args: any[]): true;
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    send(...args: readonly any[]): this;
    /**
     * Sends a `message` event to all clients.
     *
     * @return self
     * @public
     */
    write(...args: readonly any[]): this;
    /**
     * Gets a list of clients.
     *
     * @return self
     * @public
     */
    allSockets(): Promise<Set<SocketId>>;
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress: boolean): this;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return self
     * @public
     */
    get volatile(): this;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return self
     * @public
     */
    get local(): this;
}
