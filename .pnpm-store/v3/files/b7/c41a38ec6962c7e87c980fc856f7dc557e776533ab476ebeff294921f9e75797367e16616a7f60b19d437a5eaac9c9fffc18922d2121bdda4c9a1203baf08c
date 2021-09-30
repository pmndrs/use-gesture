import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { Color } from 'three';
import { Pass } from './Pass.js';

class RenderPass extends Pass {
  constructor(scene, camera, overrideMaterial, clearColor, clearAlpha = 0) {
    super();

    _defineProperty(this, "scene", void 0);

    _defineProperty(this, "camera", void 0);

    _defineProperty(this, "overrideMaterial", void 0);

    _defineProperty(this, "clearColor", void 0);

    _defineProperty(this, "clearAlpha", void 0);

    _defineProperty(this, "clearDepth", false);

    _defineProperty(this, "_oldClearColor", new Color());

    this.scene = scene;
    this.camera = camera;
    this.overrideMaterial = overrideMaterial;
    this.clearColor = clearColor;
    this.clearAlpha = clearAlpha;
    this.clear = true;
    this.needsSwap = false;
  }

  render(renderer, writeBuffer, readBuffer) {
    let oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    let oldClearAlpha;
    let oldOverrideMaterial = null;

    if (this.overrideMaterial !== undefined) {
      oldOverrideMaterial = this.scene.overrideMaterial;
      this.scene.overrideMaterial = this.overrideMaterial;
    }

    if (this.clearColor) {
      renderer.getClearColor(this._oldClearColor);
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }

    if (this.clearDepth) {
      renderer.clearDepth();
    }

    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer); // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600

    if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    renderer.render(this.scene, this.camera);

    if (this.clearColor) {
      renderer.setClearColor(this._oldClearColor, oldClearAlpha);
    }

    if (this.overrideMaterial !== undefined) {
      this.scene.overrideMaterial = oldOverrideMaterial;
    }

    renderer.autoClear = oldAutoClear;
  }

}

export { RenderPass };
