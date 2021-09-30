import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib';

const ContactShadows = /*#__PURE__*/React.forwardRef(({
  opacity = 1,
  width = 1,
  height = 1,
  blur = 1,
  far = 10,
  resolution = 256,
  ...props
}, ref) => {
  const scene = useThree(({
    scene
  }) => scene);
  const gl = useThree(({
    gl
  }) => gl);
  const shadowCamera = React.useRef();
  const [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur] = React.useMemo(() => {
    const renderTarget = new THREE.WebGLRenderTarget(resolution, resolution);
    const renderTargetBlur = new THREE.WebGLRenderTarget(resolution, resolution);
    renderTargetBlur.texture.generateMipmaps = renderTarget.texture.generateMipmaps = false;
    const planeGeometry = new THREE.PlaneBufferGeometry(width, height).rotateX(Math.PI / 2);
    const blurPlane = new THREE.Mesh(planeGeometry);
    const depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.depthTest = depthMaterial.depthWrite = false;

    depthMaterial.onBeforeCompile = shader => shader.fragmentShader = shader.fragmentShader.replace('1.0 - fragCoordZ ), opacity );', '0.0 ), ( 1.0 - fragCoordZ ) * 1.0 );');

    const horizontalBlurMaterial = new THREE.ShaderMaterial(HorizontalBlurShader);
    const verticalBlurMaterial = new THREE.ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial.depthTest = horizontalBlurMaterial.depthTest = false;
    return [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur];
  }, [resolution, width, height]);
  useFrame(() => {
    if (shadowCamera.current) {
      const initialBackground = scene.background;
      scene.background = null;
      scene.overrideMaterial = depthMaterial;
      gl.setRenderTarget(renderTarget);
      gl.render(scene, shadowCamera.current);
      scene.overrideMaterial = null;
      blurPlane.material = horizontalBlurMaterial;
      blurPlane.material.uniforms.tDiffuse.value = renderTarget.texture;
      horizontalBlurMaterial.uniforms.h.value = blur / 256;
      gl.setRenderTarget(renderTargetBlur);
      gl.render(blurPlane, shadowCamera.current);
      blurPlane.material = verticalBlurMaterial;
      blurPlane.material.uniforms.tDiffuse.value = renderTargetBlur.texture;
      verticalBlurMaterial.uniforms.v.value = blur / 256;
      gl.setRenderTarget(renderTarget);
      gl.render(blurPlane, shadowCamera.current);
      gl.setRenderTarget(null);
      scene.background = initialBackground;
    }
  });
  return /*#__PURE__*/React.createElement("group", _extends({}, props, {
    ref: ref
  }), /*#__PURE__*/React.createElement("mesh", {
    geometry: planeGeometry,
    scale: [1, -1, 1],
    rotation: [-Math.PI / 2, 0, 0]
  }, /*#__PURE__*/React.createElement("meshBasicMaterial", {
    map: renderTarget.texture,
    transparent: true,
    opacity: opacity
  })), /*#__PURE__*/React.createElement("orthographicCamera", {
    ref: shadowCamera,
    args: [-width / 2, width / 2, height / 2, -height / 2, 0, far]
  }));
});

export { ContactShadows };
