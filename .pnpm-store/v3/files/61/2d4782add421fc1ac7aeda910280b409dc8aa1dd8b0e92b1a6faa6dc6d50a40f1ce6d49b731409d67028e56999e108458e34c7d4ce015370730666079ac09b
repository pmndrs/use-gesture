import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { EventDispatcher, Euler, Vector3 } from 'three';

class PointerLockControls extends EventDispatcher {
  // Set to constrain the pitch of the camera
  // Range is 0 to Math.PI radians
  // radians
  // radians
  constructor(camera, domElement) {
    super();

    _defineProperty(this, "camera", void 0);

    _defineProperty(this, "domElement", void 0);

    _defineProperty(this, "isLocked", false);

    _defineProperty(this, "minPolarAngle", 0);

    _defineProperty(this, "maxPolarAngle", Math.PI);

    _defineProperty(this, "changeEvent", {
      type: 'change'
    });

    _defineProperty(this, "lockEvent", {
      type: 'lock'
    });

    _defineProperty(this, "unlockEvent", {
      type: 'unlock'
    });

    _defineProperty(this, "euler", new Euler(0, 0, 0, 'YXZ'));

    _defineProperty(this, "PI_2", Math.PI / 2);

    _defineProperty(this, "vec", new Vector3());

    _defineProperty(this, "onMouseMove", event => {
      if (this.isLocked === false) return;
      const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      this.euler.setFromQuaternion(this.camera.quaternion);
      this.euler.y -= movementX * 0.002;
      this.euler.x -= movementY * 0.002;
      this.euler.x = Math.max(this.PI_2 - this.maxPolarAngle, Math.min(this.PI_2 - this.minPolarAngle, this.euler.x));
      this.camera.quaternion.setFromEuler(this.euler);
      this.dispatchEvent(this.changeEvent);
    });

    _defineProperty(this, "onPointerlockChange", () => {
      if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
        this.dispatchEvent(this.lockEvent);
        this.isLocked = true;
      } else {
        this.dispatchEvent(this.unlockEvent);
        this.isLocked = false;
      }
    });

    _defineProperty(this, "onPointerlockError", () => {
      console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
    });

    _defineProperty(this, "connect", () => {
      this.domElement.ownerDocument.addEventListener('mousemove', this.onMouseMove);
      this.domElement.ownerDocument.addEventListener('pointerlockchange', this.onPointerlockChange);
      this.domElement.ownerDocument.addEventListener('pointerlockerror', this.onPointerlockError);
    });

    _defineProperty(this, "disconnect", () => {
      this.domElement.ownerDocument.removeEventListener('mousemove', this.onMouseMove);
      this.domElement.ownerDocument.removeEventListener('pointerlockchange', this.onPointerlockChange);
      this.domElement.ownerDocument.removeEventListener('pointerlockerror', this.onPointerlockError);
    });

    _defineProperty(this, "dispose", () => {
      this.disconnect();
    });

    _defineProperty(this, "getObject", () => // retaining this method for backward compatibility
    this.camera);

    _defineProperty(this, "direction", new Vector3(0, 0, -1));

    _defineProperty(this, "getDirection", v => v.copy(this.direction).applyQuaternion(this.camera.quaternion));

    _defineProperty(this, "moveForward", distance => {
      // move forward parallel to the xz-plane
      // assumes this.camera.up is y-up
      this.vec.setFromMatrixColumn(this.camera.matrix, 0);
      this.vec.crossVectors(this.camera.up, this.vec);
      this.camera.position.addScaledVector(this.vec, distance);
    });

    _defineProperty(this, "moveRight", distance => {
      this.vec.setFromMatrixColumn(this.camera.matrix, 0);
      this.camera.position.addScaledVector(this.vec, distance);
    });

    _defineProperty(this, "lock", () => {
      this.domElement.requestPointerLock();
    });

    _defineProperty(this, "unlock", () => {
      this.domElement.ownerDocument.exitPointerLock();
    });

    if (domElement === undefined) {
      console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.');
      domElement = document.body;
    }

    this.domElement = domElement;
    this.camera = camera;
    this.connect();
  }

}

export { PointerLockControls };
