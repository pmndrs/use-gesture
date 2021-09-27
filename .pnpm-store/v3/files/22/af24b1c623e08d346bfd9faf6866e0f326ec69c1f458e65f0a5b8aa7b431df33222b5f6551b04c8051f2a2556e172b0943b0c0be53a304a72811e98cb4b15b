import * as React from 'react';
import { Mesh } from 'three';
export interface BVHOptions {
    splitStrategy?: 'CENTER' | 'AVERAGE' | 'SAH';
    verbose?: boolean;
    setBoundingBox?: boolean;
    maxDepth?: number;
    maxLeafTris?: number;
}
export declare function useBVH(mesh: React.MutableRefObject<Mesh | undefined>, options?: BVHOptions): void;
