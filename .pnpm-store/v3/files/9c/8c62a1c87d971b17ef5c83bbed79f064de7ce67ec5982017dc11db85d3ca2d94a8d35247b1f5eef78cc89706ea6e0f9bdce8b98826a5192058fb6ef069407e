declare type ShaderStage = 'vertex' | 'fragment' | 'compute';
declare type SpirvVersion = '1.0' | '1.1' | '1.2' | '1.3' | '1.4' | '1.5';

declare interface ResultZeroCopy {
    readonly data: Uint32Array;
    free(): void;
}

declare interface Glslang {
    compileGLSLZeroCopy(glsl: string, shader_stage: ShaderStage, gen_debug: boolean, spirv_version?: SpirvVersion): ResultZeroCopy;
    compileGLSL(glsl: string, shader_type: ShaderStage, gen_debug: boolean, spirv_version?: SpirvVersion): Uint32Array;
}

export default function(): Promise<Glslang>;
