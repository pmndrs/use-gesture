export declare class BufferReader {
    private _dataView;
    private _littleEndian;
    _offset: number;
    constructor(data: Uint8Array, byteOffset: number, byteLength: number, littleEndian: boolean);
    _nextUint8(): number;
    _nextUint16(): number;
    _nextUint32(): number;
    _nextUint64(): number;
    _skip(bytes: number): this;
    _scan(maxByteLength: number, term?: number): Uint8Array;
}
