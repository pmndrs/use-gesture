import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { WebGLMultisampleRenderTarget, RGBAFormat, sRGBEncoding } from 'three';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, RenderPass, ShaderPass, GammaCorrectionShader } from 'three-stdlib';
import mergeRefs from 'react-merge-refs';

extend({
  EffectComposer,
  RenderPass,
  ShaderPass
});
const isWebGL2Available = () => {
  try {
    var canvas = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch (e) {
    return false;
  }
};
const Effects = /*#__PURE__*/React.forwardRef(({
  children,
  multisamping = 8,
  renderIndex = 1,
  disableGamma = false,
  disableRenderPass = false,
  ...props
}, ref) => {
  const composer = React.useRef();
  const scene = useThree(({
    scene
  }) => scene);
  const camera = useThree(({
    camera
  }) => camera);
  const gl = useThree(({
    gl
  }) => gl);
  const size = useThree(({
    size
  }) => size);
  const [target] = React.useState(() => {
    if (isWebGL2Available() && multisamping > 0) {
      const t = new WebGLMultisampleRenderTarget(size.width, size.height, {
        format: RGBAFormat,
        encoding: sRGBEncoding
      });
      t.samples = 8;
      return t;
    }
  });
  React.useEffect(() => {
    var _composer$current, _composer$current2;

    (_composer$current = composer.current) == null ? void 0 : _composer$current.setSize(size.width, size.height);
    (_composer$current2 = composer.current) == null ? void 0 : _composer$current2.setPixelRatio(gl.getPixelRatio());
  }, [gl, size]);
  useFrame(() => {
    var _composer$current3;

    return (_composer$current3 = composer.current) == null ? void 0 : _composer$current3.render();
  }, renderIndex);
  return /*#__PURE__*/React.createElement("effectComposer", _extends({
    ref: mergeRefs([ref, composer]),
    args: [gl, target]
  }, props), !disableRenderPass && /*#__PURE__*/React.createElement("renderPass", {
    attachArray: "passes",
    args: [scene, camera]
  }), !disableGamma && /*#__PURE__*/React.createElement("shaderPass", {
    attachArray: "passes",
    args: [GammaCorrectionShader]
  }), children);
});

export { Effects, isWebGL2Available };
