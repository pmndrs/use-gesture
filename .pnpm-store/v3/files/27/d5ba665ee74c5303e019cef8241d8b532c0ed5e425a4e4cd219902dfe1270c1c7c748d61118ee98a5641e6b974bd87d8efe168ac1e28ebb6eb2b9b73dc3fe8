import * as React from 'react';
import { Flow } from 'three-stdlib';

const CurveModifier = /*#__PURE__*/React.forwardRef(({
  children,
  curve
}, ref) => {
  const [object3D, setObj] = React.useState();
  const original = React.useRef();
  const modifier = React.useRef();
  React.useImperativeHandle(ref, () => ({
    moveAlongCurve: val => {
      var _modifier$current;

      (_modifier$current = modifier.current) == null ? void 0 : _modifier$current.moveAlongCurve(val);
    }
  }));
  React.useEffect(() => {
    if (!modifier.current && original.current && ref) {
      modifier.current = new Flow(original.current);
      setObj(modifier.current.object3D);
    }
  }, [children, ref]);
  React.useEffect(() => {
    if (original.current && curve) {
      var _modifier$current2;

      (_modifier$current2 = modifier.current) == null ? void 0 : _modifier$current2.updateCurve(0, curve);
    }
  }, [curve]);
  return object3D ? /*#__PURE__*/React.createElement("primitive", {
    object: object3D
  }) : /*#__PURE__*/React.cloneElement(React.Children.only(children), {
    ref: original
  });
});

export { CurveModifier };
