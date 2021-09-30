/**
 *
 * client
 *
 */
import { Sink, ID, Disposable, Message, SubscribePayload, JSONMessageReviver, JSONMessageReplacer } from './common';
/** This file is the entry point for browsers, re-export common elements. */
export * from './common';
/** @category Client */
export declare type EventConnecting = 'connecting';
/** @category Client */
export declare type EventConnected = 'connected';
/** @category Client */
export declare type EventMessage = 'message';
/** @category Client */
export declare type EventClosed = 'closed';
/** @category Client */
export declare type EventError = 'error';
/** @category Client */
export declare type Event = EventConnecting | EventConnected | EventMessage | EventClosed | EventError;
/**
 * The first argument is actually the `WebSocket`, but to avoid
 * bundling DOM typings because the client can run in Node env too,
 * you should assert the websocket type during implementation.
 *
 * Also, the second argument is the optional payload that the server may
 * send through the `ConnectionAck` message.
 *
 * @category Client
 */
export declare type EventConnectedListener = (socket: unknown, payload?: Record<string, unknown>) => void;
/** @category Client */
export declare type EventConnectingListener = () => void;
/**
 * Called for all **valid** messages received by the client. Mainly useful for
 * debugging and logging received messages.
 *
 * @category Client
 */
export declare type EventMessageListener = (message: Message) => void;
/**
 * The argument is actually the websocket `CloseEvent`, but to avoid
 * bundling DOM typings because the client can run in Node env too,
 * you should assert the websocket type during implementation.
 *
 * @category Client
 */
export declare type EventClosedListener = (event: unknown) => void;
/**
 * The argument can be either an Error Event or an instance of Error, but to avoid
 * bundling DOM typings because the client can run in Node env too, you should assert
 * the type during implementation. Events dispatched from the WebSocket `onerror` can
 * be handler in this listener.
 *
 * @category Client
 */
export declare type EventErrorListener = (error: unknown) => void;
/** @category Client */
export declare type EventListener<E extends Event> = E extends EventConnecting ? EventConnectingListener : E extends EventConnected ? EventConnectedListener : E extends EventMessage ? EventMessageListener : E extends EventClosed ? EventClosedListener : E extends EventError ? EventErrorListener : never;
/**
 * Configuration used for the GraphQL over WebSocket client.
 *
 * @category Client
 */
