import _extends from '@babel/runtime/helpers/esm/extends';
import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import mergeRefs from 'react-merge-refs';

const Detailed = /*#__PURE__*/React.forwardRef(({
  children,
  distances,
  ...props
}, ref) => {
  const lodRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const {
      current: lod
    } = lodRef;
    lod.levels.length = 0;
    lod.children.forEach((object, index) => lod.levels.push({
      object,
      distance: distances[index]
    }));
  });
  useFrame(state => {
    var _lodRef$current;

    return (_lodRef$current = lodRef.current) == null ? void 0 : _lodRef$current.update(state.camera);
  });
  return /*#__PURE__*/React.createElement("lOD", _extends({
    ref: mergeRefs([lodRef, ref])
  }, props), children);
});

export { Detailed };
