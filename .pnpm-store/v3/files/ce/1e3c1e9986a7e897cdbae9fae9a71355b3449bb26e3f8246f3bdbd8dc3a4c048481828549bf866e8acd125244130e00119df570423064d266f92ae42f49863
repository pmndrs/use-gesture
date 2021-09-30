import _extends from '@babel/runtime/helpers/esm/extends';
import { useThree } from '@react-three/fiber';
import * as React from 'react';
import { PointerLockControls as PointerLockControls$1 } from 'three-stdlib';

const PointerLockControls = /*#__PURE__*/React.forwardRef(({
  selector,
  onChange,
  onLock,
  onUnlock,
  ...props
}, ref) => {
  const {
    camera,
    ...rest
  } = props;
  const gl = useThree(({
    gl
  }) => gl);
  const defaultCamera = useThree(({
    camera
  }) => camera);
  const invalidate = useThree(({
    invalidate
  }) => invalidate);
  const explCamera = camera || defaultCamera;
  const [controls] = React.useState(() => new PointerLockControls$1(explCamera, gl.domElement));
  React.useEffect(() => {
    const callback = e => {
      invalidate();
      if (onChange) onChange(e);
    };

    controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('change', callback);
    if (onLock) controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('lock', onLock);
    if (onUnlock) controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('unlock', onUnlock);
    return () => {
      controls == null ? void 0 : controls.removeEventListener == null ? void 0 : controls.removeEventListener('change', callback);
      if (onLock) controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('lock', onLock);
      if (onUnlock) controls == null ? void 0 : controls.addEventListener == null ? void 0 : controls.addEventListener('unlock', onUnlock);
    };
  }, [onChange, onLock, onUnlock, controls, invalidate]);
  React.useEffect(() => {
    const handler = () => controls == null ? void 0 : controls.lock();

    const elements = selector ? Array.from(document.querySelectorAll(selector)) : [document];
    elements.forEach(element => element && element.addEventListener('click', handler));
    return () => {
      elements.forEach(element => element ? element.removeEventListener('click', handler) : undefined);
    };
  }, [controls, selector]);
  return controls ? /*#__PURE__*/React.createElement("primitive", _extends({
    ref: ref,
    dispose: undefined,
    object: controls
  }, rest)) : null;
});

export { PointerLockControls };
