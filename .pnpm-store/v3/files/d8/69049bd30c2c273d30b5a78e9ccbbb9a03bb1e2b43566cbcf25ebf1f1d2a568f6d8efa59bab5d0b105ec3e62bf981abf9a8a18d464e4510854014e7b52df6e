import * as THREE from 'three';
import * as React from 'react';
declare type PointMaterialType = JSX.IntrinsicElements['shaderMaterial'] & {
    scale?: number;
};
declare global {
    namespace JSX {
        interface IntrinsicElements {
            pointMaterialImpl: PointMaterialType;
        }
    }
}
export declare class PointMaterialImpl extends THREE.ShaderMaterial {
    constructor();
    get scale(): any;
    set scale(v: any);
}
export declare const PointMaterial: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
export {};
