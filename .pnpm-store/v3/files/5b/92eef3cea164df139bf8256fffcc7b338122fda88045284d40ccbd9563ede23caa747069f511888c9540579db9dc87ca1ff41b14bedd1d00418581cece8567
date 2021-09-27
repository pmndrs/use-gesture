import { Camera, EventDispatcher, Vector3 } from 'three';
declare class PointerLockControls extends EventDispatcher {
    private camera;
    domElement: HTMLElement;
    isLocked: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    private changeEvent;
    private lockEvent;
    private unlockEvent;
    private euler;
    private PI_2;
    private vec;
    constructor(camera: Camera, domElement: HTMLElement);
    private onMouseMove;
    private onPointerlockChange;
    private onPointerlockError;
    connect: () => void;
    disconnect: () => void;
    dispose: () => void;
    private getObject;
    private direction;
    getDirection: (v: Vector3) => Vector3;
    moveForward: (distance: number) => void;
    moveRight: (distance: number) => void;
    lock: () => void;
    unlock: () => void;
}
export { PointerLockControls };
