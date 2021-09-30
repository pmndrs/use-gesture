import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { EventDispatcher, Vector3, Euler, Quaternion, MathUtils } from 'three';

/**
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

class DeviceOrientationControls extends EventDispatcher {
  // radians
  constructor(object) {
    super();

    _defineProperty(this, "object", void 0);

    _defineProperty(this, "changeEvent", {
      type: 'change'
    });

    _defineProperty(this, "EPS", 0.000001);

    _defineProperty(this, "enabled", true);

    _defineProperty(this, "deviceOrientation", {
      alpha: 0,
      beta: 0,
      gamma: 0
    });

    _defineProperty(this, "screenOrientation", 0);

    _defineProperty(this, "alphaOffset", 0);

    _defineProperty(this, "onDeviceOrientationChangeEvent", event => {
      this.deviceOrientation = event;
    });

    _defineProperty(this, "onScreenOrientationChangeEvent", () => {
      this.screenOrientation = window.orientation || 0;
    });

    _defineProperty(this, "zee", new Vector3(0, 0, 1));

    _defineProperty(this, "euler", new Euler());

    _defineProperty(this, "q0", new Quaternion());

    _defineProperty(this, "q1", new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)));

    _defineProperty(this, "setObjectQuaternion", (quaternion, alpha, beta, gamma, orient) => {
      this.euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us

      quaternion.setFromEuler(this.euler); // orient the device

      quaternion.multiply(this.q1); // camera looks out the back of the device, not the top

      quaternion.multiply(this.q0.setFromAxisAngle(this.zee, -orient)); // adjust for screen orientation
    });

    _defineProperty(this, "connect", () => {
      this.onScreenOrientationChangeEvent(); // run once on load
      // iOS 13+

      if (window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission().then(response => {
          if (response == 'granted') {
            window.addEventListener('orientationchange', this.onScreenOrientationChangeEvent);
            window.addEventListener('deviceorientation', this.onDeviceOrientationChangeEvent);
          }
        }).catch(error => {
          console.error('THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error);
        });
      } else {
        window.addEventListener('orientationchange', this.onScreenOrientationChangeEvent);
        window.addEventListener('deviceorientation', this.onDeviceOrientationChangeEvent);
      }

      this.enabled = true;
    });

    _defineProperty(this, "disconnect", () => {
      window.removeEventListener('orientationchange', this.onScreenOrientationChangeEvent);
      window.removeEventListener('deviceorientation', this.onDeviceOrientationChangeEvent);
      this.enabled = false;
    });

    _defineProperty(this, "lastQuaternion", new Quaternion());

    _defineProperty(this, "update", () => {
      if (this.enabled === false) return;
      const device = this.deviceOrientation;

      if (device) {
        const alpha = device.alpha ? MathUtils.degToRad(device.alpha) + this.alphaOffset : 0; // Z

        const beta = device.beta ? MathUtils.degToRad(device.beta) : 0; // X'

        const gamma = device.gamma ? MathUtils.degToRad(device.gamma) : 0; // Y''

        const orient = this.screenOrientation ? MathUtils.degToRad(this.screenOrientation) : 0; // O

        this.setObjectQuaternion(this.object.quaternion, alpha, beta, gamma, orient);

        if (8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > this.EPS) {
          this.lastQuaternion.copy(this.object.quaternion);
          this.dispatchEvent(this.changeEvent);
        }
      }
    });

    _defineProperty(this, "dispose", () => this.disconnect());

    this.object = object;
    this.object.rotation.reorder('YXZ');
    this.connect();
  }

}

export { DeviceOrientationControls };
