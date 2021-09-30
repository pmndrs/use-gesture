
/** Encodes text to an ArrayBuffer. */
export function encodeText(text: string): Uint8Array {
	if (typeof TextEncoder !== 'undefined') {
		return new TextEncoder().encode(text);
	}
	return Buffer.from(text);
}

/** Decodes an ArrayBuffer to text. */
export function decodeText(buffer: Uint8Array): string {
	if (typeof TextDecoder !== 'undefined') {
		return new TextDecoder().decode(buffer);
	}
	return Buffer.from(buffer).toString('utf8');
}

/** Concatenates N ArrayBuffers. */
export function concat (buffers: (ArrayBuffer | Uint8Array)[]): Uint8Array {
	let totalByteLength = 0;
	for (const buffer of buffers) {
		totalByteLength += buffer.byteLength;
	}

	const result = new Uint8Array(totalByteLength);
	let byteOffset = 0;

	for (const buffer of buffers) {
		result.set(new Uint8Array(buffer), byteOffset);
		byteOffset += buffer.byteLength;
	}

	return result;
}