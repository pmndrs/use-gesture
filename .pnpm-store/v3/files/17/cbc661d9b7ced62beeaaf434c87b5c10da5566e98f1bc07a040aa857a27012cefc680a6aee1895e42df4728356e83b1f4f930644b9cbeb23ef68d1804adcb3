import _extends from '@babel/runtime/helpers/esm/extends';
import { Box3, Vector3, Sphere } from 'three';
import * as React from 'react';

const Center = /*#__PURE__*/React.forwardRef(function Center({
  children,
  alignTop,
  ...props
}, ref) {
  const outer = React.useRef(null);
  const inner = React.useRef(null);
  React.useLayoutEffect(() => {
    outer.current.position.set(0, 0, 0);
    outer.current.updateWorldMatrix(true, true);
    const box3 = new Box3().setFromObject(inner.current);
    const center = new Vector3();
    const sphere = new Sphere();
    const height = box3.max.y - box3.min.y;
    box3.getCenter(center);
    box3.getBoundingSphere(sphere);
    outer.current.position.set(-center.x, -center.y + (alignTop ? height / 2 : 0), -center.z); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);
  return /*#__PURE__*/React.createElement("group", _extends({
    ref: ref
  }, props), /*#__PURE__*/React.createElement("group", {
    ref: outer
  }, /*#__PURE__*/React.createElement("group", {
    ref: inner
  }, children)));
});

export { Center };
