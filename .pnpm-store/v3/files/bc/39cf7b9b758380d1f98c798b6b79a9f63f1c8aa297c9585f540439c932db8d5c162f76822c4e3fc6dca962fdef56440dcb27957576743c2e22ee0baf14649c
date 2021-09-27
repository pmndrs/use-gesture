import { ManagerOptions } from "./manager";
import { Socket, SocketOptions } from "./socket";
/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @public
 */
declare function lookup(opts?: Partial<ManagerOptions & SocketOptions>): Socket;
declare function lookup(uri: string, opts?: Partial<ManagerOptions & SocketOptions>): Socket;
declare function lookup(uri: string | Partial<ManagerOptions & SocketOptions>, opts?: Partial<ManagerOptions & SocketOptions>): Socket;
/**
 * Protocol version.
 *
 * @public
 */
export { protocol } from "socket.io-parser";
/**
 * Expose constructors for standalone build.
 *
 * @public
 */
export { Manager, ManagerOptions } from "./manager";
export { lookup as io, Socket, SocketOptions };
