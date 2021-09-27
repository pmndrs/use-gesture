import { ShaderMaterial, Vector2, ShaderMaterialParameters, Color } from 'three';
import { ColorOptions } from '../types/shared';
export declare type LineMaterialParameters = ShaderMaterialParameters & {
    color?: ColorOptions;
    linewidth?: number;
    dashed?: boolean;
    dashScale?: number;
    dashSize?: number;
    dashOffset?: number;
    gapSize?: number;
    resolution?: Vector2;
};
declare class LineMaterial extends ShaderMaterial {
    private readonly isLineMaterial;
    dashed: boolean;
    color: Color;
    lineWidth: number;
    dashScale: number;
    dashOffset: number;
    dashSize: number;
    opacity: number;
    resolution: Vector2;
    alphaToCoverage: boolean;
    constructor(parameters?: LineMaterialParameters);
}
export { LineMaterial };
