import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { useThree } from '@react-three/fiber';
import mergeRefs from 'react-merge-refs';

const PerspectiveCamera = /*#__PURE__*/React.forwardRef(({
  makeDefault,
  manual,
  ...props
}, ref) => {
  const set = useThree(({
    set
  }) => set);
  const camera = useThree(({
    camera
  }) => camera);
  const size = useThree(({
    size
  }) => size);
  const cameraRef = React.useRef();
  React.useLayoutEffect(() => {
    const {
      current: cam
    } = cameraRef;

    if (cam && !manual) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);
  React.useLayoutEffect(() => {
    if (makeDefault && cameraRef.current) {
      const oldCam = camera;
      set(() => ({
        camera: cameraRef.current
      }));
      return () => set(() => ({
        camera: oldCam
      }));
    }
  }, [camera, cameraRef, makeDefault, set]);
  return /*#__PURE__*/React.createElement("perspectiveCamera", _extends({
    ref: mergeRefs([cameraRef, ref])
  }, props));
});

export { PerspectiveCamera };
