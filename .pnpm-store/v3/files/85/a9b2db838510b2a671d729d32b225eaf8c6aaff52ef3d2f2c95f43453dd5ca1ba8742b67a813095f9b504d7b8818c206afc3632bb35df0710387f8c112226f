import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { FirstPersonControls as FirstPersonControls$1 } from 'three-stdlib';

const FirstPersonControls = /*#__PURE__*/React.forwardRef((props, ref) => {
  const camera = useThree(({
    camera
  }) => camera);
  const gl = useThree(({
    gl
  }) => gl);
  const [controls] = React.useState(() => new FirstPersonControls$1(camera, gl.domElement));
  useFrame((_, delta) => {
    controls.update(delta);
  });
  return controls ? /*#__PURE__*/React.createElement("primitive", _extends({
    ref: ref,
    object: controls
  }, props)) : null;
});

export { FirstPersonControls };
