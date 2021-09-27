import { Group, Texture } from 'three';

import { XRHandModel, XRHandModelHandedness } from './XRHandModelFactory';

export interface XRHandPrimitiveModelOptions {
    primitive?: 'sphere' | 'box';
}

export class XRHandPrimitiveModel {
    controller: Group;
    handModel: XRHandModel;
    envMap: Texture | null;
    handMesh: Group;

    constructor(
        handModel: XRHandModel,
        controller: Group,
        path: string,
        handedness: XRHandModelHandedness,
        options: XRHandPrimitiveModelOptions,
    );

    updateMesh: () => void;
}
