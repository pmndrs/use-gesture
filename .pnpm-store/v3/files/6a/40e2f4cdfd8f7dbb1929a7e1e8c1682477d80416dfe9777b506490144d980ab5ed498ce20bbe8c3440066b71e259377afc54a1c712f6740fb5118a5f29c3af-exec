import { Mesh, BufferGeometry, Color, TextureEncoding, WebGLRenderTarget } from 'three';

export interface ReflectorOptions {
    color?: Color;
    textureWidth?: number;
    textureHeight?: number;
    clipBias?: number;
    shader?: object;
    encoding?: TextureEncoding;
}

export class Reflector extends Mesh {
    constructor(geometry?: BufferGeometry, options?: ReflectorOptions);

    getRenderTarget(): WebGLRenderTarget;
}
