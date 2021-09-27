/**
 *
 * common
 *
 */
import { GraphQLError, ExecutionResult } from 'graphql';
/**
 * The WebSocket sub-protocol used for the [GraphQL over WebSocket Protocol](/PROTOCOL.md).
 *
 * @category Common
 */
export declare const GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
/**
 * ID is a string type alias representing
 * the globally unique ID used for identifying
 * subscriptions established by the client.
 *
 * @category Common
 */
export declare type ID = string;
/** @category Common */
export interface Disposable {
    /** Dispose of the instance and clear up resources. */
    dispose: () => void | Promise<void>;
}
/**
 * A representation of any set of values over any amount of time.
 *
 * @category Common
 */
export interface Sink<T = unknown> {
    /** Next value arriving. */
    next(value: T): void;
    /**
     * An error that has occured. Calling this function "closes" the sink.
     * Besides the errors being `Error` and `readonly GraphQLError[]`, it
     * can also be a `CloseEvent`, but to avoid bundling DOM typings because
     * the client can run in Node env too, you should assert the close event
     * type during implementation.
     */
    error(error: unknown): void;
    /** The sink has completed. This function "closes" the sink. */
    complete(): void;
}
/**
 * Types of messages allowed to be sent by the client/server over the WS protocol.
 *
 * @category Common
 */
export declare enum MessageType {
    ConnectionInit = "connection_init",
    ConnectionAck = "connection_ack",
    Subscribe = "subscribe",
    Next = "next",
    Error = "error",
    Complete = "complete"
}
/** @category Common */
export interface ConnectionInitMessage {
    readonly type: MessageType.ConnectionInit;
    readonly payload?: Record<string, unknown>;
}
/** @category Common */
export interface ConnectionAckMessage {
    readonly type: MessageType.ConnectionAck;
    readonly payload?: Record<string, unknown>;
}
/** @category Common */
export interface SubscribeMessage {
    readonly id: ID;
    readonly type: MessageType.Subscribe;
    readonly payload: SubscribePayload;
}
/** @category Common */
export interface SubscribePayload {
    readonly operationName?: string | null;
    readonly query: string;
    readonly variables?: Record<string, unknown> | null;
    readonly extensions?: Record<string, unknown> | null;
}
/** @category Common */
export interface NextMessage {
    readonly id: ID;
    readonly type: MessageType.Next;
    readonly payload: ExecutionResult;
}
/** @category Common */
export interface ErrorMessage {
    readonly id: ID;
    readonly type: MessageType.Error;
    readonly payload: readonly GraphQLError[];
}
/** @category Common */
export interface CompleteMessage {
    readonly id: ID;
    readonly type: MessageType.Complete;
}
/** @category Common */
export declare type Message<T extends MessageType = MessageType> = T extends MessageType.ConnectionAck ? ConnectionAckMessage : T extends MessageType.ConnectionInit ? ConnectionInitMessage : T extends MessageType.Subscribe ? SubscribeMessage : T extends MessageType.Next ? NextMessage : T extends MessageType.Error ? ErrorMessage : T extends MessageType.Complete ? CompleteMessage : never;
/**
 * Checks if the provided value is a message.
 *
 * @category Common
 */
export declare function isMessage(val: unknown): val is Message;
/**
 * Function for transforming values within a message during JSON parsing
 * The values are produced by parsing the incoming raw JSON.
 *
 * Read more about using it:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
 *
 * @category Common
 */
export declare type JSONMessageReviver = (this: any, key: string, value: any) => any;
/**
 * Parses the raw websocket message data to a valid message.
 *
 * @category Common
 */
export declare function parseMessage(data: unknown, reviver?: JSONMessageReviver): Message;
/**
 * Function that allows customization of the produced JSON string
 * for the elements of an outgoing `Message` object.
 *
 * Read more about using it:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
 *
 * @category Common
 */
export declare type JSONMessageReplacer = (this: any, key: string, value: any) => any;
/**
 * Stringifies a valid message ready to be sent through the socket.
 *
 * @category Common
 */
export declare function stringifyMessage<T extends MessageType>(msg: Message<T>, replacer?: JSONMessageReplacer): string;
