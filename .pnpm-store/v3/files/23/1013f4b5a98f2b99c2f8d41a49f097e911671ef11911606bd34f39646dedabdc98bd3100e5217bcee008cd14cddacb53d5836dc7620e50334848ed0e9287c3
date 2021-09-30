import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { EventDispatcher, Vector3, Spherical, MathUtils } from 'three';

class FirstPersonControls extends EventDispatcher {
  // internals
  constructor(object, domElement) {
    super();

    _defineProperty(this, "object", void 0);

    _defineProperty(this, "domElement", void 0);

    _defineProperty(this, "enabled", true);

    _defineProperty(this, "movementSpeed", 1.0);

    _defineProperty(this, "lookSpeed", 0.005);

    _defineProperty(this, "lookVertical", true);

    _defineProperty(this, "autoForward", false);

    _defineProperty(this, "activeLook", true);

    _defineProperty(this, "heightSpeed", false);

    _defineProperty(this, "heightCoef", 1.0);

    _defineProperty(this, "heightMin", 0.0);

    _defineProperty(this, "heightMax", 1.0);

    _defineProperty(this, "constrainVertical", false);

    _defineProperty(this, "verticalMin", 0);

    _defineProperty(this, "verticalMax", Math.PI);

    _defineProperty(this, "mouseDragOn", false);

    _defineProperty(this, "autoSpeedFactor", 0.0);

    _defineProperty(this, "mouseX", 0);

    _defineProperty(this, "mouseY", 0);

    _defineProperty(this, "moveForward", false);

    _defineProperty(this, "moveBackward", false);

    _defineProperty(this, "moveLeft", false);

    _defineProperty(this, "moveRight", false);

    _defineProperty(this, "moveUp", false);

    _defineProperty(this, "moveDown", false);

    _defineProperty(this, "viewHalfX", 0);

    _defineProperty(this, "viewHalfY", 0);

    _defineProperty(this, "lat", 0);

    _defineProperty(this, "lon", 0);

    _defineProperty(this, "lookDirection", new Vector3());

    _defineProperty(this, "spherical", new Spherical());

    _defineProperty(this, "target", new Vector3());

    _defineProperty(this, "dispose", () => {
      this.domElement.removeEventListener('contextmenu', this.contextmenu);
      this.domElement.removeEventListener('mousedown', this.onMouseDown);
      this.domElement.removeEventListener('mousemove', this.onMouseMove);
      this.domElement.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
    });

    _defineProperty(this, "handleResize", () => {
      if (this.domElement instanceof Document) {
        this.viewHalfX = window.innerWidth / 2;
        this.viewHalfY = window.innerHeight / 2;
      } else {
        this.viewHalfX = this.domElement.offsetWidth / 2;
        this.viewHalfY = this.domElement.offsetHeight / 2;
      }
    });

    _defineProperty(this, "onMouseDown", event => {
      if (this.domElement instanceof HTMLElement) {
        this.domElement.focus();
      }

      if (this.activeLook) {
        switch (event.button) {
          case 0:
            this.moveForward = true;
            break;

          case 2:
            this.moveBackward = true;
            break;
        }
      }

      this.mouseDragOn = true;
    });

    _defineProperty(this, "onMouseUp", event => {
      if (this.activeLook) {
        switch (event.button) {
          case 0:
            this.moveForward = false;
            break;

          case 2:
            this.moveBackward = false;
            break;
        }
      }

      this.mouseDragOn = false;
    });

    _defineProperty(this, "onMouseMove", event => {
      if (this.domElement instanceof Document) {
        this.mouseX = event.pageX - this.viewHalfX;
        this.mouseY = event.pageY - this.viewHalfY;
      } else {
        this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
        this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
      }
    });

    _defineProperty(this, "onKeyDown", event => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = true;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = true;
          break;

        case 'KeyR':
          this.moveUp = true;
          break;

        case 'KeyF':
          this.moveDown = true;
          break;
      }
    });

    _defineProperty(this, "onKeyUp", event => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = false;
          break;

        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false;
          break;

        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = false;
          break;

        case 'KeyR':
          this.moveUp = false;
          break;

        case 'KeyF':
          this.moveDown = false;
          break;
      }
    });

    _defineProperty(this, "lookAt", (x, y, z) => {
      if (x instanceof Vector3) {
        this.target.copy(x);
      } else if (y && z) {
        this.target.set(x, y, z);
      }

      this.object.lookAt(this.target);
      this.setOrientation(this);
      return this;
    });

    _defineProperty(this, "targetPosition", new Vector3());

    _defineProperty(this, "update", delta => {
      if (this.enabled === false) return;

      if (this.heightSpeed) {
        const y = MathUtils.clamp(this.object.position.y, this.heightMin, this.heightMax);
        const heightDelta = y - this.heightMin;
        this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
      } else {
        this.autoSpeedFactor = 0.0;
      }

      const actualMoveSpeed = delta * this.movementSpeed;

      if (this.moveForward || this.autoForward && !this.moveBackward) {
        this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
      }

      if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
      if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
      if (this.moveRight) this.object.translateX(actualMoveSpeed);
      if (this.moveUp) this.object.translateY(actualMoveSpeed);
      if (this.moveDown) this.object.translateY(-actualMoveSpeed);
      let actualLookSpeed = delta * this.lookSpeed;

      if (!this.activeLook) {
        actualLookSpeed = 0;
      }

      let verticalLookRatio = 1;

      if (this.constrainVertical) {
        verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
      }

      this.lon -= this.mouseX * actualLookSpeed;
      if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
      this.lat = Math.max(-85, Math.min(85, this.lat));
      let phi = MathUtils.degToRad(90 - this.lat);
      const theta = MathUtils.degToRad(this.lon);

      if (this.constrainVertical) {
        phi = MathUtils.mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
      }

      const position = this.object.position;
      this.targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
      this.object.lookAt(this.targetPosition);
    });

    _defineProperty(this, "contextmenu", event => event.preventDefault());

    _defineProperty(this, "setOrientation", controls => {
      const quaternion = controls.object.quaternion;
      this.lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
      this.spherical.setFromVector3(this.lookDirection);
      this.lat = 90 - MathUtils.radToDeg(this.spherical.phi);
      this.lon = MathUtils.radToDeg(this.spherical.theta);
    });

    if (domElement === undefined) {
      console.warn('THREE.FirstPersonControls: The second parameter "domElement" is now mandatory.');
      domElement = document;
    }

    this.object = object;
    this.domElement = domElement;

    if (this.domElement instanceof HTMLElement) {
      this.domElement.setAttribute('tabindex', '-1');
    }

    this.handleResize();
    this.setOrientation(this);
    this.domElement.addEventListener('contextmenu', this.contextmenu);
    this.domElement.addEventListener('mousemove', this.onMouseMove);
    this.domElement.addEventListener('mousedown', this.onMouseDown);
    this.domElement.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

}

export { FirstPersonControls };
