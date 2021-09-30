import _extends from '@babel/runtime/helpers/esm/extends';
import { useThree, useFrame } from '@react-three/fiber';
import * as React from 'react';
import { FlyControls as FlyControls$1 } from 'three-stdlib';

const FlyControls = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    onChange,
    ...rest
  } = props;
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const camera = useThree(({
    camera
  }) => camera);
  const gl = useThree(({
    gl
  }) => gl);
  const [controls] = React.useState(() => new FlyControls$1(camera, gl.domElement));
  React.useEffect(() => {
    const callback = e => {
      invalidate();
      if (onChange) onChange(e);
    };

    controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('change', callback);
    return () => controls == null ? void 0 : controls.removeEventListener == null ? void 0 : controls.removeEventListener('change', callback);
  }, [onChange, controls, invalidate]);
  useFrame((_, delta) => controls == null ? void 0 : controls.update(delta));
  return controls ? /*#__PURE__*/React.createElement("primitive", _extends({
    ref: ref,
    dispose: undefined,
    object: controls
  }, rest)) : null;
});

export { FlyControls };
