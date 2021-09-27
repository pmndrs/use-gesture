import { EventDispatcher, MOUSE, OrthographicCamera, PerspectiveCamera, Quaternion, Spherical, TOUCH, Vector3 } from 'three';
export declare type CHANGE_EVENT = {
    type: 'change' | 'start' | 'end';
};
export declare enum STATE {
    NONE = -1,
    ROTATE = 0,
    DOLLY = 1,
    PAN = 2,
    TOUCH_ROTATE = 3,
    TOUCH_PAN = 4,
    TOUCH_DOLLY_PAN = 5,
    TOUCH_DOLLY_ROTATE = 6
}
declare class CameraControls extends EventDispatcher {
    object: PerspectiveCamera | OrthographicCamera;
    domElement: HTMLElement;
    enabled: boolean;
    target: Vector3;
    trackball: boolean;
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
    enableKeys: boolean;
    keys: {
        LEFT: string;
        UP: string;
        RIGHT: string;
        BOTTOM: string;
    };
    mouseButtons: {
        LEFT: MOUSE;
        MIDDLE?: MOUSE;
        RIGHT: MOUSE;
    };
    touches: {
        ONE: TOUCH;
        TWO: TOUCH;
    };
    target0: Vector3;
    position0: Vector3;
    quaternion0: Quaternion;
    zoom0: number;
    spherical: Spherical;
    sphericalDelta: Spherical;
    private changeEvent;
    private startEvent;
    private endEvent;
    private state;
    private EPS;
    private scale;
    private panOffset;
    private zoomChanged;
    private rotateStart;
    private rotateEnd;
    private rotateDelta;
    private panStart;
    private panEnd;
    private panDelta;
    private dollyStart;
    private dollyEnd;
    private dollyDelta;
    private offset;
    private lastPosition;
    private lastQuaternion;
    private q;
    private v;
    private vec;
    private quat;
    private quatInverse;
    constructor(object: PerspectiveCamera | OrthographicCamera, domElement: HTMLElement);
    getPolarAngle: () => number;
    getAzimuthalAngle: () => number;
    saveState: () => void;
    reset: () => void;
    dispose: () => void;
    private update;
    private getAutoRotationAngle;
    private getZoomScale;
    private rotateLeft;
    private rotateUp;
    private panLeft;
    private panUp;
    private pan;
    private dollyIn;
    private dollyOut;
    private handleMouseDownRotate;
    private handleMouseDownDolly;
    private handleMouseDownPan;
    private handleMouseMoveRotate;
    private handleMouseMoveDolly;
    private handleMouseMovePan;
    private handleMouseUp;
    private handleMouseWheel;
    private handleKeyDown;
    private handleTouchStartRotate;
    private handleTouchStartPan;
    private handleTouchStartDolly;
    private handleTouchStartDollyPan;
    private handleTouchStartDollyRotate;
    private handleTouchMoveRotate;
    private handleTouchMovePan;
    private handleTouchMoveDolly;
    private handleTouchMoveDollyPan;
    private handleTouchMoveDollyRotate;
    private handleTouchEnd;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onMouseWheel;
    private onKeyDown;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
    private onContextMenu;
}
declare class OrbitControlsExp extends CameraControls {
    mouseButtons: {
        LEFT: MOUSE;
        RIGHT: MOUSE;
    };
    touches: {
        ONE: TOUCH;
        TWO: TOUCH;
    };
    constructor(object: PerspectiveCamera | OrthographicCamera, domElement: HTMLElement);
}
declare class MapControlsExp extends CameraControls {
    mouseButtons: {
        LEFT: MOUSE;
        RIGHT: MOUSE;
    };
    touches: {
        ONE: TOUCH;
        TWO: TOUCH;
    };
    constructor(object: PerspectiveCamera | OrthographicCamera, domElement: HTMLElement);
}
declare class TrackballControlsExp extends CameraControls {
    trackball: boolean;
    screenSpacePanning: boolean;
    autoRotate: boolean;
    mouseButtons: {
        LEFT: MOUSE;
        RIGHT: MOUSE;
    };
    touches: {
        ONE: TOUCH;
        TWO: TOUCH;
    };
    constructor(object: PerspectiveCamera | OrthographicCamera, domElement: HTMLElement);
}
export { CameraControls, OrbitControlsExp, MapControlsExp, TrackballControlsExp };
