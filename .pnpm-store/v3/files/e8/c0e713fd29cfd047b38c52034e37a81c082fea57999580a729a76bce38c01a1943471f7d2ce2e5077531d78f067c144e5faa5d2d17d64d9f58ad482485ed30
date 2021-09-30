export class BufferReader {
	private _dataView: DataView;
	private _littleEndian: boolean;
	public _offset: number;

	constructor(data: Uint8Array, byteOffset: number, byteLength: number, littleEndian: boolean) {
		this._dataView = new DataView(data.buffer, data.byteOffset + byteOffset, byteLength);
		this._littleEndian = littleEndian;
		this._offset = 0;
	}

	_nextUint8() {
		const value = this._dataView.getUint8(this._offset);
		this._offset += 1;
		return value;
	}

	_nextUint16() {
		const value = this._dataView.getUint16(this._offset, this._littleEndian);
		this._offset += 2;
		return value;
	}

	_nextUint32() {
		const value = this._dataView.getUint32(this._offset, this._littleEndian);
		this._offset += 4;
		return value;
	}

	_nextUint64() {
		const left = this._dataView.getUint32(this._offset, this._littleEndian);
		const right = this._dataView.getUint32(this._offset + 4, this._littleEndian);
		// TODO(cleanup): Just test this...
		// const value = this._littleEndian ? left + (2 ** 32 * right) : (2 ** 32 * left) + right;
		const value = left + (2 ** 32 * right);
		this._offset += 8;
		return value;
	}

	_skip(bytes: number) {
		this._offset += bytes;
		return this;
	}

	_scan(maxByteLength: number, term: number = 0x00): Uint8Array {
		const byteOffset = this._offset;
		let byteLength = 0;
		while (this._dataView.getUint8(this._offset) !== term && byteLength < maxByteLength) {
			byteLength++;
			this._offset++;
		}

		if (byteLength < maxByteLength) this._offset++;

		return new Uint8Array(
			this._dataView.buffer,
			this._dataView.byteOffset + byteOffset,
			byteLength
		);
	}
}
