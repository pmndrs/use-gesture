import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { OrthographicCamera, PlaneGeometry, Mesh } from 'three';

class Pass {
  constructor() {
    _defineProperty(this, "enabled", true);

    _defineProperty(this, "needsSwap", true);

    _defineProperty(this, "clear", false);

    _defineProperty(this, "renderToScreen", false);
  }

  setSize(
  /* eslint-disable @typescript-eslint/no-unused-vars */

  /* eslint-disable no-unused-vars */
  width, height) {}

  render(
  /* eslint-disable @typescript-eslint/no-unused-vars */

  /* eslint-disable no-unused-vars */
  renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    console.error('THREE.Pass: .render() must be implemented in derived pass.');
  }

} // Helper for passes that need to fill the viewport with a single quad.


class FullScreenQuad {
  constructor(material) {
    _defineProperty(this, "camera", new OrthographicCamera(-1, 1, 1, -1, 0, 1));

    _defineProperty(this, "geometry", new PlaneGeometry(2, 2));

    _defineProperty(this, "mesh", void 0);

    this.mesh = new Mesh(this.geometry, material);
  }

  get material() {
    return this.mesh.material;
  }

  set material(value) {
    this.mesh.material = value;
  }

  dispose() {
    this.mesh.geometry.dispose();
  }

  render(renderer) {
    renderer.render(this.mesh, this.camera);
  }

}

export { FullScreenQuad, Pass };
