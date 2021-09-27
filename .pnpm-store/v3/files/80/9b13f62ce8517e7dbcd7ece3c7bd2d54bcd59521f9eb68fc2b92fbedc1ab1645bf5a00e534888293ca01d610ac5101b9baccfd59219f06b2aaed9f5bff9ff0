import { KTX2Container } from './container';
interface WriteOptions {
    keepWriter?: boolean;
}
/**
 * Serializes a {@link KTX2Container} instance to a KTX 2.0 file. Mip levels and other binary data
 * are copied into the resulting Uint8Array, so the original container can safely be edited or
 * destroyed after it is serialized.
 *
 * Options:
 * - keepWriter: If true, 'KTXWriter' key/value field is written as provided by the container.
 * 		Otherwise, a string for the current ktx-parse version is generated. Default: false.
 *
 * @param container
 * @param options
 */
export declare function write(container: KTX2Container, options?: WriteOptions): Uint8Array;
export {};
