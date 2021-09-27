/**
 *
 * server
 *
 */
import { OperationTypeNode, GraphQLSchema, ExecutionArgs, GraphQLError, SubscriptionArgs, ExecutionResult, DocumentNode, ValidationRule, TypeInfo } from 'graphql';
import { ID, SubscribeMessage, NextMessage, ErrorMessage, CompleteMessage, JSONMessageReplacer, JSONMessageReviver } from './common';
/** @category Server */
export declare type OperationResult = Promise<AsyncIterableIterator<ExecutionResult> | ExecutionResult> | AsyncIterableIterator<ExecutionResult> | ExecutionResult;
/**
 * A concrete GraphQL execution context value type.
 *
 * Mainly used because TypeScript collapes unions
 * with `any` or `unknown` to `any` or `unknown`. So,
 * we use a custom type to allow definitions such as
 * the `context` server option.
 *
 * @category Server
 */
export declare type GraphQLExecutionContextValue = object | symbol | number | string | boolean | undefined | null;
/** @category Server */
export interface ServerOptions<E = unknown> {
    /**
     * The GraphQL schema on which the operations
     * will be executed and validated against.
     *
     * If a function is provided, it will be called on
     * every subscription request allowing you to manipulate
     * schema dynamically.
     *
     * If the schema is left undefined, you're trusted to
     * provide one in the returned `ExecutionArgs` from the
     * `onSubscribe` callback.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    schema?: GraphQLSchema | ((ctx: Context<E>, message: SubscribeMessage, args: Omit<ExecutionArgs, 'schema'>) => Promise<GraphQLSchema> | GraphQLSchema);
    /**
     * A value which is provided to every resolver and holds
     * important contextual information like the currently
     * logged in user, or access to a database.
     *
     * If you return from `onSubscribe`, and the returned value is
     * missing the `contextValue` field, this context will be used
     * instead.
     *
     * If you use the function signature, the final execution arguments
     * will be passed in (also the returned value from `onSubscribe`).
     * Since the context is injected on every subscribe, the `SubscribeMessage`
     * with the regular `Context` will be passed in through the arguments too.
     *
     * Note that the context function is invoked on each operation only once.
     * Meaning, for subscriptions, only at the point of initialising the subscription;
     * not on every subscription event emission. Read more about the context lifecycle
     * in subscriptions here: https://github.com/graphql/graphql-js/issues/894.
     */
    context?: GraphQLExecutionContextValue | ((ctx: Context<E>, message: SubscribeMessage, args: ExecutionArgs) => Promise<GraphQLExecutionContextValue> | GraphQLExecutionContextValue);
    /**
     * The GraphQL root fields or resolvers to go
     * alongside the schema. Learn more about them
     * here: https://graphql.org/learn/execution/#root-fields-resolvers.
     *
     * If you return from `onSubscribe`, and the returned value is
     * missing the `rootValue` field, the relevant operation root
     * will be used instead.
     */
    roots?: {
        [operation in OperationTypeNode]?: Record<string, NonNullable<SubscriptionArgs['rootValue']>>;
    };
    /**
     * A custom GraphQL validate function allowing you to apply your
     * own validation rules.
     *
     * Returned, non-empty, array of `GraphQLError`s will be communicated
     * to the client through the `ErrorMessage`. Use an empty array if the
     * document is valid and no errors have been encountered.
     *
     * Will not be used when implementing a custom `onSubscribe`.
     *
     * Throwing an error from within this function will close the socket
     * with the `Error` message in the close event reason.
     */
    validate?: (schema: GraphQLSchema, documentAST: DocumentNode, rules?: ReadonlyArray<ValidationRule>, typeInfo?: TypeInfo, options?: {
        maxErrors?: number;
    }) => ReadonlyArray<GraphQLError>;
    /**
     * Is the `execute` function from GraphQL which is
     * used to execute the query and mutation operations.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    execute?: (args: ExecutionArgs) => OperationResult;
    /**
     * Is the `subscribe` function from GraphQL which is
     * used to execute the subscription operation.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    subscribe?: (args: ExecutionArgs) => OperationResult;
    /**
     * The amount of time for which the server will wait
     * for `ConnectionInit` message.
     *
     * Set the value to `Infinity`, `''`, `0`, `null` or `undefined` to skip waiting.
     *
     * If the wait timeout has passed and the client
     * has not sent the `ConnectionInit` message,
     * the server will terminate the socket by
     * dispatching a close event `4408: Connection initialisation timeout`
     *
     * @default 3 * 1000 (3 seconds)
     */
    connectionInitWaitTimeout?: number;
    /**
     * Is the connection callback called when the
     * client requests the connection initialisation
     * through the message `ConnectionInit`.
     *
     * The message payload (`connectionParams` from the
     * client) is present in the `Context.connectionParams`.
     *
     * - Returning `true` or nothing from the callback will
     * allow the client to connect.
     *
     * - Returning `false` from the callback will
     * terminate the socket by dispatching the
     * close event `4403: Forbidden`.
     *
     * - Returning a `Record` from the callback will
     * allow the client to connect and pass the returned
     * value to the client through the optional `payload`
     * field in the `ConnectionAck` message.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    onConnect?: (ctx: Context<E>) => Promise<Record<string, unknown> | boolean | void> | Record<string, unknown> | boolean | void;
    /**
     * Called when the client disconnects for whatever reason after
     * he successfully went through the connection initialisation phase.
     * Provides the close event too. Beware that this callback happens
     * AFTER all subscriptions have been gracefully completed and BEFORE
     * the `onClose` callback.
     *
     * If you are interested in tracking the subscriptions completions,
     * consider using the `onComplete` callback.
     *
     * This callback will be called EXCLUSIVELY if the client connection
     * is acknowledged. Meaning, `onConnect` will be called before the `onDisconnect`.
     *
     * For tracking socket closures at any point in time, regardless
     * of the connection state - consider using the `onClose` callback.
     */
    onDisconnect?: (ctx: Context<E>, code: number, reason: string) => Promise<void> | void;
    /**
     * Called when the socket closes for whatever reason, at any
     * point in time. Provides the close event too. Beware
     * that this callback happens AFTER all subscriptions have
     * been gracefully completed and AFTER the `onDisconnect` callback.
     *
     * If you are interested in tracking the subscriptions completions,
     * consider using the `onComplete` callback.
     *
     * In comparison to `onDisconnect`, this callback will ALWAYS
     * be called, regardless if the user succesfully went through
     * the connection initialisation or not. `onConnect` might not
     * called before the `onClose`.
     */
    onClose?: (ctx: Context<E>, code: number, reason: string) => Promise<void> | void;
    /**
     * The subscribe callback executed right after
     * acknowledging the request before any payload
     * processing has been performed.
     *
     * If you return `ExecutionArgs` from the callback,
     * it will be used instead of trying to build one
     * internally. In this case, you are responsible
     * for providing a ready set of arguments which will
     * be directly plugged in the operation execution.
     *
     * Omitting the fields `contextValue` or `rootValue`
     * from the returned value will have the provided server
     * options fill in the gaps.
     *
     * To report GraphQL errors simply return an array
     * of them from the callback, they will be reported
     * to the client through the error message.
     *
     * Useful for preparing the execution arguments
     * following a custom logic. A typical use case are
     * persisted queries, you can identify the query from
     * the subscribe message and create the GraphQL operation
     * execution args which are then returned by the function.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    onSubscribe?: (ctx: Context<E>, message: SubscribeMessage) => Promise<ExecutionArgs | readonly GraphQLError[] | void> | ExecutionArgs | readonly GraphQLError[] | void;
    /**
     * Executed after the operation call resolves. For streaming
     * operations, triggering this callback does not necessarely
     * mean that there is already a result available - it means
     * that the subscription process for the stream has resolved
     * and that the client is now subscribed.
     *
     * The `OperationResult` argument is the result of operation
     * execution. It can be an iterator or already a value.
     *
     * If you want the single result and the events from a streaming
     * operation, use the `onNext` callback.
     *
     * Use this callback to listen for subscribe operation and
     * execution result manipulation.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    onOperation?: (ctx: Context<E>, message: SubscribeMessage, args: ExecutionArgs, result: OperationResult) => Promise<OperationResult | void> | OperationResult | void;
    /**
     * Executed after an error occured right before it
     * has been dispatched to the client.
     *
     * Use this callback to format the outgoing GraphQL
     * errors before they reach the client.
     *
     * Returned result will be injected in the error message payload.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    onError?: (ctx: Context<E>, message: ErrorMessage, errors: readonly GraphQLError[]) => Promise<readonly GraphQLError[] | void> | readonly GraphQLError[] | void;
    /**
     * Executed after an operation has emitted a result right before
     * that result has been sent to the client. Results from both
     * single value and streaming operations will appear in this callback.
     *
     * Use this callback if you want to format the execution result
     * before it reaches the client.
     *
     * Returned result will be injected in the next message payload.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     */
    onNext?: (ctx: Context<E>, message: NextMessage, args: ExecutionArgs, result: ExecutionResult) => Promise<ExecutionResult | void> | ExecutionResult | void;
    /**
     * The complete callback is executed after the
     * operation has completed right before sending
     * the complete message to the client.
     *
     * Throwing an error from within this function will
     * close the socket with the `Error` message
     * in the close event reason.
     *
     * Since the library makes sure to complete streaming
     * operations even after an abrupt closure, this callback
     * will still be called.
     */
    onComplete?: (ctx: Context<E>, message: CompleteMessage) => Promise<void> | void;
    /**
     * An optional override for the JSON.parse function used to hydrate
     * incoming messages to this server. Useful for parsing custom datatypes
     * out of the incoming JSON.
     */
    jsonMessageReviver?: JSONMessageReviver;
    /**
     * An optional override for the JSON.stringify function used to serialize
     * outgoing messages to from server. Useful for serializing custom
     * datatypes out to the client.
     */
    jsonMessageReplacer?: JSONMessageReplacer;
}
/** @category Server */
export interface Server<E = undefined> {
    /**
     * New socket has beeen established. The lib will validate
     * the protocol and use the socket accordingly. Returned promise
     * will resolve after the socket closes.
     *
     * The second argument will be passed in the `extra` field
     * of the `Context`. You may pass the initial request or the
     * original WebSocket, if you need it down the road.
     *
     * Returns a function that should be called when the same socket
     * has been closed, for whatever reason. The close code and reason
     * must be passed for reporting to the `onDisconnect` callback. Returned
     * promise will resolve once the internal cleanup is complete.
     */
    opened(socket: WebSocket, ctxExtra: E): (code: number, reason: string) => Promise<void>;
}
/** @category Server */
export interface WebSocket {
    /**
     * The subprotocol of the WebSocket. Will be used
     * to validate agains the supported ones.
     */
    readonly protocol: string;
    /**
     * Sends a message through the socket. Will always
     * provide a `string` message.
     *
     * Please take care that the send is ready. Meaning,
     * only provide a truly OPEN socket through the `opened`
     * method of the `Server`.
     *
     * The returned promise is used to control the flow of data
     * (like handling backpressure).
     */
    send(data: string): Promise<void> | void;
    /**
     * Closes the socket gracefully. Will always provide
     * the appropriate code and close reason. `onDisconnect`
     * callback will be called.
     *
     * The returned promise is used to control the graceful
     * closure.
     */
    close(code: number, reason: string): Promise<void> | void;
    /**
     * Called when message is received. The library requires the data
     * to be a `string`.
     *
     * All operations requested from the client will block the promise until
     * completed, this means that the callback will not resolve until all
     * subscription events have been emitted (or until the client has completed
     * the stream), or until the query/mutation resolves.
     *
     * Exceptions raised during any phase of operation processing will
     * reject the callback's promise, catch them and communicate them
     * to your clients however you wish.
     */
    onMessage(cb: (data: string) => Promise<void>): void;
}
/** @category Server */
export interface Context<E = unknown> {
    /**
     * Indicates that the `ConnectionInit` message
     * has been received by the server. If this is
     * `true`, the client wont be kicked off after
     * the wait timeout has passed.
     */
    readonly connectionInitReceived: boolean;
    /**
     * Indicates that the connection was acknowledged
     * by having dispatched the `ConnectionAck` message
     * to the related client.
     */
    readonly acknowledged: boolean;
    /** The parameters passed during the connection initialisation. */
    readonly connectionParams?: Readonly<Record<string, unknown>>;
    /**
     * Holds the active subscriptions for this context. **All operations**
     * that are taking place are aggregated here. The user is _subscribed_
     * to an operation when waiting for result(s).
     *
     * If the subscription behind an ID is an `AsyncIterator` - the operation
     * is streaming; on the contrary, if the subscription is `null` - it is simply
     * a reservation, meaning - the operation resolves to a single result or is still
     * pending/being prepared.
     */
    readonly subscriptions: Record<ID, AsyncIterator<unknown> | null>;
    /**
     * An extra field where you can store your own context values
     * to pass between callbacks.
     */
    extra: E;
}
/**
 * Makes a Protocol complient WebSocket GraphQL server. The server
 * is actually an API which is to be used with your favourite WebSocket
 * server library!
 *
 * Read more about the Protocol in the PROTOCOL.md documentation file.
 *
 * @category Server
 */
export declare function makeServer<E = unknown>(options: ServerOptions<E>): Server<E>;
