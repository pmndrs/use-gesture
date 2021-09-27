"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useServer = void 0;
const server_1 = require("../server");
const common_1 = require("../common");
/**
 * Use the server on a [ws](https://github.com/websockets/ws) ws server.
 * This is a basic starter, feel free to copy the code over and adjust it to your needs
 *
 * @category Server/ws
 */
function useServer(options, ws, 
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
    ws.on('error', (err) => {
        // catch the first thrown error and re-throw it once all clients have been notified
        let firstErr = null;
        // report server errors by erroring out all clients with the same error
        for (const client of ws.clients) {
            try {
                client.close(1011, isProd ? 'Internal Error' : err.message);
            }
            catch (err) {
                firstErr = firstErr !== null && firstErr !== void 0 ? firstErr : err;
            }
        }
        if (firstErr)
            throw firstErr;
    });
    ws.on('connection', (socket, request) => {
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
        }, { socket, request });
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
    });
    return {
        dispose: async () => {
            for (const client of ws.clients) {
                client.close(1001, 'Going away');
            }
            ws.removeAllListeners();
            await new Promise((resolve, reject) => {
                ws.close((err) => (err ? reject(err) : resolve()));
            });
        },
    };
}
exports.useServer = useServer;
