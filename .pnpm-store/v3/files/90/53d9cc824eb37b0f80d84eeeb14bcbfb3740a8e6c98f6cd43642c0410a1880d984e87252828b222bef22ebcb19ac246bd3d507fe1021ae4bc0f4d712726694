import * as React from 'react';
import { Mesh, Texture } from 'three';
import { MeshReflectorMaterialImpl } from '../materials/MeshReflectorMaterial';
export declare type ReflectorChildProps = MeshReflectorMaterialImpl;
export declare type ReflectorProps = Omit<JSX.IntrinsicElements['mesh'], 'args' | 'children'> & Pick<JSX.IntrinsicElements['planeBufferGeometry'], 'args'> & {
    resolution?: number;
    mixBlur?: number;
    mixStrength?: number;
    blur?: [number, number] | number;
    mirror: number;
    minDepthThreshold?: number;
    maxDepthThreshold?: number;
    depthScale?: number;
    depthToBlurRatioBias?: number;
    debug?: number;
    distortionMap?: Texture;
    distortion?: number;
    children?: {
        (Component: React.ElementType<JSX.IntrinsicElements['meshReflectorMaterial']>, ComponentProps: ReflectorChildProps): JSX.Element | null;
    };
};
declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshReflectorMaterial: MeshReflectorMaterialImpl;
        }
    }
}
export declare const Reflector: React.ForwardRefExoticComponent<Pick<ReflectorProps, "visible" | "attach" | "attachArray" | "attachObject" | "args" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "type" | "id" | "uuid" | "name" | "parent" | "modelViewMatrix" | "normalMatrix" | "matrixWorld" | "matrixAutoUpdate" | "matrixWorldNeedsUpdate" | "castShadow" | "receiveShadow" | "frustumCulled" | "renderOrder" | "animations" | "userData" | "customDepthMaterial" | "customDistanceMaterial" | "isObject3D" | "onBeforeRender" | "onAfterRender" | "applyMatrix4" | "applyQuaternion" | "setRotationFromAxisAngle" | "setRotationFromEuler" | "setRotationFromMatrix" | "setRotationFromQuaternion" | "rotateOnAxis" | "rotateOnWorldAxis" | "rotateX" | "rotateY" | "rotateZ" | "translateOnAxis" | "translateX" | "translateY" | "translateZ" | "localToWorld" | "worldToLocal" | "lookAt" | "add" | "remove" | "clear" | "getObjectById" | "getObjectByName" | "getObjectByProperty" | "getWorldPosition" | "getWorldQuaternion" | "getWorldScale" | "getWorldDirection" | "raycast" | "traverse" | "traverseVisible" | "traverseAncestors" | "updateMatrix" | "updateMatrixWorld" | "updateWorldMatrix" | "toJSON" | "clone" | "copy" | "addEventListener" | "hasEventListener" | "removeEventListener" | "dispatchEvent" | keyof import("@react-three/fiber/dist/declarations/src/core/events").EventHandlers | "material" | "geometry" | "morphTargetInfluences" | "morphTargetDictionary" | "isMesh" | "updateMorphTargets" | "resolution" | "mixBlur" | "mixStrength" | "minDepthThreshold" | "maxDepthThreshold" | "depthScale" | "depthToBlurRatioBias" | "mirror" | "debug" | "distortion" | "distortionMap" | "blur"> & React.RefAttributes<Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]>>>;
