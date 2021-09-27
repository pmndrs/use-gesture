import { Group, Object3D, Texture } from 'three';

import { GLTFLoader } from '../loaders/GLTFLoader';

export class XRControllerModel extends Object3D {
    constructor();

    motionController: any;

    setEnvironmentMap(envMap: Texture): XRControllerModel;
}

export class XRControllerModelFactory {
    constructor(gltfLoader?: GLTFLoader);
    gltfLoader: GLTFLoader | null;
    path: string;

    createControllerModel(controller: Group): XRControllerModel;
}
