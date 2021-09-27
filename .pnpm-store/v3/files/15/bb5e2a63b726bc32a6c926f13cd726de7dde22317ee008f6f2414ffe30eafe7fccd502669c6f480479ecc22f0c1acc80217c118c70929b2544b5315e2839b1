import _extends from '@babel/runtime/helpers/esm/extends';
import { useThree, useFrame } from '@react-three/fiber';
import * as React from 'react';
import { DeviceOrientationControls as DeviceOrientationControls$1 } from 'three-stdlib';

const DeviceOrientationControls = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    camera,
    onChange,
    ...rest
  } = props;
  const defaultCamera = useThree(({
    camera
  }) => camera);
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const explCamera = camera || defaultCamera;
  const [controls] = React.useState(() => new DeviceOrientationControls$1(explCamera));
  React.useEffect(() => {
    const callback = e => {
      invalidate();
      if (onChange) onChange(e);
    };

    controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('change', callback);
    return () => controls == null ? void 0 : controls.removeEventListener == null ? void 0 : controls.removeEventListener('change', callback);
  }, [onChange, controls, invalidate]);
  useFrame(() => controls == null ? void 0 : controls.update());
  React.useEffect(() => {
    const current = controls;
    current == null ? void 0 : current.connect();
    return () => current == null ? void 0 : current.dispose();
  }, [controls]);
  return controls ? /*#__PURE__*/React.createElement("primitive", _extends({
    ref: ref,
    dispose: undefined,
    object: controls
  }, rest)) : null;
});

export { DeviceOrientationControls };
