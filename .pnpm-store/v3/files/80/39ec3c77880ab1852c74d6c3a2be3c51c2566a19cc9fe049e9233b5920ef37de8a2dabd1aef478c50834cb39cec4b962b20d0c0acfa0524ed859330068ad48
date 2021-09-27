import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import mergeRefs from 'react-merge-refs';

/**
 * Wraps children in a billboarded group. Sample usage:
 *
 * ```js
 * <Billboard>
 *   <Text>hi</Text>
 * </Billboard>
 * ```
 */
const Billboard = /*#__PURE__*/React.forwardRef(function Billboard({
  follow = true,
  lockX = false,
  lockY = false,
  lockZ = false,
  ...props
}, ref) {
  const localRef = React.useRef();
  useFrame(({
    camera
  }) => {
    if (!follow || !localRef.current) return; // save previous rotation in case we're locking an axis

    const prevRotation = localRef.current.rotation.clone(); // always face the camera

    localRef.current.quaternion.copy(camera.quaternion); // readjust any axis that is locked

    if (lockX) localRef.current.rotation.x = prevRotation.x;
    if (lockY) localRef.current.rotation.y = prevRotation.y;
    if (lockZ) localRef.current.rotation.z = prevRotation.z;
  });
  return /*#__PURE__*/React.createElement("group", _extends({
    ref: mergeRefs([localRef, ref])
  }, props));
});

export { Billboard };
