import { DataTexture, Mesh, InstancedMesh, Material, Curve, BufferGeometry } from 'three';
import { TUniform } from 'types/shared';
export declare const initSplineTexture: (numberOfCurves?: number) => DataTexture;
export declare const updateSplineTexture: <TCurve extends Curve<any>>(texture: DataTexture, splineCurve: TCurve, offset?: number) => void;
export interface CurveModifierUniforms {
    spineTexture: TUniform<DataTexture>;
    pathOffset: TUniform<number>;
    pathSegment: TUniform<number>;
    spineOffset: TUniform<number>;
    spineLength: TUniform<number>;
    flow: TUniform<number>;
}
export declare function getUniforms(splineTexture: DataTexture): CurveModifierUniforms;
export declare type ModifiedMaterial<TMaterial extends Material> = TMaterial & {
    __ok: boolean;
};
export declare function modifyShader<TMaterial extends Material = Material>(material: ModifiedMaterial<TMaterial>, uniforms: CurveModifierUniforms, numberOfCurves?: number): void;
export declare class Flow<TMesh extends Mesh = Mesh> {
    curveArray: Curve<any>[];
    curveLengthArray: number[];
    object3D: TMesh;
    splineTexure: DataTexture;
    uniforms: CurveModifierUniforms;
    constructor(mesh: TMesh, numberOfCurves?: number);
    updateCurve<TCurve extends Curve<any>>(index: number, curve: TCurve): void;
    moveAlongCurve(amount: number): void;
}
export declare class InstancedFlow<TGeometry extends BufferGeometry = BufferGeometry, TMaterial extends Material = Material> extends Flow<InstancedMesh<TGeometry, TMaterial>> {
    offsets: number[];
    whichCurve: number[];
    constructor(count: number, curveCount: number, geometry: TGeometry, material: TMaterial);
    private writeChanges;
    moveIndividualAlongCurve(index: number, offset: number): void;
    setCurve(index: number, curveNo: number): void;
}
