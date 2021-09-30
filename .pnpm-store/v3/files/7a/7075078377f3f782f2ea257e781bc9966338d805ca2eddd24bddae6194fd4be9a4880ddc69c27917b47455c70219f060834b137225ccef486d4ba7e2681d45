import { BufferReader } from './buffer-reader';
import { KTX2_ID } from './constants';
import { KTX2Container, KTX2DataFormatDescriptorBasicFormat } from './container';
import { decodeText } from './util';

/**
 * Parses a KTX 2.0 file, returning an unpacked {@link KTX2Container} instance with all associated
 * data. The container's mip levels and other binary data are pointers into the original file, not
 * copies, so the original file should not be overwritten after reading.
 *
 * @param data Bytes of KTX 2.0 file, as Uint8Array or Buffer.
 */
export function read(data: Uint8Array): KTX2Container {

	///////////////////////////////////////////////////
	// KTX 2.0 Identifier.
	///////////////////////////////////////////////////

	const id = new Uint8Array(data.buffer, data.byteOffset, KTX2_ID.length);
	if (id[0] !== KTX2_ID[0] || // '´'
		id[1] !== KTX2_ID[1] || // 'K'
		id[2] !== KTX2_ID[2] || // 'T'
		id[3] !== KTX2_ID[3] || // 'X'
		id[4] !== KTX2_ID[4] || // ' '
		id[5] !== KTX2_ID[5] || // '2'
		id[6] !== KTX2_ID[6] || // '0'
		id[7] !== KTX2_ID[7] || // 'ª'
		id[8] !== KTX2_ID[8] || // '\r'
		id[9] !== KTX2_ID[9] || // '\n'
		id[10] !== KTX2_ID[10] || // '\x1A'
		id[11] !== KTX2_ID[11] // '\n'
	) {
		throw new Error('Missing KTX 2.0 identifier.');
	}

	const container = new KTX2Container();

	///////////////////////////////////////////////////
	// Header.
	///////////////////////////////////////////////////

	const headerByteLength = 17 * Uint32Array.BYTES_PER_ELEMENT;
	const headerReader = new BufferReader(data, KTX2_ID.length, headerByteLength, true);

	container.vkFormat = headerReader._nextUint32();
	container.typeSize = headerReader._nextUint32();
	container.pixelWidth = headerReader._nextUint32();
	container.pixelHeight = headerReader._nextUint32();
	container.pixelDepth = headerReader._nextUint32();
	container.layerCount = headerReader._nextUint32();
	container.faceCount = headerReader._nextUint32();

	const levelCount = headerReader._nextUint32();

	container.supercompressionScheme = headerReader._nextUint32();

	const dfdByteOffset = headerReader._nextUint32();
	const dfdByteLength = headerReader._nextUint32();
	const kvdByteOffset = headerReader._nextUint32();
	const kvdByteLength = headerReader._nextUint32();
	const sgdByteOffset = headerReader._nextUint64();
	const sgdByteLength = headerReader._nextUint64();

	///////////////////////////////////////////////////
	// Level Index.
	///////////////////////////////////////////////////

	const levelByteLength = levelCount * 3 * 8;
	const levelReader = new BufferReader(data, KTX2_ID.length + headerByteLength, levelByteLength, true);

	for (let i = 0; i < levelCount; i ++) {
		container.levels.push({
			levelData: new Uint8Array(data.buffer, data.byteOffset + levelReader._nextUint64(), levelReader._nextUint64()),
			uncompressedByteLength: levelReader._nextUint64(),
		});
	}


	///////////////////////////////////////////////////
	// Data Format Descriptor (DFD).
	///////////////////////////////////////////////////

	const dfdReader = new BufferReader(data, dfdByteOffset, dfdByteLength, true);

	const dfd: KTX2DataFormatDescriptorBasicFormat = {
		vendorId: dfdReader._skip(4 /* totalSize */)._nextUint16(),
		descriptorType: dfdReader._nextUint16(),
		versionNumber: dfdReader._nextUint16(),
		descriptorBlockSize: dfdReader._nextUint16(),
		colorModel: dfdReader._nextUint8(),
		colorPrimaries: dfdReader._nextUint8(),
		transferFunction: dfdReader._nextUint8(),
		flags: dfdReader._nextUint8(),
		texelBlockDimension: {
			x: dfdReader._nextUint8() + 1,
			y: dfdReader._nextUint8() + 1,
			z: dfdReader._nextUint8() + 1,
			w: dfdReader._nextUint8() + 1,
		},
		bytesPlane: [
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
		],
		samples: [],
	};

	const sampleStart = 6;
	const sampleWords = 4;
	const numSamples = (dfd.descriptorBlockSize / 4 - sampleStart) / sampleWords;

	for (let i = 0; i < numSamples; i ++) {
		dfd.samples[ i ] = {
			bitOffset: dfdReader._nextUint16(),
			bitLength: dfdReader._nextUint8(),
			channelID: dfdReader._nextUint8(),
			samplePosition: [
				dfdReader._nextUint8(),
				dfdReader._nextUint8(),
				dfdReader._nextUint8(),
				dfdReader._nextUint8(),
			],
			sampleLower: dfdReader._nextUint32(),
			sampleUpper: dfdReader._nextUint32(),
		};
	}

	container.dataFormatDescriptor.length = 0;
	container.dataFormatDescriptor.push(dfd);


	///////////////////////////////////////////////////
	// Key/Value Data (KVD).
	///////////////////////////////////////////////////

	const kvdReader = new BufferReader(data, kvdByteOffset, kvdByteLength, true);

	while (kvdReader._offset < kvdByteLength) {
		const keyValueByteLength = kvdReader._nextUint32();
		const keyData = kvdReader._scan(keyValueByteLength);
		const key = decodeText(keyData);

		const valueData = kvdReader._scan(keyValueByteLength - keyData.byteLength);
		container.keyValue[key] = key.match(/^ktx/i) ? decodeText(valueData) : valueData;

		// 4-byte alignment.
		if (kvdReader._offset % 4) kvdReader._skip(4 - (kvdReader._offset % 4));
	}


	///////////////////////////////////////////////////
	// Supercompression Global Data (SGD).
	///////////////////////////////////////////////////

	if (sgdByteLength <= 0) return container;

	const sgdReader = new BufferReader(data, sgdByteOffset, sgdByteLength, true);

	const endpointCount = sgdReader._nextUint16();
	const selectorCount = sgdReader._nextUint16();
	const endpointsByteLength = sgdReader._nextUint32();
	const selectorsByteLength = sgdReader._nextUint32();
	const tablesByteLength = sgdReader._nextUint32();
	const extendedByteLength = sgdReader._nextUint32();

	const imageDescs = [];
	for (let i = 0; i < levelCount; i ++) {
		imageDescs.push({
			imageFlags: sgdReader._nextUint32(),
			rgbSliceByteOffset: sgdReader._nextUint32(),
			rgbSliceByteLength: sgdReader._nextUint32(),
			alphaSliceByteOffset: sgdReader._nextUint32(),
			alphaSliceByteLength: sgdReader._nextUint32(),
		});
	}

	const endpointsByteOffset = sgdByteOffset + sgdReader._offset;
	const selectorsByteOffset = endpointsByteOffset + endpointsByteLength;
	const tablesByteOffset = selectorsByteOffset + selectorsByteLength;
	const extendedByteOffset = tablesByteOffset + tablesByteLength;

	const endpointsData = new Uint8Array(data.buffer, data.byteOffset + endpointsByteOffset, endpointsByteLength);
	const selectorsData = new Uint8Array(data.buffer, data.byteOffset + selectorsByteOffset, selectorsByteLength);
	const tablesData = new Uint8Array(data.buffer, data.byteOffset + tablesByteOffset, tablesByteLength);
	const extendedData = new Uint8Array(data.buffer, data.byteOffset + extendedByteOffset, extendedByteLength);

	container.globalData = {
		endpointCount,
		selectorCount,
		imageDescs,
		endpointsData,
		selectorsData,
		tablesData,
		extendedData,
	};

	return container;
}