export interface ClientOptions {
    /**
     * URL of the GraphQL over WebSocket Protocol compliant server to connect.
     *
     * If the option is a function, it will be called on every WebSocket connection attempt.
     * Returning a promise is supported too and the connecting phase will stall until it
     * resolves with the URL.
     *
     * A good use-case for having a function is when using the URL for authentication,
     * where subsequent reconnects (due to auth) may have a refreshed identity token in
     * the URL.
     */
    url: string | (() => Promise<string> | string);
    /**
     * Optional parameters, passed through the `payload` field with the `ConnectionInit` message,
     * that the client specifies when establishing a connection with the server. You can use this
     * for securely passing arguments for authentication.
     *
     * If you decide to return a promise, keep in mind that the server might kick you off if it
     * takes too long to resolve! Check the `connectionInitWaitTimeout` on the server for more info.
     *
     * Throwing an error from within this function will close the socket with the `Error` message
     * in the close event reason.
     */
    connectionParams?: Record<string, unknown> | (() => Promise<Record<string, unknown>> | Record<string, unknown>);
    /**
     * Controls when should the connection be established.
     *
     * - `false`: Establish a connection immediately. Use `onNonLazyError` to handle errors.
     * - `true`: Establish a connection on first subscribe and close on last unsubscribe. Use
     * the subscription sink's `error` to handle errors.
     *
     * @default true
     */
    lazy?: boolean;
    /**
     * Used ONLY when the client is in non-lazy mode (`lazy = false`). When
     * using this mode, the errors might have no sinks to report to; however,
     * to avoid swallowing errors, consider using `onNonLazyError`,  which will
     * be called when either:
     * - An unrecoverable error/close event occurs
     * - Silent retry attempts have been exceeded
     *
     * After a client has errored out, it will NOT perform any automatic actions.
     *
     * The argument can be a websocket `CloseEvent` or an `Error`. To avoid bundling
     * DOM types, you should derive and assert the correct type. When receiving:
     * - A `CloseEvent`: retry attempts have been exceeded or the specific
     * close event is labeled as fatal (read more in `retryAttempts`).
     * - An `Error`: some internal issue has occured, all internal errors are
     * fatal by nature.
     *
     * @default console.error
     */
    onNonLazyError?: (errorOrCloseEvent: unknown) => void;
    /**
     * How long should the client wait before closing the socket after the last oparation has
     * completed. This is meant to be used in combination with `lazy`. You might want to have
     * a calmdown time before actually closing the connection. Kinda' like a lazy close "debounce".
     *
     * @default 0 // close immediately
     */
    keepAlive?: number;
    /**
     * How many times should the client try to reconnect on abnormal socket closure before it errors out?
     *
     * The library classifies the following close events as fatal:
     * - `1002: Protocol Error`
     * - `1011: Internal Error`
     * - `4400: Bad Request`
     * - `4401: Unauthorized` _tried subscribing before connect ack_
     * - `4409: Subscriber for <id> already exists` _distinction is very important_
     * - `4429: Too many initialisation requests`
     *
     * These events are reported immediately and the client will not reconnect.
     *
     * @default 5
     */
    retryAttempts?: number;
    /**
     * Control the wait time between retries. You may implement your own strategy
     * by timing the resolution of the returned promise with the retries count.
     * `retries` argument counts actual connection attempts, so it will begin with
     * 0 after the first retryable disconnect.
     *
     * @default Randomised exponential backoff
     */
    retryWait?: (retries: number) => Promise<void>;
    /**
     * Check if the close event or connection error is fatal. If you return `true`,
     * the client will fail immediately without additional retries; however, if you
     * return `false`, the client will keep retrying until the `retryAttempts` have
     * been exceeded.
     *
     * The argument is either a WebSocket `CloseEvent` or an error thrown during
     * the connection phase.
     *
     * Beware, the library classifies a few close events as fatal regardless of
     * what is returned. They are listed in the documentation of the `retryAttempts`
     * option.
     *
     * @default Non close events
     */
    isFatalConnectionProblem?: (errOrCloseEvent: unknown) => boolean;
    /**
     * Register listeners before initialising the client. This way
     * you can ensure to catch all client relevant emitted events.
     *
     * The listeners passed in will **always** be the first ones
     * to get the emitted event before other registered listeners.
     */
    on?: Partial<{
        [event in Event]: EventListener<event>;
    }>;
    /**
     * A custom WebSocket implementation to use instead of the
     * one provided by the global scope. Mostly useful for when
     * using the client outside of the browser environment.
     */
    webSocketImpl?: unknown;
    /**
     * A custom ID generator for identifying subscriptions.
     *
     * The default generates a v4 UUID to be used as the ID using `Math`
     * as the random number generator. Supply your own generator
     * in case you need more uniqueness.
     *
     * Reference: https://gist.github.com/jed/982883
     */
    generateID?: () => ID;
    /**
     * An optional override for the JSON.parse function used to hydrate
     * incoming messages to this client. Useful for parsing custom datatypes
     * out of the incoming JSON.
     */
    jsonMessageReviver?: JSONMessageReviver;
    /**
     * An optional override for the JSON.stringify function used to serialize
     * outgoing messages from this client. Useful for serializing custom
     * datatypes out to the client.
     */
    jsonMessageReplacer?: JSONMessageReplacer;
}
/** @category Client */
export interface Client extends Disposable {
    /**
     * Listens on the client which dispatches events about the socket state.
     */
    on<E extends Event>(event: E, listener: EventListener<E>): () => void;
    /**
     * Subscribes through the WebSocket following the config parameters. It
     * uses the `sink` to emit received data or errors. Returns a _cleanup_
     * function used for dropping the subscription and cleaning stuff up.
     */
    subscribe<T = unknown>(payload: SubscribePayload, sink: Sink<T>): () => void;
}
/**
 * Creates a disposable GraphQL over WebSocket client.
 *
 * @category Client
 */
export declare function createClient(options: ClientOptions): Client;
