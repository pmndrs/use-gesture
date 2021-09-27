import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { Vector3, CylinderGeometry, Matrix4 } from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { SpotLightMaterial } from '../materials/SpotLightMaterial.js';

const vec = new Vector3();
const SpotLight = /*#__PURE__*/React.forwardRef(({
  depthBuffer,
  color = 'white',
  distance = 5,
  angle = 0.15,
  attenuation = 5,
  anglePower = 5,
  ...props
}, ref) => {
  const mesh = React.useRef(null);
  const size = useThree(state => state.size);
  const camera = useThree(state => state.camera);
  const dpr = useThree(state => state.viewport.dpr);
  const [material] = React.useState(() => new SpotLightMaterial());
  useFrame(() => {
    material.uniforms.spotPosition.value.copy(mesh.current.getWorldPosition(vec));
    mesh.current.lookAt(mesh.current.parent.target.position);
  });
  const geom = React.useMemo(() => {
    const geometry = new CylinderGeometry(0.1, angle * 7, distance, 128, 64, true);
    geometry.applyMatrix4(new Matrix4().makeTranslation(0, -distance / 2, 0));
    geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));
    return geometry;
  }, [angle, distance]);
  return /*#__PURE__*/React.createElement("spotLight", _extends({
    ref: ref,
    angle: angle,
    color: color,
    distance: distance
  }, props), /*#__PURE__*/React.createElement("mesh", {
    ref: mesh,
    geometry: geom
  }, /*#__PURE__*/React.createElement("primitive", {
    object: material,
    attach: "material",
    "uniforms-lightColor-value": color,
    "uniforms-attenuation-value": attenuation,
    "uniforms-anglePower-value": anglePower,
    "uniforms-depth-value": depthBuffer,
    "uniforms-cameraNear-value": camera.near,
    "uniforms-cameraFar-value": camera.far,
    "uniforms-resolution-value": depthBuffer ? [size.width * dpr, size.height * dpr] : [0, 0]
  })));
});

export { SpotLight };
