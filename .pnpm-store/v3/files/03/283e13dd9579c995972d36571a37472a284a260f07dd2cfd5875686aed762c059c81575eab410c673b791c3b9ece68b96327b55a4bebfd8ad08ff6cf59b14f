import { HEADER_BYTE_LENGTH, KTX2_ID, KTX_WRITER, NUL } from './constants';
import { KTX2Container } from './container';
import { KTX2DescriptorType } from './enums';
import { concat, encodeText } from './util';

interface WriteOptions {keepWriter?: boolean};
const DEFAULT_OPTIONS: WriteOptions = {keepWriter: false};

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
export function write(container: KTX2Container, options: WriteOptions = {}): Uint8Array {
	options = {...DEFAULT_OPTIONS, ...options};

	///////////////////////////////////////////////////
	// Supercompression Global Data (SGD).
	///////////////////////////////////////////////////

	let sgdBuffer = new ArrayBuffer(0);
	if (container.globalData) {
		const sgdHeaderBuffer = new ArrayBuffer(20 + container.globalData.imageDescs.length * 5 * 4);
		const sgdHeaderView = new DataView(sgdHeaderBuffer);
		sgdHeaderView.setUint16(0, container.globalData.endpointCount, true);
		sgdHeaderView.setUint16(2, container.globalData.selectorCount, true);
		sgdHeaderView.setUint32(4, container.globalData.endpointsData.byteLength, true);
		sgdHeaderView.setUint32(8, container.globalData.selectorsData.byteLength, true);
		sgdHeaderView.setUint32(12, container.globalData.tablesData.byteLength, true);
		sgdHeaderView.setUint32(16, container.globalData.extendedData.byteLength, true);

		for (let i = 0; i < container.globalData.imageDescs.length; i++) {
			const imageDesc = container.globalData.imageDescs[i];
			sgdHeaderView.setUint32(20 + i * 5 * 4 + 0, imageDesc.imageFlags, true);
			sgdHeaderView.setUint32(20 + i * 5 * 4 + 4, imageDesc.rgbSliceByteOffset, true);
			sgdHeaderView.setUint32(20 + i * 5 * 4 + 8, imageDesc.rgbSliceByteLength, true);
			sgdHeaderView.setUint32(20 + i * 5 * 4 + 12, imageDesc.alphaSliceByteOffset, true);
			sgdHeaderView.setUint32(20 + i * 5 * 4 + 16, imageDesc.alphaSliceByteLength, true);
		}

		sgdBuffer = concat([
			sgdHeaderBuffer,
			container.globalData.endpointsData,
			container.globalData.selectorsData,
			container.globalData.tablesData,
			container.globalData.extendedData,
		]);
	}


	///////////////////////////////////////////////////
	// Key/Value Data (KVD).
	///////////////////////////////////////////////////

	const keyValueData: Uint8Array[] = [];
	let keyValue = container.keyValue;

	if (!options.keepWriter) {
		keyValue = {...container.keyValue, 'KTXwriter': KTX_WRITER};
	}

	for (const key in keyValue) {
		const value = keyValue[key];
		const keyData = encodeText(key);
		const valueData = typeof value === 'string' ? encodeText(value) : value;
		const kvByteLength = keyData.byteLength + 1 + valueData.byteLength + 1;
		const kvPadding = kvByteLength % 4 ? (4 - (kvByteLength % 4)) : 0; // align(4)
		keyValueData.push(concat([
			new Uint32Array([kvByteLength]),
			keyData,
			NUL,
			valueData,
			NUL,
			new Uint8Array(kvPadding).fill(0x00), // align(4)
		]));
	}

	const kvdBuffer = concat(keyValueData);


	///////////////////////////////////////////////////
	// Data Format Descriptor (DFD).
	///////////////////////////////////////////////////

	const dfdBuffer = new ArrayBuffer(44);
	const dfdView = new DataView(dfdBuffer);

	if (container.dataFormatDescriptor.length !== 1
			|| container.dataFormatDescriptor[0].descriptorType !== KTX2DescriptorType.BASICFORMAT) {
		throw new Error('Only BASICFORMAT Data Format Descriptor output supported.');
	}

	const dfd = container.dataFormatDescriptor[0];

	dfdView.setUint32(0, 44, true);
	dfdView.setUint16(4, dfd.vendorId, true);
	dfdView.setUint16(6, dfd.descriptorType, true);
	dfdView.setUint16(8, dfd.versionNumber, true);
	dfdView.setUint16(10, dfd.descriptorBlockSize, true);

	dfdView.setUint8(12, dfd.colorModel);
	dfdView.setUint8(13, dfd.colorPrimaries);
	dfdView.setUint8(14, dfd.transferFunction);
	dfdView.setUint8(15, dfd.flags);

	dfdView.setUint8(16, dfd.texelBlockDimension.x - 1);
	dfdView.setUint8(17, dfd.texelBlockDimension.y - 1);
	dfdView.setUint8(18, dfd.texelBlockDimension.z - 1);
	dfdView.setUint8(19, dfd.texelBlockDimension.w - 1);

	for (let i = 0; i < 8; i++) dfdView.setUint8(20 + i, dfd.bytesPlane[i]);

	for (let i = 0; i < dfd.samples.length; i++) {
		const sample = dfd.samples[i];
		const sampleByteOffset = 28 + i * 16;

		dfdView.setUint16(sampleByteOffset + 0, sample.bitOffset, true);
		dfdView.setUint8(sampleByteOffset + 2, sample.bitLength);
		dfdView.setUint8(sampleByteOffset + 3, sample.channelID);

		dfdView.setUint8(sampleByteOffset + 4, sample.samplePosition[0]);
		dfdView.setUint8(sampleByteOffset + 5, sample.samplePosition[1]);
		dfdView.setUint8(sampleByteOffset + 6, sample.samplePosition[2]);
		dfdView.setUint8(sampleByteOffset + 7, sample.samplePosition[3]);

		dfdView.setUint32(sampleByteOffset + 8, sample.sampleLower, true);
		dfdView.setUint32(sampleByteOffset + 12, sample.sampleUpper, true);
	}


	///////////////////////////////////////////////////
	// Data alignment.
	///////////////////////////////////////////////////

	const dfdByteOffset = KTX2_ID.length + HEADER_BYTE_LENGTH + container.levels.length * 3 * 8;
	const kvdByteOffset = dfdByteOffset + dfdBuffer.byteLength;
	let sgdByteOffset = kvdByteOffset + kvdBuffer.byteLength;
	if (sgdByteOffset % 8) sgdByteOffset += 8 - (sgdByteOffset % 8); // align(8)


	///////////////////////////////////////////////////
	// Level Index.
	///////////////////////////////////////////////////

	const levelData: Uint8Array[] = [];
	const levelIndex = new DataView(new ArrayBuffer(container.levels.length * 3 * 8));

	let levelDataByteOffset = sgdByteOffset + sgdBuffer.byteLength;
	for (let i = 0; i < container.levels.length; i++) {
		const level = container.levels[i];
		levelData.push(level.levelData);
		levelIndex.setBigUint64(i * 24 + 0, BigInt(levelDataByteOffset), true);
		levelIndex.setBigUint64(i * 24 + 8, BigInt(level.levelData.byteLength), true);
		levelIndex.setBigUint64(i * 24 + 16, BigInt(level.uncompressedByteLength), true);
		levelDataByteOffset += level.levelData.byteLength;
	}


	///////////////////////////////////////////////////
	// Header.
	///////////////////////////////////////////////////

	const headerBuffer = new ArrayBuffer(HEADER_BYTE_LENGTH);
	const headerView = new DataView(headerBuffer);
	headerView.setUint32(0, container.vkFormat, true);
	headerView.setUint32(4, container.typeSize, true);
	headerView.setUint32(8, container.pixelWidth, true);
	headerView.setUint32(12, container.pixelHeight, true);
	headerView.setUint32(16, container.pixelDepth, true);
	headerView.setUint32(20, container.layerCount, true);
	headerView.setUint32(24, container.faceCount, true);
	headerView.setUint32(28, container.levels.length, true);
	headerView.setUint32(32, container.supercompressionScheme, true);

	headerView.setUint32(36, dfdByteOffset, true);
	headerView.setUint32(40, dfdBuffer.byteLength, true);
	headerView.setUint32(44, kvdByteOffset, true);
	headerView.setUint32(48, kvdBuffer.byteLength, true);
	headerView.setBigUint64(52, BigInt(sgdByteOffset), true);
	headerView.setBigUint64(60, BigInt(sgdBuffer.byteLength), true);


	///////////////////////////////////////////////////
	// Compose.
	///////////////////////////////////////////////////

	return new Uint8Array(concat([
		new Uint8Array(KTX2_ID).buffer,
		headerBuffer,
		levelIndex.buffer,
		dfdBuffer,
		kvdBuffer,
		new ArrayBuffer(sgdByteOffset - (kvdByteOffset + kvdBuffer.byteLength)), // align(8)
		sgdBuffer,
		...levelData,
	]));
}

