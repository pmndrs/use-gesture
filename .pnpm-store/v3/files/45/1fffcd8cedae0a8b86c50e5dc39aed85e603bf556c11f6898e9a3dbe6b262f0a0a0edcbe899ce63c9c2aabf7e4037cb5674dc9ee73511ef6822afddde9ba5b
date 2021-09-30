"use strict";
/**
 *
 * common
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyMessage = exports.parseMessage = exports.isMessage = exports.MessageType = exports.GRAPHQL_TRANSPORT_WS_PROTOCOL = void 0;
const utils_1 = require("./utils");
/**
 * The WebSocket sub-protocol used for the [GraphQL over WebSocket Protocol](/PROTOCOL.md).
 *
 * @category Common
 */
exports.GRAPHQL_TRANSPORT_WS_PROTOCOL = 'graphql-transport-ws';
/**
 * Types of messages allowed to be sent by the client/server over the WS protocol.
 *
 * @category Common
 */
var MessageType;
(function (MessageType) {
    MessageType["ConnectionInit"] = "connection_init";
    MessageType["ConnectionAck"] = "connection_ack";
    MessageType["Subscribe"] = "subscribe";
    MessageType["Next"] = "next";
    MessageType["Error"] = "error";
    MessageType["Complete"] = "complete";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
/**
 * Checks if the provided value is a message.
 *
 * @category Common
 */
function isMessage(val) {
    if (utils_1.isObject(val)) {
        // all messages must have the `type` prop
        if (!utils_1.hasOwnStringProperty(val, 'type')) {
            return false;
        }
        // validate other properties depending on the `type`
        switch (val.type) {
            case MessageType.ConnectionInit:
                // the connection init message can have optional payload object
                return (!utils_1.hasOwnProperty(val, 'payload') ||
                    val.payload === undefined ||
                    utils_1.isObject(val.payload));
            case MessageType.ConnectionAck:
                // the connection ack message can have optional payload object too
                return (!utils_1.hasOwnProperty(val, 'payload') ||
                    val.payload === undefined ||
                    utils_1.isObject(val.payload));
            case MessageType.Subscribe:
                return (utils_1.hasOwnStringProperty(val, 'id') &&
                    utils_1.hasOwnObjectProperty(val, 'payload') &&
                    (!utils_1.hasOwnProperty(val.payload, 'operationName') ||
                        val.payload.operationName === undefined ||
                        val.payload.operationName === null ||
                        typeof val.payload.operationName === 'string') &&
                    utils_1.hasOwnStringProperty(val.payload, 'query') &&
                    (!utils_1.hasOwnProperty(val.payload, 'variables') ||
                        val.payload.variables === undefined ||
                        val.payload.variables === null ||
                        utils_1.hasOwnObjectProperty(val.payload, 'variables')) &&
                    (!utils_1.hasOwnProperty(val.payload, 'extensions') ||
                        val.payload.extensions === undefined ||
                        val.payload.extensions === null ||
                        utils_1.hasOwnObjectProperty(val.payload, 'extensions')));
            case MessageType.Next:
                return (utils_1.hasOwnStringProperty(val, 'id') &&
                    utils_1.hasOwnObjectProperty(val, 'payload'));
            case MessageType.Error:
                return utils_1.hasOwnStringProperty(val, 'id') && utils_1.areGraphQLErrors(val.payload);
            case MessageType.Complete:
                return utils_1.hasOwnStringProperty(val, 'id');
            default:
                return false;
        }
    }
    return false;
}
exports.isMessage = isMessage;
/**
 * Parses the raw websocket message data to a valid message.
 *
 * @category Common
 */
function parseMessage(data, reviver) {
    if (isMessage(data)) {
        return data;
    }
    if (typeof data !== 'string') {
        throw new Error('Message not parsable');
    }
    const message = JSON.parse(data, reviver);
    if (!isMessage(message)) {
        throw new Error('Invalid message');
    }
    return message;
}
exports.parseMessage = parseMessage;
/**
 * Stringifies a valid message ready to be sent through the socket.
 *
 * @category Common
 */
function stringifyMessage(msg, replacer) {
    if (!isMessage(msg)) {
        throw new Error('Cannot stringify invalid message');
    }
    return JSON.stringify(msg, replacer);
}
exports.stringifyMessage = stringifyMessage;
