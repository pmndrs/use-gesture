export declare const KTX2_ID: number[];
export declare const KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT = 0;
export interface KTX2Level {
    data: Uint8Array;
    uncompressedByteLength: number;
}
export declare enum KTX2SupercompressionScheme {
    NONE = 0,
    BASISLZ = 1,
    ZSTD = 2,
    ZLIB = 3
}
export declare const KTX2DataFormatDescriptorModel: {
    ETC1S: number;
    UASTC: number;
};
export declare const KTX2DataFormatDescriptorChannel: {
    ETC1S: {
        RGB: number;
        RRR: number;
        GGG: number;
        AAA: number;
    };
    UASTC: {
        RGB: number;
        RGBA: number;
        RRR: number;
        RRRG: number;
    };
};
export interface KTX2DataFormatDescriptorTexelBlockDimensions {
    x: number;
    y: number;
    z: number;
    w: number;
}
export interface KTX2DataFormatDescriptorSample {
    bitOffset: number;
    bitLength: number;
    channelID: number;
    samplePosition: number[];
    sampleLower: number;
    sampleUpper: number;
}
export interface KTX2DataFormatDescriptor {
    vendorId: number;
    descriptorType: number;
    versionNumber: number;
    descriptorBlockSize: number;
    colorModel: number;
    colorPrimaries: number;
    transferFunction: number;
    flags: number;
    texelBlockDimension: KTX2DataFormatDescriptorTexelBlockDimensions;
    bytesPlane: number[];
    samples: KTX2DataFormatDescriptorSample[];
}
export interface KTX2KeyValue {
    key: string;
    value: string | Uint8Array;
}
interface KTX2GlobalDataImageDescription {
    imageFlags: number;
    rgbSliceByteOffset: number;
    rgbSliceByteLength: number;
    alphaSliceByteOffset: number;
    alphaSliceByteLength: number;
}
export interface KTX2GlobalData {
    endpointCount: number;
    selectorCount: number;
    imageDescs: KTX2GlobalDataImageDescription[];
    endpointsData: Uint8Array;
    selectorsData: Uint8Array;
    tablesData: Uint8Array;
    extendedData: Uint8Array;
}
export {};
