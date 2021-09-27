import { MeshBasicMaterial, WebGLRenderer, ShaderMaterial, WebGLRenderTarget } from 'three';
import { Pass, FullScreenQuad } from './Pass';
declare class AfterimagePass extends Pass {
    shader: {
        uniforms: {
            damp: {
                value: number;
            };
            tOld: {
                value: null;
            };
            tNew: {
                value: null;
            };
        };
        vertexShader: string;
        fragmentShader: string;
    };
    uniforms: any;
    textureComp: WebGLRenderTarget;
    textureOld: WebGLRenderTarget;
    shaderMaterial: ShaderMaterial;
    compFsQuad: FullScreenQuad<ShaderMaterial>;
    copyFsQuad: FullScreenQuad<MeshBasicMaterial>;
    constructor(damp?: number, shader?: {
        uniforms: {
            damp: {
                value: number;
            };
            tOld: {
                value: null;
            };
            tNew: {
                value: null;
            };
        };
        vertexShader: string;
        fragmentShader: string;
    });
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
    setSize(width: number, height: number): void;
}
export { AfterimagePass };
