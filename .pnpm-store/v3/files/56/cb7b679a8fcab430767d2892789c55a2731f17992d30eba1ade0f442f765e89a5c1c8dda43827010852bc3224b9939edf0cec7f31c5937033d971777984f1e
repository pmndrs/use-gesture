# ktx-parse

[![Latest NPM release](https://img.shields.io/npm/v/ktx-parse.svg)](https://www.npmjs.com/package/ktx-parse)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/ktx-parse)](https://bundlephobia.com/result?p=ktx-parse)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/donmccurdy/KTX-Parse/blob/main/LICENSE)
[![CI](https://github.com/donmccurdy/KTX-parse/workflows/CI/badge.svg?branch=main&event=push)](https://github.com/donmccurdy/KTX-parse/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/donmccurdy/KTX-Parse/badge.svg?branch=main)](https://coveralls.io/github/donmccurdy/KTX-Parse?branch=main)

*KTX 2.0 (.ktx2) parser and serializer.*

## Quickstart

Install:

```
npm install --save ktx-parse
```

Import:

```js
// ES Modules:
import { read, write } from 'ktx-parse';

// CommonJS:
const { read, write } = require('ktx-parse');
```

Usage:

```js
// Parse texture container from file:
const texture = read(data /* ← Uint8Array or Buffer */);

// Write texture container to file:
const data = write(texture); // → Uint8Array
```

See [API documentation](#api-documentation) for more details.

## Encoding / Decoding

KTX-Parse reads/writes KTX 2.0 containers, and provides access to the compressed texture data within the container. To decompress that texture data, or to compress existing texture data into GPU texture formats used by KTX 2.0, you'll need to use additional libraries such as encoders or transcoders.

**Encoding:**

Encoding GPU textures is a slow process, and should be completed at development/authoring time so that the compressed texture can be transmitted to the viewing device. GPU textures require much less GPU memory than image formats like PNG or JPEG, and can be uploaded to the GPU quickly with less impact on framerate. GPU textures can also have smaller filesizes in many, but not all, cases. See the [Basis documentation](https://github.com/BinomialLLC/basis_universal/) for details on this process.

- [BinomialLLC/basis_universal](https://github.com/BinomialLLC/basis_universal/) provides C++ and WebAssembly encoders, reading PNG files or raw pixel data, and outputing compressed texture data (and supercompression global data, if applicable). Use of these encoders is somewhat advanced, and the simpler `basisu` CLI tool does not provide the data necessary for writing a KTX 2.0 file.
- [KhronosGroup/KTX-Software](https://github.com/KhronosGroup/KTX-Software) provides CLI, C++, and WebAssembly encoders for reading PNG or JPEG textures and outputing a complete KTX 2.0 file, which `ktx-parse` can then read or edit. While probably easier than using the basis_universal encoders directly, the KTX-Software library is somewhat larger and has more dependencies.

**Transcoding / Decoding:**

Basis Universal texture formats (ETC1S and UASTC) cannot be directly read by a GPU, but are designed to be very efficiently rewritten into many of the specific GPU texture formats that different GPUs require. This process is called _transcoding_, and typically happens on the viewing device after a target output format (e.g. ETC1, ASTC, BC1, ...) is chosen. These transcoders can also fully _decode_ texture data to uncompressed RGBA formats, if raw pixel data is required.

- [BinomialLLC/basis_universal](https://github.com/BinomialLLC/basis_universal/) provides official C++ and WebAssembly transcoders, which support all Basis Universal input formats and can transcode to any output format (with appropriate compilation flags). With common settings, a transcoder will likely be > 200kb on web.
- [KhronosGroup/Universal-Texture-Transcoders](https://github.com/KhronosGroup/Universal-Texture-Transcoders) provides very small, fast WebAssembly transcoders each supporting only a single output texture format. Each transcoder is roughly 10-20kb, and the viewing device can choose which transcoder to download, as appropriate. *Only UASTC texture formats currently supported.*

The transcoders above cannot read KTX 2.0 files directly. Instead, unpack the KTX 2.0 files with `ktx-parse` first, then transcode the mip levels using a low-level transcoder.

## API Documentation

### Functions

#### read

<!-- begin:read -->


▸ **read**(`data`: Uint8Array): `KTX2Container`

*Defined in [src/read.ts:13](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/read.ts#L13)*

Parses a KTX 2.0 file, returning an unpacked `KTX2Container` instance with all associated
data. The container's mip levels and other binary data are pointers into the original file, not
copies, so the original file should not be overwritten after reading.

###### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | Bytes of KTX 2.0 file, as Uint8Array or Buffer.  |

**Returns:** `KTX2Container`

<!-- end:read -->

#### write

<!-- begin:write -->


▸ **write**(`container`: `KTX2Container`, `options?`: `WriteOptions`): Uint8Array

*Defined in [src/write.ts:21](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/write.ts#L21)*

Serializes a `KTX2Container` instance to a KTX 2.0 file. Mip levels and other binary data
are copied into the resulting Uint8Array, so the original container can safely be edited or
destroyed after it is serialized.

Options:
- keepWriter: If true, 'KTXWriter' key/value field is written as provided by the container.
		Otherwise, a string for the current ktx-parse version is generated. Default: false.

###### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`container` | `KTX2Container` | - |  |
`options` | `WriteOptions` | {} |   |

**Returns:** Uint8Array

<!-- end:write -->

<!-- begin:KTX2Container -->

### Class: KTX2Container

Represents an unpacked KTX 2.0 texture container. Data for individual mip levels are stored in
the `.levels` array, typically compressed in Basis Universal formats. Additional properties
provide metadata required to process, transcode, and upload these textures.

#### Properties

##### dataFormatDescriptor

•  **dataFormatDescriptor**: `KTX2DataFormatDescriptorBasicFormat`[] = [{ vendorId: KHR\_DF\_VENDORID\_KHRONOS, descriptorType: KTX2DescriptorType.BASICFORMAT, versionNumber: KHR\_DF\_VERSION, descriptorBlockSize: KHR\_DF\_BLOCKSIZE, colorModel: KTX2Model.UNSPECIFIED, colorPrimaries: KTX2Primaries.SRGB, transferFunction: KTX2Primaries.SRGB, flags: KTX2Flags.ALPHA\_STRAIGHT, texelBlockDimension: {x: 4, y: 4, z: 1, w: 1}, bytesPlane: [], samples: [], }]

*Defined in [src/container.ts:48](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L48)*

Data Format Descriptor.

___

##### faceCount

•  **faceCount**: number = 1

*Defined in [src/container.ts:39](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L39)*

Number of cubemap faces. For cubemaps and cubemap arrays, `faceCount` must be 6. For all
other textures, `faceCount` must be 1. Cubemap faces are stored in +X, -X, +Y, -Y, +Z, -Z
order.

___

##### globalData

•  **globalData**: `KTX2GlobalDataBasisLZ` \| null = null

*Defined in [src/container.ts:66](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L66)*

Supercompression Global Data.

___

##### keyValue

•  **keyValue**: { [key:string]: string \| Uint8Array;  }

*Defined in [src/container.ts:63](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L63)*

Key/Value Data.

___

##### layerCount

•  **layerCount**: number = 0

*Defined in [src/container.ts:32](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L32)*

Number of array elements (array textures only).

___

##### levels

•  **levels**: `KTX2Level`[] = []

*Defined in [src/container.ts:45](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L45)*

Mip levels, ordered largest (original) to smallest (~1px).

___

##### pixelDepth

•  **pixelDepth**: number = 0

*Defined in [src/container.ts:29](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L29)*

Depth of the texture image for level 0, in pixels (3D textures only).

___

##### pixelHeight

•  **pixelHeight**: number = 0

*Defined in [src/container.ts:26](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L26)*

Height of the texture image for level 0, in pixels.

___

##### pixelWidth

•  **pixelWidth**: number = 0

*Defined in [src/container.ts:23](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L23)*

Width of the texture image for level 0, in pixels.

___

##### supercompressionScheme

•  **supercompressionScheme**: `KTX2SupercompressionScheme` = KTX2SupercompressionScheme.NONE

*Defined in [src/container.ts:42](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L42)*

Indicates which supercompression scheme has been applied to mip level images, if any.

___

##### typeSize

•  **typeSize**: number = 1

*Defined in [src/container.ts:20](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L20)*

Size of the data type in bytes used to upload the data to a graphics API. When `vkFormat` is
VK_FORMAT_UNDEFINED, `typeSize` must be 1.

___

##### vkFormat

•  **vkFormat**: number = VK\_FORMAT\_UNDEFINED

*Defined in [src/container.ts:14](https://github.com/donmccurdy/KTX-Parse/blob/3c95c2e/src/container.ts#L14)*

Specifies the image format using Vulkan VkFormat enum values. When using Basis Universal
texture formats, `vkFormat` must be VK_FORMAT_UNDEFINED.

<!-- end:KTX2Container -->
