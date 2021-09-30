import { Mesh, BufferGeometry, Color, TextureEncoding, WebGLRenderTarget } from 'three';

export interface RefractorOptions {
    color?: Color;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: TextureEncoding;
}

export class Refractor extends Mesh {
    constructor(geometry?: BufferGeometry, options?: RefractorOptions);

    getRenderTarget(): WebGLRenderTarget;
}
