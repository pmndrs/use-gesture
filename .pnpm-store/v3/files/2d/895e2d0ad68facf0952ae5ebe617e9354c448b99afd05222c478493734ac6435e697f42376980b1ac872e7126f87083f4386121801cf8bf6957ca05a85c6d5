/// <reference types="node" />
import type * as uWS from 'uWebSockets.js';
import type http from 'http';
import { ServerOptions } from '../server';
/**
 * The extra that will be put in the `Context`.
 *
 * @category Server/uWebSockets
 */
export interface Extra extends UpgradeData {
    /**
     * The actual socket connection between the server and the client
     * with the upgrade data.
     */
    readonly socket: uWS.WebSocket & UpgradeData;
}
/**
 * Data acquired during the HTTP upgrade callback from uWS.
 *
 * @category Server/uWebSockets
 */
export interface UpgradeData {
    /**
     * The initial HTTP request before the actual
     * socket and connection is established.
     *
     * @deprecated uWS.HttpRequest is stack allocated and cannot be accessed outside the internal `upgrade` callback. Consider using the `persistedRequest` instead.
     */
    readonly request: uWS.HttpRequest;
    /**
     * The initial HTTP upgrade request before the actual
     * socket and connection is established.
     *
     * uWS's request is stack allocated and cannot be accessed
     * from outside of the internal upgrade; therefore, the persisted
     * request holds the relevant values extracted from the uWS's request
     * while it is accessible.
     */
    readonly persistedRequest: PersistedRequest;
}
/**
 * The initial HTTP upgrade request before the actual
 * socket and connection is established.
 *
 * uWS's request is stack allocated and cannot be accessed
 * from outside of the internal upgrade; therefore, the persisted
 * request holds relevant values extracted from the uWS's request
 * while it is accessible.
 *
 * @category Server/uWebSockets
 */
export interface PersistedRequest {
    method: string;
    url: string;
    /** The raw query string (after the `?` sign) or empty string. */
    query: string;
    headers: http.IncomingHttpHeaders;
}
/**
 * Make the behaviour for using a [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) WebSocket server.
 * This is a basic starter, feel free to copy the code over and adjust it to your needs
 *
 * @category Server/uWebSockets
 */
export declare function makeBehavior<E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>>(options: ServerOptions<Extra & Partial<E>>, behavior?: uWS.WebSocketBehavior, 
/**
 * The timout between dispatched keep-alive messages. Internally uses the [ws Ping and Pongs]((https://developer.mozilla.org/en-US/docs/Web/API/wss_API/Writing_ws_servers#Pings_and_Pongs_The_Heartbeat_of_wss))
 * to check that the link between the clients and the server is operating and to prevent the link
 * from being broken due to idling.
 *
 * @default 12 * 1000 // 12 seconds
 */
keepAlive?: number): uWS.WebSocketBehavior;
