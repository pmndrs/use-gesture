import * as React from 'react';
import * as THREE from 'three';
import { PresetsType } from '../helpers/environment-assets';
declare const presets: {
    rembrandt: {
        main: number[];
        fill: number[];
    };
    portrait: {
        main: number[];
        fill: number[];
    };
    upfront: {
        main: number[];
        fill: number[];
    };
    soft: {
        main: number[];
        fill: number[];
    };
};
declare type ControlsProto = {
    update(): void;
    target: THREE.Vector3;
};
declare type Props = JSX.IntrinsicElements['group'] & {
    contactShadow?: boolean;
    shadows?: boolean;
    adjustCamera?: boolean;
    environment?: PresetsType;
    intensity?: number;
    ambience?: number;
    controls?: React.MutableRefObject<ControlsProto>;
    preset?: keyof typeof presets;
    shadowBias?: number;
    contactShadowBlur?: number;
    contactShadowOpacity?: number;
};
export declare function Stage({ children, controls, shadows, adjustCamera, environment, contactShadow, intensity, preset, shadowBias, contactShadowBlur, contactShadowOpacity, ...props }: Props): JSX.Element;
export {};
