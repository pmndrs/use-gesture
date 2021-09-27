import { Shader, ShaderMaterial, WebGLRenderer, WebGLRenderTarget } from 'three';
import { Pass, FullScreenQuad } from './Pass';
declare class ShaderPass extends Pass {
    textureID: string;
    uniforms: Shader['uniforms'];
    material: ShaderMaterial;
    fsQuad: FullScreenQuad;
    constructor(shader: ShaderMaterial | (Shader & {
        defines?: Object;
    }), textureID?: string);
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
}
export { ShaderPass };
