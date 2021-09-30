import type { FastifyRequest } from 'fastify';
import type * as fastifyWebsocket from 'fastify-websocket';
import { ServerOptions } from '../server';
/**
 * The extra that will be put in the `Context`.
 *
 * @category Server/fastify-websocket
 */
export interface Extra {
    /**
     * The underlying socket connection between the server and the client.
     * The WebSocket socket is located under the `socket` parameter.
     */
    readonly connection: fastifyWebsocket.SocketStream;
    /**
     * The initial HTTP upgrade request before the actual
     * socket and connection is established.
     */
    readonly request: FastifyRequest;
}
/**
 * Make a handler to use on a [fastify-websocket](https://github.com/fastify/fastify-websocket) route.
 * This is a basic starter, feel free to copy the code over and adjust it to your needs
 *
 * @category Server/fastify-websocket
 */
export declare function makeHandler<E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>>(options: ServerOptions<Extra & Partial<E>>, 
/**
 * The timout between dispatched keep-alive messages. Internally uses the [ws Ping and Pongs]((https://developer.mozilla.org/en-US/docs/Web/API/wss_API/Writing_ws_servers#Pings_and_Pongs_The_Heartbeat_of_wss))
 * to check that the link between the clients and the server is operating and to prevent the link
 * from being broken due to idling.
 *
 * @default 12 * 1000 // 12 seconds
 */
keepAlive?: number): fastifyWebsocket.WebsocketHandler;
