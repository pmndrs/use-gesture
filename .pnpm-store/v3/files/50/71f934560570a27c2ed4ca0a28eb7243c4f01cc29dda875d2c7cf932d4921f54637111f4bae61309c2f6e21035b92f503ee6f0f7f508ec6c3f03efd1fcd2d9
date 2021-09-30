/// <reference types="node" />
import { IncomingMessage } from 'http';
declare type Request = IncomingMessage & {
    body?: unknown;
};
/**
 * Provided a "Request" provided by express or connect (typically a node style
 * HTTPClientRequest), Promise the body data contained.
 */
export declare function parseBody(req: Request): Promise<{
    [param: string]: unknown;
}>;
export {};
