import * as React from 'react';
export interface ShakeController {
    getIntensity: () => number;
    setIntensity: (val: number) => void;
}
declare type ControlsProto = {
    update(): void;
    target: THREE.Vector3;
    addEventListener: (event: string, callback: (event: any) => void) => void;
    removeEventListener: (event: string, callback: (event: any) => void) => void;
};
export interface CameraShakeProps {
    intensity?: number;
    decay?: boolean;
    decayRate?: number;
    maxYaw?: number;
    maxPitch?: number;
    maxRoll?: number;
    yawFrequency?: number;
    pitchFrequency?: number;
    rollFrequency?: number;
    controls?: React.MutableRefObject<ControlsProto | null>;
}
export declare const CameraShake: React.ForwardRefExoticComponent<CameraShakeProps & React.RefAttributes<ShakeController | undefined>>;
export {};
