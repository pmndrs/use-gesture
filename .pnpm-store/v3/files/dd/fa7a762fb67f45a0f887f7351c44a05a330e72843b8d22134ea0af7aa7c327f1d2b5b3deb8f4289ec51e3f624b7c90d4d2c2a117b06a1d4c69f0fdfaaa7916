"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHandler = void 0;
const server_1 = require("../server");
const common_1 = require("../common");
/**
 * Make a handler to use on a [fastify-websocket](https://github.com/fastify/fastify-websocket) route.
 * This is a basic starter, feel free to copy the code over and adjust it to your needs
 *
 * @category Server/fastify-websocket
 */
function makeHandler(options, 
/**
 * The timout between dispatched keep-alive messages. Internally uses the [ws Ping and Pongs]((https://developer.mozilla.org/en-US/docs/Web/API/wss_API/Writing_ws_servers#Pings_and_Pongs_The_Heartbeat_of_wss))
 * to check that the link between the clients and the server is operating and to prevent the link
 * from being broken due to idling.
 *
 * @default 12 * 1000 // 12 seconds
 */
keepAlive = 12 * 1000) {
    const isProd = process.env.NODE_ENV === 'production';
    const server = server_1.makeServer(options);
    return (connection, request) => {
        const { socket } = connection;
        socket.on('error', (err) => socket.close(1011, isProd ? 'Internal Error' : err.message));
        // keep alive through ping-pong messages
        let pongWait = null;
        const pingInterval = keepAlive > 0 && isFinite(keepAlive)
            ? setInterval(() => {
                // ping pong on open sockets only
                if (socket.readyState === socket.OPEN) {
                    // terminate the connection after pong wait has passed because the client is idle
                    pongWait = setTimeout(() => {
                        socket.terminate();
                    }, keepAlive);
                    // listen for client's pong and stop socket termination
                    socket.once('pong', () => {
                        if (pongWait) {
                            clearTimeout(pongWait);
                            pongWait = null;
                        }
                    });
                    socket.ping();
                }
            }, keepAlive)
            : null;
        const closed = server.opened({
            protocol: socket.protocol,
            send: (data) => new Promise((resolve, reject) => {
                socket.send(data, (err) => (err ? reject(err) : resolve()));
            }),
            close: (code, reason) => socket.close(code, reason),
            onMessage: (cb) => socket.on('message', async (event) => {
                try {
                    await cb(event.toString());
                }
                catch (err) {
                    socket.close(1011, isProd ? 'Internal Error' : err.message);
                }
            }),
        }, { connection, request });
        socket.once('close', (code, reason) => {
            if (pongWait)
                clearTimeout(pongWait);
            if (pingInterval)
                clearInterval(pingInterval);
            if (!isProd && code === 1002)
                console.warn(`WebSocket protocol error occured. It was most likely caused due to an ` +
                    `unsupported subprotocol "${socket.protocol}" requested by the client. ` +
                    `graphql-ws implements exclusively the "${common_1.GRAPHQL_TRANSPORT_WS_PROTOCOL}" subprotocol, ` +
                    'please make sure that the client implements it too.');
            closed(code, reason);
        });
    };
}
exports.makeHandler = makeHandler;
