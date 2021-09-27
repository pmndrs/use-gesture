import { Mesh, ShaderMaterial, Vector3 } from 'three';
declare class Sky extends Mesh {
    constructor();
    static SkyShader: {
        uniforms: {
            turbidity: {
                value: number;
            };
            rayleigh: {
                value: number;
            };
            mieCoefficient: {
                value: number;
            };
            mieDirectionalG: {
                value: number;
            };
            sunPosition: {
                value: Vector3;
            };
            up: {
                value: Vector3;
            };
        };
        vertexShader: string;
        fragmentShader: string;
    };
    static material: ShaderMaterial;
}
export { Sky };
