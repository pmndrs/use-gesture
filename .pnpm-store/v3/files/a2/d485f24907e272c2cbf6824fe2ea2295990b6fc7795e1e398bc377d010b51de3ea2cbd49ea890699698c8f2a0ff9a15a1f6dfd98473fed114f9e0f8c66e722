import _extends from '@babel/runtime/helpers/esm/extends';
import { useThree, useFrame } from '@react-three/fiber';
import * as React from 'react';
import { MapControls as MapControls$1 } from 'three-stdlib';

const MapControls = /*#__PURE__*/React.forwardRef((props = {
  enableDamping: true
}, ref) => {
  const {
    camera,
    onChange,
    onStart,
    onEnd,
    ...rest
  } = props;
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const defaultCamera = useThree(({
    camera
  }) => camera);
  const domElement = useThree(({
    gl
  }) => gl.domElement);
  const explCamera = camera || defaultCamera;
  const controls = React.useMemo(() => new MapControls$1(explCamera), [explCamera]);
  React.useEffect(() => {
    controls.connect(domElement);

    const callback = e => {
      invalidate();
      if (onChange) onChange(e);
    };

    controls.addEventListener('change', callback);
    if (onStart) controls.addEventListener('start', onStart);
    if (onEnd) controls.addEventListener('end', onEnd);
    return () => {
      controls.dispose();
      controls.removeEventListener('change', callback);
      if (onStart) controls.removeEventListener('start', onStart);
      if (onEnd) controls.removeEventListener('end', onEnd);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, domElement]);
  useFrame(() => controls.update());
  return /*#__PURE__*/React.createElement("primitive", _extends({
    ref: ref,
    dispose: undefined,
    object: controls,
    enableDamping: true
  }, rest));
});

export { MapControls };
