/// <reference types="node" />
import * as stream from 'stream';
export { EndOfStreamError } from './EndOfFileStream';
export declare class StreamReader {
    private s;
    /**
     * Deferred read request
     */
    private request;
    private endOfStream;
    /**
     * Store peeked data
     * @type {Array}
     */
    private peekQueue;
    constructor(s: stream.Readable);
    /**
     * Read ahead (peek) from stream. Subsequent read or peeks will return the same data
     * @param uint8Array - Uint8Array (or Buffer) to store data read from stream in
     * @param offset - Offset target
     * @param length - Number of bytes to read
     * @returns Number of bytes peeked
     */
    peek(uint8Array: Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Read chunk from stream
     * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
     * @param offset - Offset target
     * @param length - Number of bytes to read
     * @returns Number of bytes read
     */
    read(buffer: Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Read chunk from stream
     * @param buffer Target Uint8Array (or Buffer) to store data read from stream in
     * @param offset Offset target
     * @param length Number of bytes to read
     * @returns Number of bytes read
     */
    private _read;
    private tryRead;
    private reject;
}
