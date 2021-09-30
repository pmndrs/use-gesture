import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { UniformsUtils, WebGLRenderTarget, LinearFilter, NearestFilter, RGBAFormat, ShaderMaterial, MeshBasicMaterial } from 'three';
import { Pass, FullScreenQuad } from './Pass.js';
import { AfterimageShader } from '../shaders/AfterimageShader.js';

class AfterimagePass extends Pass {
  constructor(damp = 0.96, shader = AfterimageShader) {
    super();

    _defineProperty(this, "shader", void 0);

    _defineProperty(this, "uniforms", void 0);

    _defineProperty(this, "textureComp", void 0);

    _defineProperty(this, "textureOld", void 0);

    _defineProperty(this, "shaderMaterial", void 0);

    _defineProperty(this, "compFsQuad", void 0);

    _defineProperty(this, "copyFsQuad", void 0);

    this.shader = shader;
    this.uniforms = UniformsUtils.clone(shader.uniforms);
    this.uniforms['damp'].value = damp;
    this.textureComp = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: LinearFilter,
      magFilter: NearestFilter,
      format: RGBAFormat
    });
    this.textureOld = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: LinearFilter,
      magFilter: NearestFilter,
      format: RGBAFormat
    });
    this.shaderMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.shader.vertexShader,
      fragmentShader: this.shader.fragmentShader
    });
    this.compFsQuad = new FullScreenQuad(this.shaderMaterial);
    let material = new MeshBasicMaterial();
    this.copyFsQuad = new FullScreenQuad(material);
  }

  render(renderer, writeBuffer, readBuffer) {
    this.uniforms['tOld'].value = this.textureOld.texture;
    this.uniforms['tNew'].value = readBuffer.texture;
    renderer.setRenderTarget(this.textureComp);
    this.compFsQuad.render(renderer);
    this.copyFsQuad.material.map = this.textureComp.texture;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.copyFsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.copyFsQuad.render(renderer);
    } // Swap buffers.


    let temp = this.textureOld;
    this.textureOld = this.textureComp;
    this.textureComp = temp; // Now textureOld contains the latest image, ready for the next frame.
  }

  setSize(width, height) {
    this.textureComp.setSize(width, height);
    this.textureOld.setSize(width, height);
  }

}

export { AfterimagePass };
