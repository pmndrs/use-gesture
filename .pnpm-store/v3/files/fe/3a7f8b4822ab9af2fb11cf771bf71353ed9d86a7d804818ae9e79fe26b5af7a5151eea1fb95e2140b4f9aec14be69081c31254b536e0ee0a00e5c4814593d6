///////////////////////////////////////////////////
// Common.
///////////////////////////////////////////////////

// Injected at compile time, from $npm_package_version.
declare const PACKAGE_VERSION: string;

export const KTX_WRITER = `KTX-Parse v${PACKAGE_VERSION}`;

export const NUL = new Uint8Array([0x00]);


///////////////////////////////////////////////////
// KTX2 Header.
///////////////////////////////////////////////////

export const KTX2_ID = [
	// '´', 'K', 'T', 'X', '2', '0', 'ª', '\r', '\n', '\x1A', '\n'
	0xAB, 0x4B, 0x54, 0x58, 0x20, 0x32, 0x30, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A
];

export const HEADER_BYTE_LENGTH = 68; // 13 * 4 + 2 * 8


///////////////////////////////////////////////////
// Data Format Descriptor (DFD).
///////////////////////////////////////////////////

export const KHR_DF_VENDORID_KHRONOS = 0;
export const KHR_DF_VERSION = 2;
export const KHR_DF_BLOCKSIZE = 40;
export const VK_FORMAT_UNDEFINED = 0;
