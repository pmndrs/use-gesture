/// <reference types="node" />
import { IToken, IGetToken } from '@tokenizer/token';
/**
 * 8-bit unsigned integer
 */
export declare const UINT8: IToken<number>;
/**
 * 16-bit unsigned integer, Little Endian byte order
 */
export declare const UINT16_LE: IToken<number>;
/**
 * 16-bit unsigned integer, Big Endian byte order
 */
export declare const UINT16_BE: IToken<number>;
/**
 * 24-bit unsigned integer, Little Endian byte order
 */
export declare const UINT24_LE: IToken<number>;
/**
 * 24-bit unsigned integer, Big Endian byte order
 */
export declare const UINT24_BE: IToken<number>;
/**
 * 32-bit unsigned integer, Little Endian byte order
 */
export declare const UINT32_LE: IToken<number>;
/**
 * 32-bit unsigned integer, Big Endian byte order
 */
export declare const UINT32_BE: IToken<number>;
/**
 * 8-bit signed integer
 */
export declare const INT8: IToken<number>;
/**
 * 16-bit signed integer, Big Endian byte order
 */
export declare const INT16_BE: IToken<number>;
/**
 * 16-bit signed integer, Little Endian byte order
 */
export declare const INT16_LE: IToken<number>;
/**
 * 24-bit signed integer, Little Endian byte order
 */
export declare const INT24_LE: IToken<number>;
/**
 * 24-bit signed integer, Big Endian byte order
 */
export declare const INT24_BE: IToken<number>;
/**
 * 32-bit signed integer, Big Endian byte order
 */
export declare const INT32_BE: IToken<number>;
/**
 * 32-bit signed integer, Big Endian byte order
 */
export declare const INT32_LE: IToken<number>;
/**
 * 64-bit unsigned integer, Little Endian byte order
 */
export declare const UINT64_LE: IToken<number>;
/**
 * 64-bit signed integer, Little Endian byte order
 */
export declare const INT64_LE: IToken<number>;
/**
 * 64-bit unsigned integer, Big Endian byte order
 */
export declare const UINT64_BE: IToken<number>;
/**
 * 64-bit signed integer, Big Endian byte order
 */
export declare const INT64_BE: IToken<number>;
/**
 * IEEE 754 16-bit (half precision) float, big endian
 */
export declare const Float16_BE: IToken<number>;
/**
 * IEEE 754 16-bit (half precision) float, little endian
 */
export declare const Float16_LE: IToken<number>;
/**
 * IEEE 754 32-bit (single precision) float, big endian
 */
export declare const Float32_BE: IToken<number>;
/**
 * IEEE 754 32-bit (single precision) float, little endian
 */
export declare const Float32_LE: IToken<number>;
/**
 * IEEE 754 64-bit (double precision) float, big endian
 */
export declare const Float64_BE: IToken<number>;
/**
 * IEEE 754 64-bit (double precision) float, little endian
 */
export declare const Float64_LE: IToken<number>;
/**
 * IEEE 754 80-bit (extended precision) float, big endian
 */
export declare const Float80_BE: IToken<number>;
/**
 * IEEE 754 80-bit (extended precision) float, little endian
 */
export declare const Float80_LE: IToken<number>;
/**
 * Ignore a given number of bytes
 */
export declare class IgnoreType implements IGetToken<void> {
    len: number;
    /**
     * @param len number of bytes to ignore
     */
    constructor(len: number);
    get(buf: Buffer, off: number): void;
}
export declare class BufferType implements IGetToken<Buffer> {
    len: number;
    constructor(len: number);
    get(buf: Buffer, off: number): Buffer;
}
/**
 * Consume a fixed number of bytes from the stream and return a string with a specified encoding.
 */
export declare class StringType implements IGetToken<string> {
    len: number;
    encoding: BufferEncoding;
    constructor(len: number, encoding: BufferEncoding);
    get(buf: Buffer, off: number): string;
}
/**
 * ANSI Latin 1 String
 * Using windows-1252 / ISO 8859-1 decoding
 */
export declare class AnsiStringType implements IGetToken<string> {
    len: number;
    private static windows1252;
    private static decode;
    private static inRange;
    private static codePointToString;
    private static singleByteDecoder;
    constructor(len: number);
    get(buf: Buffer, off?: number): string;
}
/**
 * Best effort approach to write 64 but signed integer, little endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export declare function writeIntLE(buf: Buffer, value: number, offset: number, byteLength: number): number;
/**
 * Best effort approach to read up to 64 bit unsigned integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export declare function readUIntBE(buf: Buffer, offset: number, byteLength: number): number;
/**
 * Best effort approach to write up to 64 bit unsigned integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export declare function writeUIntBE(buf: Buffer, value: number, offset: number, byteLength: number): number;
/**
 * Best effort approach to read 64 but signed integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export declare function readIntBE(buf: Buffer, offset: number, byteLength: number): number;
/**
 * Best effort approach to write 64 but signed integer, big endian.
 * Note that JavasScript is limited to 2^53 - 1 bit.
 */
export declare function writeIntBE(buf: Buffer, value: number, offset: number, byteLength: number): number;
