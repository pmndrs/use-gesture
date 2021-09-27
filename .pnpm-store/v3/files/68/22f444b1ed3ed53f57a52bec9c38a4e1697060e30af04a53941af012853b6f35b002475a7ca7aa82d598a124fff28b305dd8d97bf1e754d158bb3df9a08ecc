import { BufferAttribute, BufferGeometry, Float32BufferAttribute, InterleavedBufferAttribute, Mesh, Line, Points } from 'three';
export declare const mergeBufferGeometries: (geometries: BufferGeometry[], useGroups?: boolean | undefined) => BufferGeometry | null;
export declare const mergeBufferAttributes: (attributes: BufferAttribute[]) => BufferAttribute | null | undefined;
export declare const interleaveAttributes: (attributes: BufferAttribute[]) => InterleavedBufferAttribute[] | null;
export declare function estimateBytesUsed(geometry: BufferGeometry): number;
export declare function mergeVertices(geometry: BufferGeometry, tolerance?: number): BufferGeometry;
export declare function toTrianglesDrawMode(geometry: BufferGeometry, drawMode: number): BufferGeometry;
export declare type ComputedMorphedAttribute = {
    positionAttribute: BufferAttribute | InterleavedBufferAttribute;
    normalAttribute: BufferAttribute | InterleavedBufferAttribute;
    morphedPositionAttribute: Float32BufferAttribute;
    morphedNormalAttribute: Float32BufferAttribute;
};
export declare function computeMorphedAttributes(object: Mesh | Line | Points): ComputedMorphedAttribute | null;
