import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from 'three';
declare class OrbitControls extends EventDispatcher {
    object: Camera;
    domElement: HTMLElement | undefined;
    enabled: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    keys: {
        LEFT: string;
        UP: string;
        RIGHT: string;
        BOTTOM: string;
    };
    mouseButtons: {
        LEFT: MOUSE;
        MIDDLE: MOUSE;
        RIGHT: MOUSE;
    };
    touches: {
        ONE: TOUCH;
        TWO: TOUCH;
    };
    target0: Vector3;
    position0: Vector3;
    zoom0: number;
    _domElementKeyEvents: any;
    getPolarAngle: () => number;
    getAzimuthalAngle: () => number;
    setPolarAngle: (x: number) => void;
    setAzimuthalAngle: (x: number) => void;
    listenToKeyEvents: (domElement: HTMLElement) => void;
    saveState: () => void;
    reset: () => void;
    update: () => void;
    connect: (domElement: HTMLElement) => void;
    dispose: () => void;
    constructor(object: Camera, domElement?: HTMLElement);
}
declare class MapControls extends OrbitControls {
    constructor(object: Camera, domElement?: HTMLElement);
}
export { OrbitControls, MapControls };
