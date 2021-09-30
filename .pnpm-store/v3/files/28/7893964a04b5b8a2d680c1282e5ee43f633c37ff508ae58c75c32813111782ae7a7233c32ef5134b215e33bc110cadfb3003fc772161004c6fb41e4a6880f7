import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { ShaderMaterial, UniformsUtils } from 'three';
import { Pass, FullScreenQuad } from './Pass.js';

class ShaderPass extends Pass {
  constructor(shader, textureID = 'tDiffuse') {
    super();

    _defineProperty(this, "textureID", void 0);

    _defineProperty(this, "uniforms", void 0);

    _defineProperty(this, "material", void 0);

    _defineProperty(this, "fsQuad", void 0);

    this.textureID = textureID;

    if (shader instanceof ShaderMaterial) {
      this.uniforms = shader.uniforms;
      this.material = shader;
    } else {
      this.uniforms = UniformsUtils.clone(shader.uniforms);
      this.material = new ShaderMaterial({
        defines: Object.assign({}, shader.defines),
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      });
    }

    this.fsQuad = new FullScreenQuad(this.material);
  }

  render(renderer, writeBuffer, readBuffer) {
    if (this.uniforms[this.textureID]) {
      this.uniforms[this.textureID].value = readBuffer.texture;
    }

    this.fsQuad.material = this.material;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer); // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600

      if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
      this.fsQuad.render(renderer);
    }
  }

}

export { ShaderPass };
