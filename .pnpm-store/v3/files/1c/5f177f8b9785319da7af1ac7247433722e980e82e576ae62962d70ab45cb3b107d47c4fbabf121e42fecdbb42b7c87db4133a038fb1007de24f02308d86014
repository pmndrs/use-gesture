/// <reference types="node" />
import * as Stream from 'stream';
import { ReadStreamTokenizer } from './ReadStreamTokenizer';
import * as core from './core';
export { fromFile } from './FileTokenizer';
export { ITokenizer, EndOfStreamError, fromBuffer, IFileInfo } from './core';
export { IToken, IGetToken } from '@tokenizer/token';
/**
 * Construct ReadStreamTokenizer from given Stream.
 * Will set fileSize, if provided given Stream has set the .path property.
 * @param stream - Node.js Stream.Readable
 * @param fileInfo - Pass additional file information to the tokenizer
 * @returns Tokenizer
 */
export declare function fromStream(stream: Stream.Readable, fileInfo?: core.IFileInfo): Promise<ReadStreamTokenizer>;
