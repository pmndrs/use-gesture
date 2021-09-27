import { KHR_DF_BLOCKSIZE, KHR_DF_VENDORID_KHRONOS, KHR_DF_VERSION, VK_FORMAT_UNDEFINED } from './constants';
import { KTX2DescriptorType, KTX2Flags, KTX2Model, KTX2Primaries, KTX2SupercompressionScheme } from './enums';

/**
 * Represents an unpacked KTX 2.0 texture container. Data for individual mip levels are stored in
 * the `.levels` array, typically compressed in Basis Universal formats. Additional properties
 * provide metadata required to process, transcode, and upload these textures.
 */
export class KTX2Container {
	/**
	 * Specifies the image format using Vulkan VkFormat enum values. When using Basis Universal
	 * texture formats, `vkFormat` must be VK_FORMAT_UNDEFINED.
	 */
	public vkFormat = VK_FORMAT_UNDEFINED;

	/**
	 * Size of the data type in bytes used to upload the data to a graphics API. When `vkFormat` is
	 * VK_FORMAT_UNDEFINED, `typeSize` must be 1.
	 */
	public typeSize: number = 1;

	/** Width of the texture image for level 0, in pixels. */
	public pixelWidth: number = 0;

	/** Height of the texture image for level 0, in pixels. */
	public pixelHeight: number = 0;

	/** Depth of the texture image for level 0, in pixels (3D textures only). */
	public pixelDepth: number = 0;

	/** Number of array elements (array textures only). */
	public layerCount: number = 0;

	/**
	 * Number of cubemap faces. For cubemaps and cubemap arrays, `faceCount` must be 6. For all
	 * other textures, `faceCount` must be 1. Cubemap faces are stored in +X, -X, +Y, -Y, +Z, -Z
	 * order.
	 */
	public faceCount: number = 1;

	/** Indicates which supercompression scheme has been applied to mip level images, if any. */
	public supercompressionScheme = KTX2SupercompressionScheme.NONE;

	/** Mip levels, ordered largest (original) to smallest (~1px). */
	public levels: KTX2Level[] = [];

	/** Data Format Descriptor. */
	public dataFormatDescriptor: KTX2DataFormatDescriptorBasicFormat[] = [{
		vendorId: KHR_DF_VENDORID_KHRONOS,
		descriptorType: KTX2DescriptorType.BASICFORMAT,
		versionNumber: KHR_DF_VERSION,
		descriptorBlockSize: KHR_DF_BLOCKSIZE,
		colorModel: KTX2Model.UNSPECIFIED,
		colorPrimaries: KTX2Primaries.SRGB,
		transferFunction: KTX2Primaries.SRGB,
		flags: KTX2Flags.ALPHA_STRAIGHT,
		texelBlockDimension: {x: 4, y: 4, z: 1, w: 1},
		bytesPlane: [],
		samples: [],
	}];

	/** Key/Value Data. */
	public keyValue: {[key: string]: string | Uint8Array} = {};

	/** Supercompression Global Data. */
	public globalData: KTX2GlobalDataBasisLZ | null = null;
}


///////////////////////////////////////////////////
// Mip Levels.
///////////////////////////////////////////////////

export interface KTX2Level {
	/** Compressed data of the mip level. */
	levelData: Uint8Array;

	/**
	 * Size of the mip level after reflation from supercompression, if applicable. When
	 * `supercompressionType` is BASISLZ, `uncompressedByteLength` must be 0. When
	 * `supercompressionType` is `NONE`, `uncompressedByteLength` must match the `levelData` byte
	 * length.
	 *
	 * _**NOTICE:** this implies that for formats such as UASTC, `uncompressedByteLength` may
	 * indicate size after ZSTD reflation (and of transcoded ASTC data), but does _not_ indicate
	 * size of decoded RGBA32 pixels._
	 */
	uncompressedByteLength: number;
};


///////////////////////////////////////////////////
// Data Format Descriptor (DFD).
///////////////////////////////////////////////////

export interface KTX2DataFormatDescriptorBasicFormat {
	vendorId: number;
	descriptorType: number;
	versionNumber: number;
	descriptorBlockSize: number;
	colorModel: number;
	colorPrimaries: number;
	transferFunction: number;
	flags: number;
	texelBlockDimension: KTX2BasicFormatTexelBlockDimensions;
	bytesPlane: number[];
	samples: KTX2BasicFormatSample[],
};

export interface KTX2BasicFormatTexelBlockDimensions {
	x: number;
	y: number;
	z: number;
	w: number;
};

export interface KTX2BasicFormatSample {
	bitOffset: number;
	bitLength: number;
	channelID: number;
	samplePosition: number[];
	sampleLower: number;
	sampleUpper: number;
};


///////////////////////////////////////////////////
// Supercompression Global Data.
///////////////////////////////////////////////////

export interface KTX2GlobalDataBasisLZ {
	endpointCount: number;
	selectorCount: number;
	imageDescs: KTX2GlobalDataBasisLZImageDesc[];
	endpointsData: Uint8Array;
	selectorsData: Uint8Array;
	tablesData: Uint8Array;
	extendedData: Uint8Array;
};

interface KTX2GlobalDataBasisLZImageDesc {
	imageFlags: number;
	rgbSliceByteOffset: number;
	rgbSliceByteLength: number;
	alphaSliceByteOffset: number;
	alphaSliceByteLength: number;
};
