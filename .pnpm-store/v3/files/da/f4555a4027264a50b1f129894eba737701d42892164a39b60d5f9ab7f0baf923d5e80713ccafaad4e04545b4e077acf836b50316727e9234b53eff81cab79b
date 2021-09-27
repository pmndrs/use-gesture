import { Packet } from "socket.io-parser";
import Emitter = require("component-emitter");
import { Manager } from "./manager";
export interface SocketOptions {
    /**
     * the authentication payload sent when connecting to the Namespace
     */
    auth: object | ((cb: (data: object) => void) => void);
}
export declare class Socket extends Emitter {
    readonly io: Manager;
    id: string;
    connected: boolean;
    disconnected: boolean;
    receiveBuffer: Array<ReadonlyArray<any>>;
    sendBuffer: Array<Packet>;
    private readonly nsp;
    private readonly auth;
    private ids;
    private acks;
    private flags;
    private subs?;
    private _anyListeners;
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io: Manager, nsp: string, opts?: Partial<SocketOptions>);
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    private subEvents;
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active(): boolean;
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect(): this;
    /**
     * Alias for connect()
     */
    open(): this;
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args: any[]): this;
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @param ev - event name
     * @return self
     * @public
     */
    emit(ev: string, ...args: any[]): this;
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    private packet;
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    private onopen;
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    private onerror;
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    private onclose;
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    private onpacket;
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    private onevent;
    private emitEvent;
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    private ack;
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    private onack;
    /**
     * Called upon server connect.
     *
     * @private
     */
    private onconnect;
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    private emitBuffered;
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    private ondisconnect;
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    private destroy;
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect(): this;
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close(): this;
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress: boolean): this;
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile(): this;
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener: (...args: any[]) => void): this;
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener: (...args: any[]) => void): this;
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener?: (...args: any[]) => void): this;
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny(): ((...args: any[]) => void)[];
}
export declare namespace Socket {
    type DisconnectReason = "io server disconnect" | "io client disconnect" | "ping timeout" | "transport close" | "transport error";
}
