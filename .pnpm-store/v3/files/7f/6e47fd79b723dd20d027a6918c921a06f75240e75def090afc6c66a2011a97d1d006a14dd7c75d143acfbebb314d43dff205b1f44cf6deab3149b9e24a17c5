/**
 *
 * client
 *
 */
import { GRAPHQL_TRANSPORT_WS_PROTOCOL, MessageType, parseMessage, stringifyMessage, } from './common.mjs';
import { isObject } from './utils.mjs';
/** This file is the entry point for browsers, re-export common elements. */
export * from './common.mjs';
/**
 * Creates a disposable GraphQL over WebSocket client.
 *
 * @category Client
 */
export function createClient(options) {
    const { url, connectionParams, lazy = true, onNonLazyError = console.error, keepAlive = 0, retryAttempts = 5, retryWait = async function randomisedExponentialBackoff(retries) {
        let retryDelay = 1000; // start with 1s delay
        for (let i = 0; i < retries; i++) {
            retryDelay *= 2;
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelay +
            // add random timeout from 300ms to 3s
            Math.floor(Math.random() * (3000 - 300) + 300)));
    }, isFatalConnectionProblem = (errOrCloseEvent) => 
    // non `CloseEvent`s are fatal by default
    !isLikeCloseEvent(errOrCloseEvent), on, webSocketImpl, 
    /**
     * Generates a v4 UUID to be used as the ID using `Math`
     * as the random number generator. Supply your own generator
     * in case you need more uniqueness.
     *
     * Reference: https://gist.github.com/jed/982883
     */
    generateID = function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }, jsonMessageReplacer: replacer, jsonMessageReviver: reviver, } = options;
    let ws;
    if (webSocketImpl) {
        if (!isWebSocket(webSocketImpl)) {
            throw new Error('Invalid WebSocket implementation provided');
        }
        ws = webSocketImpl;
    }
    else if (typeof WebSocket !== 'undefined') {
        ws = WebSocket;
    }
    else if (typeof global !== 'undefined') {
        ws =
            global.WebSocket ||
                // @ts-expect-error: Support more browsers
                global.MozWebSocket;
    }
    else if (typeof window !== 'undefined') {
        ws =
            window.WebSocket ||
                // @ts-expect-error: Support more browsers
                window.MozWebSocket;
    }
    if (!ws)
        throw new Error('WebSocket implementation missing');
    const WebSocketImpl = ws;
    // websocket status emitter, subscriptions are handled differently
    const emitter = (() => {
        const message = (() => {
            const listeners = {};
            return {
                on(id, listener) {
                    listeners[id] = listener;
                    return () => {
                        delete listeners[id];
                    };
                },
                emit(message) {
                    var _a;
                    if ('id' in message)
                        (_a = listeners[message.id]) === null || _a === void 0 ? void 0 : _a.call(listeners, message);
                },
            };
        })();
        const listeners = {
            connecting: (on === null || on === void 0 ? void 0 : on.connecting) ? [on.connecting] : [],
            connected: (on === null || on === void 0 ? void 0 : on.connected) ? [on.connected] : [],
            message: (on === null || on === void 0 ? void 0 : on.message) ? [message.emit, on.message] : [message.emit],
            closed: (on === null || on === void 0 ? void 0 : on.closed) ? [on.closed] : [],
            error: (on === null || on === void 0 ? void 0 : on.error) ? [on.error] : [],
        };
        return {
            onMessage: message.on,
            on(event, listener) {
                const l = listeners[event];
                l.push(listener);
                return () => {
                    l.splice(l.indexOf(listener), 1);
                };
            },
            emit(event, ...args) {
                for (const listener of listeners[event]) {
                    // @ts-expect-error: The args should fit
                    listener(...args);
                }
            },
        };
    })();
    let connecting, locks = 0, retrying = false, retries = 0, disposed = false;
    async function connect() {
        const [socket, throwOnClose] = await (connecting !== null && connecting !== void 0 ? connecting : (connecting = new Promise((connected, denied) => (async () => {
            if (retrying) {
                await retryWait(retries);
                // subscriptions might complete while waiting for retry
                if (!locks) {
                    connecting = undefined;
                    return denied({ code: 1000, reason: 'All Subscriptions Gone' });
                }
                retries++;
            }
            emitter.emit('connecting');
            const socket = new WebSocketImpl(typeof url === 'function' ? await url() : url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
            socket.onerror = (err) => {
                // we let the onclose reject the promise for correct retry handling
                emitter.emit('error', err);
            };
            socket.onclose = (event) => {
                connecting = undefined;
                emitter.emit('closed', event);
                denied(event);
            };
            socket.onopen = async () => {
                try {
                    socket.send(stringifyMessage({
                        type: MessageType.ConnectionInit,
                        payload: typeof connectionParams === 'function'
                            ? await connectionParams()
                            : connectionParams,
                    }, replacer));
                }
                catch (err) {
                    socket.close(4400, err instanceof Error ? err.message : new Error(err).message);
                }
            };
            let acknowledged = false;
            socket.onmessage = ({ data }) => {
                try {
                    const message = parseMessage(data, reviver);
                    emitter.emit('message', message);
                    if (acknowledged)
                        return; // already connected and acknowledged
                    if (message.type !== MessageType.ConnectionAck)
                        throw new Error(`First message cannot be of type ${message.type}`);
                    acknowledged = true;
                    emitter.emit('connected', socket, message.payload); // connected = socket opened + acknowledged
                    retrying = false; // future lazy connects are not retries
                    retries = 0; // reset the retries on connect
                    connected([
                        socket,
                        new Promise((_, closed) => socket.addEventListener('close', closed)),
                    ]);
                }
                catch (err) {
                    socket.close(4400, err instanceof Error ? err.message : new Error(err).message);
                }
            };
        })())));
        // if the provided socket is in a closing state, wait for the throw on close
        if (socket.readyState === WebSocketImpl.CLOSING)
            await throwOnClose;
        let release = () => {
            // releases this connection
        };
        const released = new Promise((resolve) => (release = resolve));
        return [
            socket,
            release,
            Promise.race([
                // wait for
                released.then(() => {
                    if (!locks) {
                        // and if no more locks are present, complete the connection
                        const complete = () => socket.close(1000, 'Normal Closure');
                        if (isFinite(keepAlive) && keepAlive > 0) {
                            // if the keepalive is set, allow for the specified calmdown time and
                            // then complete. but only if no lock got created in the meantime and
                            // if the socket is still open
                            setTimeout(() => {
                                if (!locks && socket.readyState === WebSocketImpl.OPEN)
                                    complete();
                            }, keepAlive);
                        }
                        else {
                            // otherwise complete immediately
                            complete();
                        }
                    }
                }),
                // or
                throwOnClose,
            ]),
        ];
    }
    /**
     * Checks the `connect` problem and evaluates if the client should retry.
     */
    function shouldRetryConnectOrThrow(errOrCloseEvent) {
        // some close codes are worth reporting immediately
        if (isLikeCloseEvent(errOrCloseEvent) &&
            [
                1002,
                1011,
                4400,
                4401,
                4409,
                4429, // Too many initialisation requests
            ].includes(errOrCloseEvent.code))
            throw errOrCloseEvent;
        // client was disposed, no retries should proceed regardless
        if (disposed)
            return false;
        // normal closure (possibly all subscriptions have completed)
        // if no locks were acquired in the meantime, shouldnt try again
        if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1000)
            return locks > 0;
        // retries are not allowed or we tried to many times, report error
        if (!retryAttempts || retries >= retryAttempts)
            throw errOrCloseEvent;
        // throw fatal connection problems immediately
        if (isFatalConnectionProblem(errOrCloseEvent))
            throw errOrCloseEvent;
        // looks good, start retrying
        return (retrying = true);
    }
    // in non-lazy (hot?) mode always hold one connection lock to persist the socket
    if (!lazy) {
        (async () => {
            locks++;
            for (;;) {
                try {
                    const [, , throwOnClose] = await connect();
                    await throwOnClose; // will always throw because releaser is not used
                }
                catch (errOrCloseEvent) {
                    try {
                        if (!shouldRetryConnectOrThrow(errOrCloseEvent))
                            return;
                    }
                    catch (errOrCloseEvent) {
                        // report thrown error, no further retries
                        return onNonLazyError === null || onNonLazyError === void 0 ? void 0 : onNonLazyError(errOrCloseEvent);
                    }
                }
            }
        })();
    }
    return {
        on: emitter.on,
        subscribe(payload, sink) {
            const id = generateID();
            let done = false, errored = false, releaser = () => {
                // for handling completions before connect
                locks--;
                done = true;
            };
            (async () => {
                locks++;
                for (;;) {
                    try {
                        const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
                        // if done while waiting for connect, release the connection lock right away
                        if (done)
                            return release();
                        const unlisten = emitter.onMessage(id, (message) => {
                            switch (message.type) {
                                case MessageType.Next: {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    sink.next(message.payload);
                                    return;
                                }
                                case MessageType.Error: {
                                    (errored = true), (done = true);
                                    sink.error(message.payload);
                                    releaser();
                                    return;
                                }
                                case MessageType.Complete: {
                                    done = true;
                                    releaser(); // release completes the sink
                                    return;
                                }
                            }
                        });
                        socket.send(stringifyMessage({
                            id,
                            type: MessageType.Subscribe,
                            payload,
                        }, replacer));
                        releaser = () => {
                            if (!done && socket.readyState === WebSocketImpl.OPEN)
                                // if not completed already and socket is open, send complete message to server on release
                                socket.send(stringifyMessage({
                                    id,
                                    type: MessageType.Complete,
                                }, replacer));
                            locks--;
                            done = true;
                            release();
                        };
                        // either the releaser will be called, connection completed and
                        // the promise resolved or the socket closed and the promise rejected.
                        // whatever happens though, we want to stop listening for messages
                        await waitForReleaseOrThrowOnClose.finally(unlisten);
                        return; // completed, shouldnt try again
                    }
                    catch (errOrCloseEvent) {
                        if (!shouldRetryConnectOrThrow(errOrCloseEvent))
                            return;
                    }
                }
            })()
                .catch(sink.error) // rejects on close events and errors
                .then(() => {
                // delivering either an error or a complete terminates the sequence
                if (!errored)
                    sink.complete();
            }); // resolves on release or normal closure
            return () => {
                // dispose only of active subscriptions
                if (!done)
                    releaser();
            };
        },
        async dispose() {
            disposed = true;
            if (connecting) {
                // if there is a connection, close it
                const [socket] = await connecting;
                socket.close(1000, 'Normal Closure');
            }
        },
    };
}
function isLikeCloseEvent(val) {
    return isObject(val) && 'code' in val && 'reason' in val;
}
function isWebSocket(val) {
    return (typeof val === 'function' &&
        'constructor' in val &&
        'CLOSED' in val &&
        'CLOSING' in val &&
        'CONNECTING' in val &&
        'OPEN' in val);
}
