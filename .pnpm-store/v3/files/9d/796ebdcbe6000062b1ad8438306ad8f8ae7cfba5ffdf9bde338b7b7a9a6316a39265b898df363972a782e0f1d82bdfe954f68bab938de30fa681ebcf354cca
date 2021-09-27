"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = exports.RESERVED_EVENTS = void 0;
const events_1 = require("events");
const socket_io_parser_1 = require("socket.io-parser");
const url = require("url");
const debug_1 = __importDefault(require("debug"));
const base64id_1 = __importDefault(require("base64id"));
const debug = debug_1.default("socket.io:socket");
exports.RESERVED_EVENTS = new Set([
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    "newListener",
    "removeListener",
]);
class Socket extends events_1.EventEmitter {
    /**
     * Interface to a `Client` for a given `Namespace`.
     *
     * @param {Namespace} nsp
     * @param {Client} client
     * @param {Object} auth
     * @package
     */
    constructor(nsp, client, auth) {
        super();
        this.nsp = nsp;
        this.client = client;
        this.acks = new Map();
        this.fns = [];
        this.flags = {};
        this._rooms = new Set();
        this.server = nsp.server;
        this.adapter = this.nsp.adapter;
        if (client.conn.protocol === 3) {
            // @ts-ignore
            this.id = nsp.name !== "/" ? nsp.name + "#" + client.id : client.id;
        }
        else {
            this.id = base64id_1.default.generateId(); // don't reuse the Engine.IO id because it's sensitive information
        }
        this.connected = true;
        this.disconnected = false;
        this.handshake = this.buildHandshake(auth);
    }
    /**
     * Builds the `handshake` BC object
     *
     * @private
     */
    buildHandshake(auth) {
        return {
            headers: this.request.headers,
            time: new Date() + "",
            address: this.conn.remoteAddress,
            xdomain: !!this.request.headers.origin,
            // @ts-ignore
            secure: !!this.request.connection.encrypted,
            issued: +new Date(),
            url: this.request.url,
            query: url.parse(this.request.url, true).query,
            auth,
        };
    }
    /**
     * Emits to this client.
     *
     * @return Always returns `true`.
     * @public
     */
    emit(ev, ...args) {
        if (exports.RESERVED_EVENTS.has(ev)) {
            throw new Error(`"${ev}" is a reserved event name`);
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        // access last argument to see if it's an ACK callback
        if (typeof args[args.length - 1] === "function") {
            if (this._rooms.size || this.flags.broadcast) {
                throw new Error("Callbacks are not supported when broadcasting");
            }
            debug("emitting packet with ack id %d", this.nsp._ids);
            this.acks.set(this.nsp._ids, args.pop());
            packet.id = this.nsp._ids++;
        }
        const rooms = new Set(this._rooms);
        const flags = Object.assign({}, this.flags);
        // reset flags
        this._rooms.clear();
        this.flags = {};
        if (rooms.size || flags.broadcast) {
            this.adapter.broadcast(packet, {
                except: new Set([this.id]),
                rooms: rooms,
                flags: flags,
            });
        }
        else {
            // dispatch packet
            this.packet(packet, flags);
        }
        return true;
    }
    /**
     * Targets a room when broadcasting.
     *
     * @param name
     * @return self
     * @public
     */
    to(name) {
        this._rooms.add(name);
        return this;
    }
    /**
     * Targets a room when broadcasting.
     *
     * @param name
     * @return self
     * @public
     */
    in(name) {
        this._rooms.add(name);
        return this;
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        this.emit("message", ...args);
        return this;
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    write(...args) {
        this.emit("message", ...args);
        return this;
    }
    /**
     * Writes a packet.
     *
     * @param {Object} packet - packet object
     * @param {Object} opts - options
     * @private
     */
    packet(packet, opts = {}) {
        packet.nsp = this.nsp.name;
        opts.compress = false !== opts.compress;
        this.client._packet(packet, opts);
    }
    /**
     * Joins a room.
     *
     * @param {String|Array} rooms - room or array of rooms
     * @return a Promise or nothing, depending on the adapter
     * @public
     */
    join(rooms) {
        debug("join room %s", rooms);
        return this.adapter.addAll(this.id, new Set(Array.isArray(rooms) ? rooms : [rooms]));
    }
    /**
     * Leaves a room.
     *
     * @param {String} room
     * @return a Promise or nothing, depending on the adapter
     * @public
     */
    leave(room) {
        debug("leave room %s", room);
        return this.adapter.del(this.id, room);
    }
    /**
     * Leave all rooms.
     *
     * @private
     */
    leaveAll() {
        this.adapter.delAll(this.id);
    }
    /**
     * Called by `Namespace` upon successful
     * middleware execution (ie: authorization).
     * Socket is added to namespace array before
     * call to join, so adapters can access it.
     *
     * @private
     */
    _onconnect() {
        debug("socket connected - writing packet");
        this.join(this.id);
        if (this.conn.protocol === 3) {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: { sid: this.id } });
        }
    }
    /**
     * Called with each packet. Called by `Client`.
     *
     * @param {Object} packet
     * @private
     */
    _onpacket(packet) {
        debug("got packet %j", packet);
        switch (packet.type) {
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                this._onerror(new Error(packet.data));
        }
    }
    /**
     * Called upon event packet.
     *
     * @param {Packet} packet - packet object
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        this.dispatch(args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @param {Number} id - packet id
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function () {
            // prevent double callbacks
            if (sent)
                return;
            const args = Array.prototype.slice.call(arguments);
            debug("sending ack %j", args);
            self.packet({
                id: id,
                type: socket_io_parser_1.PacketType.ACK,
                data: args,
            });
            sent = true;
        };
    }
    /**
     * Called upon ack packet.
     *
     * @private
     */
    onack(packet) {
        const ack = this.acks.get(packet.id);
        if ("function" == typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            this.acks.delete(packet.id);
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon client disconnect packet.
     *
     * @private
     */
    ondisconnect() {
        debug("got disconnect packet");
        this._onclose("client namespace disconnect");
    }
    /**
     * Handles a client error.
     *
     * @private
     */
    _onerror(err) {
        if (this.listeners("error").length) {
            super.emit("error", err);
        }
        else {
            console.error("Missing error handler on `socket`.");
            console.error(err.stack);
        }
    }
    /**
     * Called upon closing. Called by `Client`.
     *
     * @param {String} reason
     * @throw {Error} optional error object
     *
     * @private
     */
    _onclose(reason) {
        if (!this.connected)
            return this;
        debug("closing socket - reason %s", reason);
        super.emit("disconnecting", reason);
        this.leaveAll();
        this.nsp._remove(this);
        this.client._remove(this);
        this.connected = false;
        this.disconnected = true;
        super.emit("disconnect", reason);
        return;
    }
    /**
     * Produces an `error` packet.
     *
     * @param {Object} err - error object
     *
     * @private
     */
    _error(err) {
        this.packet({ type: socket_io_parser_1.PacketType.CONNECT_ERROR, data: err });
    }
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     *
     * @public
     */
    disconnect(close = false) {
        if (!this.connected)
            return this;
        if (close) {
            this.client._disconnect();
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
            this._onclose("server namespace disconnect");
        }
        return this;
    }
    /**
     * Sets the compress flag.
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Socket} self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return {Socket} self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
     * sender.
     *
     * @return {Socket} self
     * @public
     */
    get broadcast() {
        this.flags.broadcast = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return {Socket} self
     * @public
     */
    get local() {
        this.flags.local = true;
        return this;
    }
    /**
     * Dispatch incoming event to socket listeners.
     *
     * @param {Array} event - event that will get emitted
     * @private
     */
    dispatch(event) {
        debug("dispatching an event %j", event);
        this.run(event, (err) => {
            process.nextTick(() => {
                if (err) {
                    return this._onerror(err);
                }
                super.emit.apply(this, event);
            });
        });
    }
    /**
     * Sets up socket middleware.
     *
     * @param {Function} fn - middleware function (event, next)
     * @return {Socket} self
     * @public
     */
    use(fn) {
        this.fns.push(fn);
        return this;
    }
    /**
     * Executes the middleware for an incoming event.
     *
     * @param {Array} event - event that will get emitted
     * @param {Function} fn - last fn call in the middleware
     * @private
     */
    run(event, fn) {
        const fns = this.fns.slice(0);
        if (!fns.length)
            return fn(null);
        function run(i) {
            fns[i](event, function (err) {
                // upon error, short-circuit
                if (err)
                    return fn(err);
                // if no middleware left, summon callback
                if (!fns[i + 1])
                    return fn(null);
                // go on to next
                run(i + 1);
            });
        }
        run(0);
    }
    /**
     * A reference to the request that originated the underlying Engine.IO Socket.
     *
     * @public
     */
    get request() {
        return this.client.request;
    }
    /**
     * A reference to the underlying Client transport connection (Engine.IO Socket object).
     *
     * @public
     */
    get conn() {
        return this.client.conn;
    }
    /**
     * @public
     */
    get rooms() {
        return this.adapter.socketRooms(this.id) || new Set();
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}
exports.Socket = Socket;
